---
title: Transfer Skilled Chat to Another Queue
category: Digital
layout: post
mermaid: true
---

## Problem
Skilled Chats which get transferred to another queue keep their skills from the previous queueing event.

## Solution
Change the skills when transferring the chat to another queue.

### Constraints
This example will be using a single text skill, single global variable, and a single skilled queue for the purpose of simplicity and containment.


## Required Components
- Reportable, Agent Viewable, and Agent Editable String Global Variable
- Text Skill for skill assignment
- 2 chat queues with at least 1 being a skilled queue
- Functioning chat flow
- Integration Custom Node 
  - Developer Integration App
  - Search API
- Digital Task Modified Flow


## Method

### Create a Global Variable
{% include_relative _parts/globalVariable.md 
    reportable="true" 
    viewable="true" 
    editable="true" 
    type="String"  
    %}

---

### Create a Text Skill
{% include_relative _parts/skill.md 
    name="TransferSkill"
    type="Text"
%}

---

### Add text skill to a Skill Profile
- [(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_886a3ba6-94ee-447c-bee7-fe4dc369131d){:target="\_blank"}

---

### Create/use 2 chat queues
{ % include_relative _parts/queue.md 
  name="existing queue"
  ChType="Chat"
  routeType="Skills Based"
  teams="existing teams"
% }


{ % include_relative _parts/queue.md 
  name="transfer queue"
  ChType="Chat"
  routeType="Skills Based"
  teams="none"
% }

---

#### Add Set Global Variable Node to the Chat Flow
- img
- 


---

### Create Custom Node Integration 
- [(Link to documentation)](https://help.imiconnect.io/docs/custom-nodes){:target="\_blank"}
- 

---


### Import and edit the Digital Task Modified Flow
- Import the Digital Task Modified Flow from [github](https://github.com/CiscoDevNet/webexcc-digital-channels){:target="\_blank"}
- - <img src="{{site.baseurl}}/assets/images/SkilledChatTransfer/Task_Modified_Flow.jpg">
- Add variables to the Evaluate node
- Add a Wait node
- Add the Custom node
- Add a Queue Contact node


## Testing

### Setup

### MoP

