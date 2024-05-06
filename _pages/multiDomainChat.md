---
title: Multiple domains using the same Connect flow for chat.
category: Digital
layout: post
mermaid: true
---

## Problem
Customers can have more than one domain where they want to host their chat applet, but want to use the same Connect flow. Connect only allows for a single value to be evaluated for the chat domain, but Engage allows the configuration of multiple websites. 


## Solution
Use the Evaluate node to check the originating domain against a list of approved values.  If the originating domain is on the list, update the flow variable which is used in the Resolve Conversation node   


### Constraints

The reason that Connect confirms the originating domain is for security, which is why we are comparing to a list of domains and not just allowing any domain.


## Required Components
- Existing or new Chat flow
- Transaction Actions
- Evaluate Node

---

## Method

### Create and populate the extras custom variable
- Open the Configure APP Event in your chat flow
- In the Transaction Actions tab in the On-leave > Set variable Action
  - Add the variable extras (if it does not already exist)
  - Set the value to <textarea spellcheck="false" cols="50" rows="1">$(n2.inappmessaging.message.extras)</textarea> 

---

### Edit the Evaluate node javascript
- Create a list of domains which your chat will originate from and format is like this:
    <textarea spellcheck="false" cols="95" rows="2">"webexcc.github.io" || "luminous-petal-change.glitch.me" || "another.domain.of.your.customer"</textarea>

- Below the "Handle Blank Message Section" and above the "Parse PCI Compliance attachment payload For LiveChat" (approx line 14) add these lines of code, substituting your domain list:
    <textarea spellcheck="false" cols="95" rows="5">
// Multi Domain Chat
if (JSON.parse(extras).Website == "webexcc.github.io" || "luminous-petal-change.glitch.me") {
    liveChatDomain = JSON.parse(extras).Website
}</textarea>


 


---


## Testing

### Setup
- Configure Chat for different domains
- Add the chat code to websites on the different domains
- Update the Evaluate node to include the domains as shown above.

### MoP
- Start a chat from the different domains and confirm that they are processed the same.