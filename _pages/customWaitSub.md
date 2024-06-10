---
title: Variablized Custom Wait Treatment in a Subflow
category: Voice
layout: post
created: 06/06/2024
updated: 
mermaid: true
status: live
---

## Problem
Different lines of business (LOB) often require different queue treatments including a different number of LOB specific comfort/marketing messages, music in queue, and callback options.  Creating different flows for every LOB can be time consuming and change requests can be unnecessarily complex.

## Solution
Create a subflow which will do a BRE lookup based on the queue ID and return the line of business name, message count, music in queue, message interval, and if a caller should be offered a callback as well as how often. 

### Constraints
- None

## Required Components
- Subflow
- BRE
-   - CSV file with JSON provided for demo/testing via a link in the testing section
- Parse node
- Prerecorded message for selecting queue/treatment, opt-out to receive a callback, and callback confirmation
- Prerecorded messages for the different LOBs with the order in which they should be played formatted like LOB_1,LOB_2,LOB_3,etc
  - Demo/testing files provided via a link in the testing section
- 3+ queues for testing.


---

## Method

### Request or reuse a BRE table
- Recommended name: waitTreatment

---

### Use the BRE configuration tool to create your lookup rules
- [https://webexcc-sa.github.io/tools/BRE/Configuring_The_BRE](https://webexcc-sa.github.io/tools/BRE/Configuring_The_BRE){:target="\_blank"}
- Table name: waitTreatment (or the name of the table you are using)
- Label name: routeInfo
- Key to be used in the flows: queueId
- In the NotFound rule, replace "NotFound" with this escaped JSON:
<br>
<textarea spellcheck="false" cols="100"> "{\"LOB\":\"default\",\"MessageCount\":4,\"MIQ\":\"defaultmusic_on_hold.wav\",\"MessageInterval\":30,\"callbackOfferEvery\":0}"</textarea>


---

### Create a new Subflow
- [(Link to Documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#concept-template_2812e465-bde2-4bf8-b133-b64bbddff95b){:target="\_blank"}

---

### Create these subflow variables
{% include_relative _parts/subFlowVariable.md
name="queueId"
type="String"
defaultValue=""
input="true"
output="true"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="MIQ"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="counter"
type="Integer"
defaultValue="0"
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="LOB"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="MessageInterval"
type="Integer"
defaultValue="30"
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="response"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="callbackOfferEvery"
type="Integer"
defaultValue="0"
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="MessageCount"
type="Integer"
defaultValue="0"
input="false"
output="false"
sensitive="false"
%}

---

### Add A BRE Request node
{% include_relative _parts/BRE.md
params='
Key:context,Value:waitTreatment
||Key:queueId,Value:\{\{ queueId \}\}
_done!_'
timeout="2000"
retries="1"
parse='
OutputVar:response,Path:routeInfo
_done!_'
nodeExit="Connect to the parse node created in the next step"
%}

---

### Add a Parse node
{% include_relative _parts/parse.md
inputVar="response"
contentType="JSON"
OutputVar='Output Variable:LOB,Path Expression:$.LOB
||Output Variable:MessageCount,Path Expression:$.MessageCount
||Output Variable:MIQ,Path Expression:$.MIQ
||Output Variable:MessageInterval,Path Expression:$.MessageInterval
||Output Variable:callbackOfferEvery,Path Expression:$.callbackOfferEvery
_done!_'
nodeExit="Connect to the play music node created in the next step"
%}

---

### Add a Play Music node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMusic.md
type="dynamic"
musicFileOrExpression="\{\{ MIQ \}\}"
offset=""
duration="\{\{ MessageInterval \}\}"
nodeExit="Connect to play message node created in the next step"
%}

---

### Add a Play Message node
<!-- Tab through values Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMessage.md

TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="Variable Expression"
a1="\{\{LOB\}\}_\{\{(counter % MessageCount +1 )\}\}.wav"

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="name of file, variable expression, or TTS"
a5="name of file, variable expression, or TTS"

nodeExit="Connect to the condition node created in the next step"
%}

---

### Add a Condition node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{ callbackOfferEvery > 0 \}\}"
trueLink="Connect to a Set Variable node created in the next step"
falseLink="Connect to another Condition node created in 2 steps"
%}  

---

### Add a Set Variable node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="counter"
value="\{\{ counter + 1 \}\}"
nodeExit="Connect to the Play Music node"
%}

---

### Add a Condition node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{ ((counter + 1) % callbackOfferEvery) == 0}\\}"
trueLink="Connect to a menu node created in the next step"
falseLink="Connect to the set variable node to increase the counter"
%}

---

### Add a Menu node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/menu.md
TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="File"
a1="Use a static file for a version of \" Press 1 to receive a callback or stay on the line for the next available agent\""

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="File"
a5="name of file, variable expression, or TTS"

interruptible="true"
link0="Enter Link Info"
link1="Connect to the end subflow node"
link2="Enter Link Info"
link3="Enter Link Info"
link4="Enter Link Info"
link5="Enter Link Info"
link6="Enter Link Info"
link7="Enter Link Info"
link8="Enter Link Info"
link9="Enter Link Info"
noInputTimeout="3"
noInputLink="Connect to the play music node"
unmatchedLink="Connect to the play music node"
%}

---

### Publish the subflow

---

### Create a new flow for testing

### Create a variable to capture the Queue ID
{% include_relative _parts/flowVariable.md
name="queueId"
type="String"
defaultValue=""
viewable="false"
editable="false"
%}

---

### Add a Menu node to be used for queue/treatment selection    
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/menu.md
TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="File"
a1="Create a recording to say Press 1 for sales, Press 2 for service, Press 3 for default"

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="File"
a5="name of file, variable expression, or TTS"

interruptible="true"
link0="Enter Link Info"
link1="Connect to the Queue contact node for Sales created below "
link2="Connect to the Queue contact node for Service created below"
link3="Connect to the Queue contact node for default created below"
link4="Enter Link Info"
link5="Enter Link Info"
link6="Enter Link Info"
link7="Enter Link Info"
link8="Enter Link Info"
link9="Enter Link Info"
noInputTimeout="3"
noInputLink="Connect to the beginning of this menu node"
unmatchedLink="Connect to the beginning of this menu node"
%}



---

### Add 3 Queue Contact nodes
{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="Queue for sales"
fallback="FallbackQueueName"
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='_done!_'
skillRelax="false"
skillRelaxSteps='_done!_'
nodeExit="Connect to the set variable node created in the next step"
%}

{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="Queue for service"
fallback="FallbackQueueName"
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='_done!_'
skillRelax="false"
skillRelaxSteps='_done!_'
nodeExit="Connect to the set variable node created in the next step"
%}

{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="Queue for default"
fallback="FallbackQueueName"
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='_done!_'
skillRelax="false"
skillRelaxSteps='_done!_'
nodeExit="Connect to the set variable node created in the next step"
%}

---

### Add a Set Variable node after any existing Queue Contact node(s)
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="queueId"
value="Set to the value of the preceding Queue Contact node's Activity Output Variable nodeName.QueueId"
nodeExit="Connect to the subflow node created in the next step"
%}

---

### Add the subflow node from the subflow you created in the previous steps
{% include_relative _parts/subflowNode.md
name="Subflow created in previous steps"
label="Latest"
autoUpdates="true"
inputVar='Current Flow Variable:queueId,Subflow Output Variable:queueId,
_done!_'
outputVar='Current Flow Variable:queueId,Subflow Output Variable:queueId,
_done!_'
nodeExit="Connect to the Callback node created in the next step"
%}

---

### Add a Callback node
{% include_relative _parts/callback.md
callbackDNVar="NewPhoneContact.ANI"
differentQueue="false"
diffQueueType="Static"
queueVar="NameorVar"
cbAniType="Static"
CBAni=""
nodeExit="Connect to a play message node created in the next step"
%}

---

### Add a Play Message node to confirm callback information.
<!-- Tab through values Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMessage.md

TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="File"
a1="Use your standard \"You will receive a callback\" message"

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="name of file, variable expression, or TTS"
a5="name of file, variable expression, or TTS"
nodeExit="Connect to a Disconnect Call node"
%}

---

### Publish your flow and map it to an inbound number for testing

---

## Testing

### Setup
- Download this [zip file]({{site.baseurl}}/assets/supportFiles/customWaitSub/Demo_Audio.zip){:target="\_blank"} and use Bulk Operations to import the audio files.
- Download [this CSV]({{site.baseurl}}/assets/supportFiles/customWaitSub/treatmentBRE.csv){:target="\_blank"}
  - Open the CSV and edit the Key column to hold the value of the Queue ID you would like to associate with the treatment (A2: sales Queue ID A3: service Queue ID).
  - Save the file and follow the instructions in the [BRE Configuration Tool](https://webexcc-sa.github.io/tools/BRE/Configuring_The_BRE){:target="\_blank"} for uploading the data to the BRE.

#### Queue treatment listed as a table

|LOB|MessageCount|MIQ|MessageInterval|callbackOfferEvery|
|:-:|:-:|:-:|:-:|:-:|
|sales|5|defaultmusic_on_hold_cisco_opus_no_1.wav|30|1|
|service|4|defaultmusic_on_hold_cisco_opus_no_1.wav|30|4|
|default|4|defaultmusic_on_hold.wav|30|0|

### MoP
- Call the mapped inbound number associated to the testing flow
  - Press 1 for "Sales" when prompted
  - Listen to the wait treatment
    - You will here:
    - defaultmusic_on_hold_cisco_opus_no_1.wav for 30 seconds
    - "Sales message 1"
    - You will receive the option to receive a callback.
  - If you "remain on the line"
    - You will hear music for another 30 seconds
    - You will hear the corresponding sales message 1-5 which will start again at 1 after playing 5
    - You will receive the option for a callback every with every loop
  - If you opt for a callback:
    - The call will be queued for a callback in the queue you initially selected
    - You will hear a message that you will receive a callback
    - The call will disconnect. 

- Call the mapped inbound number associated to the testing flow
  - Press 2 for "Service"
   - You will here:
    - defaultmusic_on_hold_cisco_opus_no_1.wav for 30 seconds
    - "Service message 1"
    - defaultmusic_on_hold_cisco_opus_no_1.wav for 30 seconds
    - "Service message 2"
  - This pattern will repeat playing Service messages 3 and 4 before offering a callback
    - If you do not opt for a callback, it will play the music in queue and play messages 1 - 4 again before offering another callback opertunity

- Call the mapped inbound number associated to the testing flow
  - Press 3 for "default" 
    - NOTE: any queue not explicitly mapped in the BRE will follow the default treatment in this subflow
  - You will hear defaultmusic_on_hold.wav (different hold music than above) for 30 seconds
  - You will hear "Comfort message 1"
  - You will hear defaultmusic_on_hold.wav for 30 seconds
  - You will hear "Comfort message 1"
- This pattern will repeat playing default (comfort) messages 3 and 4 with alternating music in queue before restarting with "Comfort message 1".
  - You will NOT receive the the option for a callback

---