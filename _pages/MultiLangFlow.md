---
title: Multiple Languages Using the Same Flow with Prerecorded Messages
category: Digital
layout: post
mermaid: true
status: draft
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
    defaultValue="EN"
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
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/menu.md
TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="File"
a1="LanguageMenuPrompt.wav"

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="File"
a5="name of file, variable expression, or TTS"

interruptible="true"
link0="Enter Link Info"
link1="Enter Link Info"
link2="link to set lang variable to SP"
link3="link to set lang variable to FR"
link4="Enter Link Info"
link5="Enter Link Info"
link6="Enter Link Info"
link7="Enter Link Info"
link8="Enter Link Info"
link9="Enter Link Info"
noInputTimeout="3"
noInputLink="link to next message node"
unmatchedLink="link to next message node"
%}
---

### Add a Play Message node 
<!-- Tab through values Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMessage.md

TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="Audio Variable"
a1="welcome_\{\{lang\}\}.wav"

type2="File"
a2="name of file, variable expression, or TTS"

type3="File"
a3="name of file, variable expression, or TTS"

type4="File"
a4="name of file, variable expression, or TTS"

type5="name of file, variable expression, or TTS"
a5="name of file, variable expression, or TTS"

%}
---





## Testing

### Setup


### MoP


