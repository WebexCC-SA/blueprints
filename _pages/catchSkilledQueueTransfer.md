---
title: Catch and Handle Skilled Calls Which Were Transferred Directly to a Queue
category: Digital
layout: post
created: 06/04/2024
updated: 05/07/2023
mermaid: true
status: draft
---

## Problem
Agents may accidentally transfer a skilled call directly to another queue, causing the agents in the queue to not be eligible to receive the call as the skills are not updated when the call is transferred into a queue. This can happen after a call is directly transferred to a queue, consult/transferred to a queue, or consult/transferred to another agent directly.  

## Solution
Check if the call was previously answered using a subflow after the Queue Contact node(s). If the call was not queued in the flow and currently has skills assigned to the call, requeue the call in the appropriate queue without the previous skills.

### Constraints
This solution is pending the release of "Invoke Webex Contact Center APIs from Flow Designer".  
We will be using a String Global Variable to hold the Access Token named AT for the purpose of this blueprint.   
Alternatively, you can use a token management service.

This Solution will be using Variable Queueing and will not be skilling the transferred call, but you could easily use a combination of a Case Statement and the [Transferring a Call to a Skilled Queue Blueprint]({{site.url}}{{site.baseurl}}/pages/transferSkilledCall) to change the outcome.

## Required Components
- Subflow
- Search API
- Global Variable for capturing flow queueing
- Event Flow
- Existing Flows with call skilling

---

## Method

### Create a Subflow
[(Link to Documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#concept-template_2812e465-bde2-4bf8-b133-b64bbddff95b)


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
name="answeredQueueID"
type="String"
defaultValue=""
input="true"
output="false"
sensitive="false"
%}


{% include_relative _parts/subFlowVariable.md
name="currentQueueID"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="existingSkills"
type="String"
defaultValue=""
input="false"
output="false"
sensitive="false"
%}


{% include_relative _parts/subFlowVariable.md
name="queueTo"
type="String"
defaultValue="false"
input="false"
output="true"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="sessionID"
type="String"
defaultValue="false"
input="true"
output="true"
sensitive="false"
%}

---


### Add an HTTP Request to to check the currently assigned queue and if the current call has skills.
{% include_relative _parts/httpRequest.md
authEndpoint="false"
connector="na"
requestPath="https://api.wxcc-us1.cisco.com/search "
method="POST"
params='
Key:orgID,Value:Your ORG ID
_done!_'
headers='
Key:Authorization,Value:Bearer \{\{AT\}\}
_done!_'
requestContentType="Application/JSON"
fileContent="variable name"
body='\{"query":"query queueCheck($from:Long! $to:Long! $timeComparator:QueryTimeType $filter:TaskDetailsFilters)\{taskDetails(from:$from to:$to timeComparator:$timeComparator filter:$filter)\{tasks\{id requiredSkills lastQueue\{id\}\}\}\}","variables":\{"from":"\{\{now() | epoch(inMillis=true) - 86400000 \}\}","to":"\{\{now() | epoch(inMillis=true)\}\}","timeComparator":"createdTime","filter":\{"and":[\{"channelType":\{"equals":"telephony"\}\},\{"id":\{"equals":"\{\{sessionID\}\}"\}\}]\}\}\}'
timeout="2000"
retries="1"
responseContentType="JSON"
parse='
OutputVar:queueTo,Path:$.data.taskDetails.tasks[0].lastQueue.id
||Output Variable:existingSkills,Path Expression:$.data.taskDetails.tasks[0].requiredSkills[0].name
_done!_'
nodeExit="Connect to Case node you will create in the next step"
%}

---

### Add a Condition node
{% include_relative _parts/condition.md
expression="{{ existingSkills is empty or answeredQueueID == queueTo }}"
trueLink="Connect to the set variable node you will create in the next step"
falseLink="Connect to the end subflow node"
%}

---

### Add a Set Variable node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="answeredQueueID"
value="\{\{\}\}"
nodeExit="Connect to end subflow node"
%}

---

### Publish the subflow

---

### Create a New Flow

### Add Flow Variables

{% include_relative _parts/flowVariable.md
name="queueTo"
type="String"
defaultValue=""
viewable="false"
editable="false"
%}

{% include_relative _parts/flowVariable.md
name="answeredQueueID"
type="String"
defaultValue=""
viewable="false"
editable="false"
%}

---

### Add a Queue Contact node

{% include_relative _parts/queueContactVoice.md
queueMethod="Variable"
nameOrVar="queueTo"
fallback="Your preferred fallback queue"
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='_done!_'
skillRelax="false"
skillRelaxSteps='_done!_'
nodeExit="Connect to a Play Music node you will create in the next step"
%}

---

### Add a Play Music node
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression="defaultmusic_on_hold.wav"
offset=""
duration=""
nodeExit="Loop to the front of this Play Music node"
%}

---

### Publish the flow

---

### In your existing skilled call flow(s)

### Add Flow Variables

{% include_relative _parts/flowVariable.md
name="queueTo"
type="String"
defaultValue=""
viewable="false"
editable="false"
%}

{% include_relative _parts/flowVariable.md
name="answeredQueueID"
type="String"
defaultValue=""
viewable="false"
editable="false"
%}

---

### Add a Set Variable node in Event Flows on the AgentAnswered Event
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="answeredQueueID"
value="\{\{ AgentAnswered.QueueID \}\}"
nodeExit="Connect to an end flow node"
%}


---

### Add a Condition node after your Queue Contact node(s)
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{ answeredQueueID is empty \}\}"
trueLink="Connect to the node which was previously connected to the Queue Contact node"
falseLink="Connect to the new subflow node which is added in the next step"
%}

---

### Add the new subflow node
{% include_relative _parts/subflowNode.md
name="Created Above"
label="Latest"
autoUpdates="true"
inputVar='Current Flow Variable:AT,Subflow Output Variable:AT,
^ Current Flow Variable:answeredQueueID,Subflow Output Variable:answeredQueueID,
^ Current Flow Variable:NewPhoneContact.interactionId,Subflow Output Variable:sessionID,
_done!_'
outputVar='Current Flow Variable:queueTo,Subflow Output Variable:QueueTo,
^ Current Flow Variable:answeredQueueID,Subflow Output Variable:answeredQueueID,
_done!_'
nodeExit="Connect to the Condition node created in the next step"
%}

---

### Add another Condition node (or copy the previous one)
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{ answeredQueueID is empty \}\}"
trueLink="Connect to the node which was previously connected to the Queue Contact node"
falseLink="Go To node which will be added in the next step"
%}

---

### Add a Go To node
{% include_relative _parts/goto.md
goToType="Flow"
name="The flow you created in an earlier step"
versionLabel="Latest"
mappedVar='Current:queueTo,Destination:queueTo
_done!_'
%}

---

### Publish the updated flow

---

## Testing

### Setup

### MoP
