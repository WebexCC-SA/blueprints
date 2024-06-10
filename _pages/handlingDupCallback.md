---
title: Handling Duplicate Callback Requests
category: Voice
layout: post
created: 06/04/2024
updated: 
mermaid: true
status: live
---

## Problem

After opting to receive a callback, customers will call back in and opt for additional callbacks creating duplicate callback requests and inflating the queue.

## Solution

When a new call enters the IVR, use the Search API check the ANI for a pending callback.  If a pending callback exists for the calling number, provide the caller with their position in the callback queue so that they know how many calls are ahead of them.

### Constraints
This solution is pending the release of "Invoke Webex Contact Center APIs from Flow Designer".  
We will be using a String Global Variable to hold the Access Token named AT for the purpose of this blueprint.   
Alternatively, you can use a token management service.

## Required Components
- Existing flow with option for requesting a callback
- Sub Flow
- Search API
- Text-To-Speech
- HTTP requests

---

## Method

### Create a new subflow
[(Link to Documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#concept-template_2812e465-bde2-4bf8-b133-b64bbddff95b){:target="\_blank"}

---

### Create a subflow variable for the access token for making the API calls
Note: This step will likely be replaced once "Invoke Webex Contact Center APIs from Flow Designer" is available in the flow designer
 {% include_relative _parts/subFlowVariable.md
 name="AT"
 type="String"
 defaultValue=""
 input="true"
 output="false"
 sensitive="true"
 %}
 
---

### Create these additional subflow variables.
{% include_relative _parts/subFlowVariable.md
name="ANI"
type="String"
defaultValue=""
input="true"
output="false"
sensitive="false"
%}


{% include_relative _parts/subFlowVariable.md
name="TaskID"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="queueID"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="status"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="existingCallback"
type="Boolean"
defaultValue="false"
input="false"
output="true"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="list"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="position"
type="Integer"
defaultValue="0"
input="false"
output="false"
sensitive="false"
%}

---

### Add an HTTP Request to check for an existing callback using the caller's ANI
{% include_relative _parts/httpRequest.md
authEndpoint="false"
connector="na"
requestPath="https://api.wxcc-us1.cisco.com/search"
method="POST"
params='
Key:orgID,Value:Your ORG ID
_done!_'    
headers='
Key:Authorization,Value:Bearer \{\{AT\}\}
_done!_'
requestContentType="Application/JSON"
fileContent="variable name"
body='\{"query":"query callbackCheck($from:Long! $to:Long! $filter:TaskFilters $timeComparator:QueryTimeType)\{task(from:$from,to:$to,filter:$filter,timeComparator:$timeComparator)\{tasks\{id status lastQueue\{id\}\}\}\}","variables":\{"from":"\{\{now()|epoch (inMillis=true) -86400000 \}\}","to":"\{\{now()|epoch (inMillis=true)\}\}","filter":\{"and":[\{"origin":\{"equals":"\{\{ANI\}\}"\}\},\{"isActive":\{"equals":true\}\},\{"isCallback":\{"equals":true\}\}]\},"timeComparator":"createdTime"\}\}'
timeout="2000"
retries="1"
responseContentType="JSON"
parse='
||Output Variable:queueID,Path Expression:$.data.task.tasks[0].lastQueue.id
||Output Variable:status,Path Expression:$.data.task.tasks[0].status
||Output Variable:TaskID,Path Expression:$.data.task.tasks[0].id
_done!_'
nodeExit="Connect to the Condition node you will add below"
%}

---


### Add Set Variable node to return false if there is NOT an existing callback
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="existingCallback"
value="false"
nodeExit="Connect to end subflow node"
%}

### Add Set Variable node to return true if there is an existing callback
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="existingCallback"
value="true"
nodeExit="HTTP request to get the caller's position in the queue (listed lower in the method section)"
%}

---

### Add a Condition node to test if there is an existing callback request
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{status == \"parked\" or status == \"connect\"\}\}" 
trueLink="Connect to set variable node for existing callback = true"
falseLink="Connect to set variable node for existing callback = false"
%}

---

### Add HTTP Request to calculate the existing callback's position in the queue
{% include_relative _parts/httpRequest.md
authEndpoint="false"
connector="na"
requestPath="https://api.wxcc-us1.cisco.com/search"
method="POST"
params='
Key:orgID,Value:Your ORG ID
_done!_'    
headers='
Key:Authorization,Value:Bearer \{\{AT\}\}
_done!_'
requestContentType="Application/JSON"
fileContent="variable name"
body='\{"query":"query PIQlist($from:Long! $to:Long! $timeComparator:QueryTimeType $filter:TaskFilters)\{task(from:$from,to:$to,timeComparator:$timeComparator,filter:$filter)\{tasks\{id\}\}\}","variables":\{"from":"\{\{now()|epoch (inMillis=true) - 86400000 \}\}","to":"\{\{now()|epoch (inMillis=true)\}\}","filter":\{"and":[\{"origin":\{"equals":"\{\{ANI\}\}"\}\},"timeComparator":"createdTime","filter":\{"and":[\{"isActive":\{"equals":true\}\},\{"lastQueue":\{"id":\{"equals":"\{\{queueID\}\}"\}\}\}]\}\}\}'
timeout="2000"
retries="1"
responseContentType="JSON"
parse='
||Output Variable:list,Path Expression:$.data.task.tasks..id
_done!_'
nodeExit="Connect to the Set Variable node you create in the next step of the method"
%}

---


### Add a Set Variable node to calculate the position of the existing callback in the queue
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="position"
value="\{\{ list | split(TaskID) | first | split(\",\") | length \}\}"
nodeExit="Connect to the Play Message node created in the next step of the method"
%}

---

### Add a Play Message node to inform the caller they already have a pending callback and their position in the queue
<!-- Tab through values Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMessage.md

TTSBool="true"
connector="Select your Connector"
voice="Select your preferred voice"
promptCount=1

type1="TTS"
a1='\<speak\>
You already have a callback in queue which is the \<say-as interpret-as="ordinal"\> \{\{position\}\} </say-as> call in line.  You will receive a callback when it is your turn.  Thank you.
</speak>'

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="name of file, variable expression, or TTS"
a5="name of file, variable expression, or TTS"

nodeExit="Connect to end subflow node"
%}  

---
### Publish your Subflow

---

### In your existing flow

### Add the AT Global Variable to the flow


### Create a Flow Variable
{% include_relative _parts/flowVariable.md
name="existingCallback"
type="Boolean"
defaultValue="false"
viewable="false"
editable="false"
%}


---

### After the call enters the flow add your new subflow 
{% include_relative _parts/subflowNode.md
name="Created in previous steps"
label="Latest"
autoUpdates="true"
inputVar=' Current Flow Variable:NewPhoneContact.ANI,Subflow Output Variable:ANI,
^ Current Flow Variable:AT,Subflow Output Variable:AT,
_done!_'
outputVar='Current Flow Variable:existingCallback,Subflow Output Variable:existingCallback,
_done!_'
nodeExit="Connect to Condition node created in the next step"
%}

---

### Add a Condition node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{existingCallback\}\}"
trueLink="Connect to a disconnect call node"
falseLink="Connect to the beginning of you preexisting flow"
%}

### Publish the flow

---

## Testing

### Setup
- Ensure that the Global Variable AT has a current Access Token.
- Ensure that the main flow is mapped a number.
  
### MoP
- Call the mapped number associated with the channel the main flow is assigned to.
  - Select to receive a callback.
- Call the mapped number from the same ANI as the first call.
  - You will receive the message that you already have a callback and the position in the queue.

---