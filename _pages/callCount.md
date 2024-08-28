---
title: Count calls in queue across multiple queues using a Get Queue Info node
category: Voice
layout: post
created: 08/28/2024
updated: 
mermaid: true
status: draft
---

## Problem
As an administrator, I need to know the total number of calls in queue across multiple queues, so that I can trigger a high call volume message to new callers.

## Solution
Use a subflow which will loop through a list of queueIds and return an aggregated number of calls in queue.

### Constraints
None

## Required Components
- More that 1 queue
  - A list of queue ids to query

---

## Method

### Create a Subflow
[(Link to Documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#concept-template_2812e465-bde2-4bf8-b133-b64bbddff95b){:target="\_blank"}

---

### Create the following subflow variables

{% include_relative _parts/subFlowVariable.md
name="queueList"
type="String"
defaultValue="comma delimited list of queue ids"
input="false"
output="false"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="callCount"
type="Integer"
defaultValue="0"
input="false"
output="true"
sensitive="false"
%}

{% include_relative _parts/subFlowVariable.md
name="qToCheck"
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

---

### Add a Set Variable node

<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="qToCheck"
value='\{\{ \ (queueList | split(","))[counter] \}\}'
nodeExit="GetQueueInfo node created in next step"
%}

---

### Add a Get Queue Info node

Get queue info node
{% include_relative _parts/getQueueInfo.md
queueMethod="Variable"
nameOrVar="qToCheck"
lookbackTime="5"
nodeExit="Connect to the Set Variable node in the next step"
InsufficientInfo="Connect to the Set Variable node in the next step"
failure="Connect to the Set Variable node in the next step"
%}

---

### Add a Set Variable node

<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="callCount"
value='\{\{ callCount + GetQueueInfo.CallsQueuedNow \}\}'
nodeExit="Set Variable node created in next step"
%}

---

### Add a Set Variable node

<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/setVariable.md
name="counter"
value="\{\{ counter + 1 \}\}"
nodeExit="Condition node created in next step"
%}

---

### Add a Condition node

<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression='\{\{ (queueList | split(",") | length) > counter \}\}'
trueLink="Connect to the Set Variable node for qToCheck"
falseLink="Connect to an End Subflow node"
%}


---

### Publish the subflow

---

### Create a flow for testing



### Create a Flow Variable for the returned call count

{% include_relative _parts/flowVariable.md
name="callCount"
type="Integer"
defaultValue="0"
viewable="false"
editable="false"
%}

---

### Add the Subflow node from the subflow you created in the previous steps

{% include_relative _parts/subflowNode.md
name="Created in previous steps"
label="Latest"
autoUpdates="true"
inputVar='_done!_'
outputVar='Current Flow Variable:callCount,Subflow Output Variable:callCount,
_done!_'
nodeExit="Play message node created in the next step"
%}

---

### Add a Play Message node
<!-- Tab through values Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMessage.md

TTSBool="true"
connector="Cisco TTS"
promptCount=1
type1="TTS"
a1="There are \{\{callCount\}\} calls in the queues"
nodeExit="Connect to a Disconnect Contact node"
%}

---

### Publish the flow and assign it to a channel with an inbound number

---


## Testing

### Setup

- Ensure that your queue ids are populated in the queueList variable of the subflow with a comma separating them and no spaces.
- Ensure that there are calls in at least one of the queues listed in the queueList variable

### MoP

- Call the number assigned to the channel which you pointed to your test flow
  - You will hear a message "There are X calls in the queues" and the call will disconnect.

- You can now use the subflow and the callCount variable in your existing flows to add the high volume logic.

---