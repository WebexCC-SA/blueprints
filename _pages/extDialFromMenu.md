---
title: Emulate Dial a Webex Calling Extension Option Directly Inside a Menu 
category: Voice
layout: post
created: 06/17/2024
updated: 
mermaid: true
status: live
---

## Problem
Customers want to be able to pick from a menu or dial a Webex Calling extension from the same prompt.

## Solution
Use a collect digits with a case statement to evaluate the digits entered and either route to a menu selection or transfer to an extension.

### Constraints
In this Blueprint we are not going to be validating that the Webex Calling extension exists, but this functionality could be added.

## Required Components
- A four digit extension in Webex Calling to accept the transfer

---

## Method

### Add two Queues 
{% include_relative _parts/createQueue.md
name="Sales"
queueType="Inbound Queue"
ChType="Telephony"
routeType="Longest Available Agent"
skillStyle="Agent available longest"
teams="any"
%}

{% include_relative _parts/createQueue.md
name="Service"
queueType="Inbound Queue"
ChType="Telephony"
routeType="Longest Available Agent"
skillStyle="Agent available longest"
teams="any"
%}


---

### Create a new Flow

---

### Add a Collect Digits node
<!-- Escape brackets \\{\\{ variable \\}\\} -->
{% include_relative _parts/collectDigits.md
TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="File"
a1="Thank you for calling... If you know your party's extension, you may dial it at any time.  For Sales, Press 1.  For Service Press 2. ..."

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="File"
a5="name of file, variable expression, or TTS"

interruptible="true"
noInputTimeout="3"
interDigitTimeout="3"
minDigits="1"
maxDigits="4 (or teh number of digits that you use for extensions in Webex Calling)"
termSymbol="#"
noInputLink="Connect to the beginning og this node"
unmatchedLink="Connect to the beginning of this node"
%}

---

### Add a Case node
<!--  c# = the case expression. Tab through values. Escape brackets \{\{ variable \}\} " -->
{% include_relative _parts/case.md
variableorExpression="variable"
variableorExpressionValue="CollectDigits_xxx.DigitsEntered"
case='Value~1;Link to:~Queue Contact node for Sales created in the next steps
^ Value~2;Link to:~Queue Contact node for Service created in the next steps
^_done!_'
defaultlink="Connect to a Blind Transfer node which will be added in a future step"
%}

---

### Add two Queue Contact nodes
{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="Sales"
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
nodeExit="Connect to a Play Music node which will be added in the next step."
%}

{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="Service"
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
nodeExit="Connect to a Play Music node which will be added in the next step."
%}

---

### Add a Play Music node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression="defaultmusic_on_hold.wav"
offset=""
duration=""
nodeExit="Connect to the front of this Play Music node"
%}


---

### Add a Blind Transfer node
{% include_relative _parts/blindTransfer.md
type="Variable"
DN="CollectDigits_xxx.DigitsEntered"
%}

---

### Publish the flow

---


## Testing

### Setup
- Create an extension in Webex Calling and not the Extension number
- Map the new flow to a DN for testing

### MoP
- Call the mapped number
  - When prompted by the menu, press 1.
    - The call will be queued to the Sales Queue.
- Call the mapped number
  - When prompted by the menu, press 2.
    - The call will be queued to the Service Queue.
- Call the mapped number
  - When prompted by the menu, enter the extension number for the Webex Calling extension you created.
    - The call will be transferred to the Webex Calling extension.