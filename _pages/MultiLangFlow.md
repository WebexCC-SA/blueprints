---
title: Multiple Languages Using the Same Flow with Prerecorded Messages
category: Digital
layout: post
mermaid: true
status: live
---

## Problem



## Solution
After collecting the language selection, use string concatenation and variable file names in all play message and menu nodes allowing you to reuse the same flow for more than on language.

### Constraints
You will need to use a naming convention for your message files like chooseDept_en.wav, chooseDept_es.wav, chooseDept_fr.wav.  

## Required Components
- prerecorded message for language selection menu
- prerecorded messages with the same prefix names for their function followed by an underscore language abbreviation, and no spaces i.e. welcome_EN.wav, welcome_SP.wav, welcome_FR.wav
- pebble templates



---

## Method

### Create a Flow Variable for language  
{% include_relative _parts/flowVariable.md 
    name="lang" 
    dValue="EN"
    type="String"  
    %}

---

### Create Set Variable for Spanish
{% include_relative _parts/setVariable.md  
name="lang"
value="SP"
%}


---

### Create Set Variable for French
{% include_relative _parts/setVariable.md  
name="lang"
value="FR"
%}

---


### Create a Menu to select preferred language
{% include_relative _parts/menu.md 
prompt="LanguageMenuPrompt"
link2="link to set lang variable to SP"
link3="link to set lang variable to FR"
noInputLink="loop to node input"
unmatchedLink="link to first prompt or menu node of the rest of the flow"
%}

---



## Testing

### Setup


### MoP