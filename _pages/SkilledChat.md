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

### Create a global variable [(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Task.dita_1d70cd62-fc99-4e7c-baaf-9d9ab2209846){:target="\_blank"}
- Type: String
- Reportable: true
- Agent Viewable: true 
- Agent Editable: true


### Create a Text Skill

### Create a Skill Profile

### Create 2 chat queues

### Create Chat Flow 

#### Add Set Global Variable Node to the flow

### Create Custom Node Integration [(Link to documentation)](https://help.imiconnect.io/docs/custom-nodes){:target="\_blank"}

#### Configure OAuth2

#### Configure the request




<!-- ## Parts 1
{% include_relative _parts/concept.md %}

 -->

