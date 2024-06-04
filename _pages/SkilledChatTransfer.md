---
title: Transfer Skilled Chat to Another Queue
category: Digital
layout: post
created: 05/06/2024
updated: 05/06/2024
mermaid: true
status: live
---

## Problem

Skilled Chats which get transferred to another queue keep their skills from the previous queueing event.  Need to be able to update the skill when transfer a chat to another queue.

## Solution
Use a Task Modified Flow to evaluate a transferred chat and change the skills of the chat when transferring to a queue.

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


---

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

### Add text skill to the appropriate Skill Profile(s)
- [(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_886a3ba6-94ee-447c-bee7-fe4dc369131d){:target="\_blank"}

---

### Create/use 2 chat queues
{% include_relative _parts/createQueue.md
  name="existing queue"
  ChType="Chat"
  routeType="Skills Based"
  teams="existing teams"
%}

---

{% include_relative _parts/createQueue.md
  name="transfer queue"
  ChType="Chat"
  routeType="Skills Based"
  teams="none"
%}

---

#### Add Set Global Variable Node to the Chat Flow
<img src="{{site.baseurl}}/assets/images/SkilledChatTransfer/Insert_Set_Variable.jpg"> 
- Select global variable you created in the previous steps
- Do not set a default value 


---

### Create Custom Node Integration 
- [(Link to documentation)](https://help.imiconnect.io/docs/custom-nodes){:target="\_blank"}
- Configure OAuth2
- Request Details
  - Type: Post
  - Resource URL: <textarea spellcheck="false" cols="80" rows="1"> https://api.wxcc-us1.cisco.com/search</textarea>
  - Body: 
    <textarea spellcheck="false" cols="100" rows="4" >{"query": "{task(from:\"$(param3)\" to:\"$(param2)\" timeComparator:createdTime filter:{id:{equals:\"$(param1)\"}}){tasks{id lastQueue{name}stringGlobalVariables(name:\"$(param4)\"){name value}}}}"}</textarea>
  - Parameters:
  
    |Parameter|Value Type|Field Name/Value|
    |:-:|:-:|:-:|
    |param3|Dynamic|from|
    |param2|Dynamic|to|
    |param1|Dynamic|taskID|
    |param4|Static|gvName|

- Response:
  - Configure Node Events:
  
    |Node Event|Body|Condition|Value|Node Edge|
    |:-:|:-:|:-:|:-:|:-:|
    |Success|HTTP Status|equals|200|Success|
    |Error|HTTP Status|not equals|200|Error|

  - Response Object
    - Parameter Name: skill
    - Body: Body
    - Response Path: <textarea spellcheck="false" cols="100" rows="1">$.data.task.tasks[0].stringGlobalVariables.value</textarea>


---


### Import and edit the Digital Task Modified Flow
- Import the Digital Task Modified Flow from [github](https://github.com/CiscoDevNet/webexcc-digital-channels){:target="\_blank"}

  <img src="{{site.baseurl}}/assets/images/SkilledChatTransfer/Task_Modified_Flow.jpg">

- Add variables to the Evaluate node to create the timestamps for the Search API
    <textarea spellcheck="false" cols="100" rows="3" >var now = Date.now().toString();
  var tenMin = (Date.now() - 600000).toString();</textarea>
- Add a Delay node
  - Wait 2 seconds
- Add the Custom node
  - Method Name: The method you created above
  - From: $(tenMin)
  - To: $(now)
  - TaskID: $(n2.webex.ID)  
- Add a Queue Task node
  - Task ID: $(n2.webex.ID)
  - Conversation ID: $(MediaResourceId)
  - Queue details:
    - Queue name: existing queue
  - Skill settings:
    - Skill: Text Skill that you created above
    - Condition: IS
    - <details><summary>Skill Value: $(n####.skill)</summary><img src="{{site.baseurl}}/assets/images/SkilledChatTransfer/cNodeSkill.jpg"></details>
  

---

## Testing

### Setup
- Will need 2 agents which have different values assigned to the new text skill.  Both agents should belong to a team which is assigned to the "existing queue".
- Agent 1 should be skilled to receive the initial chat from the "existing queue"
- Agent 2 will need to be assigned a unique value for the new text skill

---

### MoP
1. Send a new chat to the queue which Agent 1 is skilled to receive.
2. After Agent 1 accepts the chat, they will update the global variable created above with the unique text value which Agent 2 has in their text skill.
3. After saving the change to the global variable, Agent 1 will then transfer the chat to the new queue which does not have a team assigned.
4. With Agent 2 Available, they will be delivered the chat in the original queue.

---

