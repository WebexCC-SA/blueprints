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
- Integration Custom Node 
  - Developer Integration App
  - Search API
- Digital Task Modified Flow


## Parts 1
{% include_relative _parts/concept.md %}



## direct graph
  ```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```