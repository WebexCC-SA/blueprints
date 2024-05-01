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

{% include_relative _parts/globalVariable.md 
    reportable="true" 
    viewable="true" 
    editable="true" 
    type="String"  
%}
- extra item in main blueprint

---

### Create a Text Skill

### Add text skill to a Skill Profile

### Create 2 chat queues

#### Add Set Global Variable Node to the chat flow

### Create Custom Node Integration 
- [(Link to documentation)](https://help.imiconnect.io/docs/custom-nodes){:target="\_blank"}
- 




