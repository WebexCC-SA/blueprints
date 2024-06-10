---
title: Transferring a Call to a Skilled Queue
category: Voice
layout: post
created: 06/04/2024
updated: 
mermaid: true
status: live
---

## Problem
If you transfer a skilled call to a queue the skills do not update causing the call to not be delivered to an agent.

## Solution
Transfer the call to an Entry Point named with the transfer purpose/queue name which is mapped to a flow that will properly skill the call.

### Constraints


## Required Components
- Two or more skilled queues
- Two skills
- Optional: Configure the Desktop Profiles to only provide the Entry Point names for valid transfers

---

## Method

### Create Skills
{% include_relative _parts/skill.md
name="Skill1"
type="Proficiency"
enumVals=""
%}

{% include_relative _parts/skill.md
name="Skill2"
type="Proficiency"
enumVals=""
%}  

---

### Create Queues
{% include_relative _parts/createQueue.md
name="SkillQueue1"
queueType="Inbound Queue"
ChType="Telephony"
routeType="Skill Based"
skillStyle="Best available agent"
teams="assign test agent 1 to a team and select it"
%}

{% include_relative _parts/createQueue.md
name="SkillQueue2"
queueType="Inbound Queue"
ChType="Telephony"
routeType="Skill Based"
skillStyle="Best available agent"
teams="assign test agent 2 to a team and select it"
%}

---

### Create Entry Points
{% include_relative _parts/entryPointVoice.md
name="LOB1"
description="Transfer EP and/or normal EP for LOB1 group"
type="Inbound Telephony"
flowName=""
version=""
music="defaultmusic_on_hold.wav"
numberMapping="Map an available number"
%}

{% include_relative _parts/entryPointVoice.md
name="LOB2"
description="Transfer EP for LOB2"
type="Inbound Telephony"
flowName=""
version=""
music="defaultmusic_on_hold.wav"
numberMapping="none needed"
%}

---


### Create a new flow

### Add a Queue Contact node
{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="SkillQueue1"
fallback="FallbackQueueName"
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='Skill:Skill1,Operator:>=,Value Type:Static, Value:5
_done!_'
skillRelax="false"
skillRelaxSteps='none'
nodeExit="Connect to Play Music node"
%}

---

### Add Play Music node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression="defaultmusic_on_hold.wav"
offset=""
duration=""
nodeExit="Loop to the front of this Play Music node"
%}

---

#### Publish flow and map it to Entry Point LOB1

---

### Create a second new flow

### Add a Queue Contact node
{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar="SkillQueue2"
fallback="FallbackQueueName"
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='Skill:Skill2,Operator:>=,Value Type:Static, Value:5
_done!_'
skillRelax="false"
skillRelaxSteps='none'
nodeExit="Connect to Play Music node"
%}

---

### Add Play Music node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression="defaultmusic_on_hold.wav"
offset=""
duration=""
nodeExit="Loop to the front of this Play Music node"
%}

---

#### Publish flow and map it to Entry Point LOB2

---


## Testing

### Setup
- Will need 2 agents setup with skill profiles.
  - Agent 1
    - In team for SkillQueue1 and have Skill1 assigned at 5 or higher.
    - In team for SkillQueue2 and have Skill2 assigned at 5 or higher.
- Both agents should be logged in and Available.

### MoP
- Place a call to the number mapped to LOB1
  - Agent1 will be offered the call and should answer it.
- Agent1 will transfer the call to LOB2 by selecting Transfer > Queue > LOB2
  - The call will be reskilled by the flow assigned to the Entry Point.
  - The call will be delivered to Agent2 in SkillQueue2.
- Note: If you want to transfer the call back to LOB1 you will need another agent skilled with Skill1 and assigned to SkillQueue1 as the same agent will not be delivered the same call more than once from a queue. 

---