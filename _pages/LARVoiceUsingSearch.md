---
title: Last Agent Routing for Voice Using the Search API
category: Voice
layout: post
created: 06/10/2024
updated: 
mermaid: true
status: draft
---

## Problem



## Solution
After setting the Line of Business will be set via a menu selection, use the Search API from inside a subflow to lookup the last agent to work with the customer regarding the same Line of Business, within a relevant timeframe, and route to that agent if they are available.  

### Constraints
This solution is pending the release of "Invoke Webex Contact Center APIs from Flow Designer".  
We will be using a String Global Variable to hold the Access Token named AT for the purpose of this blueprint.   
Alternatively, you can use a token management service.


## Required Components
- Global Variable
- Search API
- Subflow
- HTTP request
- Queue to Agent


---

## Method

### Create a Global Variable for Line of Business
{% include_relative _parts/globalVariable.md
name="LOB"
type="String"
defaultValue=""
reportable="true"
sensitive="false"
viewable="true"
desktopLabel="Line Of Business"
editable="false"
%}

---

### Create a new Subflow
- [(Link to Documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#concept-template_2812e465-bde2-4bf8-b133-b64bbddff95b){:target="\_blank"}

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
name="LARLookback"
type="Integer"
defaultValue="60000"
input="true"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="ani"
type="String"
defaultValue=""
input="true"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="LOB"
type="String"
defaultValue=""
input="true"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="QtoAgent"
type="String"
defaultValue=""
input="false"
output="true"
sensitive="false"
%}

---

### Add an HTTP node
{% include_relative _parts/httpRequest.md
authEndpoint="false"
connector="na"
requestPath="https://api.wxcc-us1.cisco.com/search"
method="POST"
params='
Key:thisKey,orgIdValue:Your Org ID
_done!_'
headers='
Key:Authorization,Value:Bearer \{\{AT\}\}
_done!_'
requestContentType="Application/JSON"
fileContent="variable name"
body='\{"query":"query LARwithLOB($from:Long! $to:Long! $timeComparator:QueryTimeType $filter:TaskFilters)\{task(from:$from,to:$to,timeComparator:$timeComparator,filter:$filter)\{tasks\{id owner\{id\}\}\}\}","variables":\{"from":"\{\{now()|epoch (inMillis=true) - LARLookback \}\}","to":"\{\{now()|epoch (inMillis=true)\}\}","timeComparator":"createdTime","filter":\{"and":[\{"stringGlobalVariables":\{"name":\{"equals":"LOB"\},"value":\{"equals":"\{\{LOB\}\}"\}\}\},\{"owner":\{"id":\{"notequals":null\}\}\},\{"origin":\{"equals":"\{\{ani\}\}"\}\}]\}\}\}'
timeout="2000"
retries="1"
responseContentType="JSON"
parse='
OutputVar:QtoAgent,Path:$.data.task.tasks[0].owner.id
_done!_'
nodeExit="Connect to end subflow node"
%}

---

### Publish the Subflow

---

### Create a new flow

---

### Add the following Global Variables to the flow
- LOB
- AT

---

### Add the following variables to the flow
{% include_relative _parts/flowVariable.md
name="QtoAgent"
type="String"
defaultValue=""
viewable="false"
editable="false"
%}

{% include_relative _parts/flowVariable.md
name="LARLookback"
type="Integer"
defaultValue="60000"
viewable="false"
editable="false"
%}

---

### Add a Menu node to select Line of Business
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/menu.md
TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="File"
a1="For Sales, press 1. For Service Press 2"

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
link1="Connect to set variable node created in the next step to set LOB = Sales"
link2="Connect to set variable node created in the next step to set LOB = Service"
link3="Enter Link Info"
link4="Enter Link Info"
link5="Enter Link Info"
link6="Enter Link Info"
link7="Enter Link Info"
link8="Enter Link Info"
link9="Enter Link Info"
noInputTimeout="3"
noInputLink="Link to beginning of menu node"
unmatchedLink="Link to beginning of menu node"
%}

---

### Add Set Variable nodes
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="LOB"
value="Sales"
nodeExit="Connect to Subflow node created in the next step"
%}

<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="LOB"
value="Service"
nodeExit="Connect to Subflow node created in the next step"
%}

---

### Add Subflow node
{% include_relative _parts/subflowNode.md
name="Created in previous step"
label="Latest"
autoUpdates="true"
inputVar='Current Flow Variable:LOB,Subflow Output Variable:LOB,
^ Current Flow Variable:LARLookback,Subflow Output Variable:LARLookback,
^ Current Flow Variable:AT,Subflow Output Variable:AT,
^ Current Flow Variable:NewPhoneContact.ANI,Subflow Output Variable:ani,
_done!_'
outputVar='Current Flow Variable:QtoAgent,Subflow Output Variable:QtoAgent,
_done!_'
nodeExit="Connect to Condition node created in the next step"
%}

---

### Add a Condition node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{ QtoAgent is not empty \}\}"
trueLink="Connect to Queue To Agent node created in next steps"
falseLink="Connect to Case node created in next steps"
%}  

---

### Add a Queue to Agent node
{% include_relative _parts/queueToAgent.md
agentVar="QtoAgent"
lookupType="ID"
setP="false"
setPMethod="Static"
priorityValue="P9"
reportingQueue="Reporting Queue for Agent Routing"
park="true"
recoveryQueue="Default recovery queue"
nodeExit="Connect to play music node created in next step"
nodeError="Connect to the same Case node as the previous condition false link will be connected in the upcoming steps"
%}

---

### Add a Play Music node to hold the call for 15 seconds if the agent is logged in
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression="defaultmusic_on_hold.wav"
offset=""
duration="15"
nodeExit="Connect to Case node created in the next step"
%}

---

### Add a Case node
{% include_relative _parts/case.md
variableorExpression="variable"
variableorExpressionValue="\{\{ LOB \}\}"
case='Value~Sales;Link to:~Queue Contact node for Sales Queue created in next steps
^ Value~Service;Link to:~Queue Contact node for Service Queue created in next steps
^_done!_'
defaultlink="Queue Contact node for Service Queue created in next steps"
%}

---

### Add Queue Contact nodes
{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="Select the Sales queue"
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
nodeExit="Connect to a new Play Music node created in the next step"
%} 

{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="Select the Service queue"
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
nodeExit="Connect to a new Play Music node created in the next step"
%} 

---

### Add a Play Music node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression="defaultmusic_on_hold_cisco_opus_no_1.wav"
offset=""
duration=""
nodeExit="Loop to the beginning of this Play Music node"
%}

---

### Publish the flow

---


## Testing

### Setup

### MoP
