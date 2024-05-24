---
title: Handling Duplicate Callbacks
category: Digital
layout: post
created: 05/06/2023
updated: 05/07/2023
mermaid: true
status: draft
---

### Create Flow Variable
{% include_relative _parts/flowVariable.md
name="test"
type="String"
defaultValue="nope"
viewable="true"
editable="true"
%}
---

### Create Global Variable
{% include_relative _parts/globalVariable.md
name="name"
type="String"
defaultValue="not at all"
reportable="false"
sensitive="false"
viewable="false"
desktopLabel="bob"
editable="false"
%}
---


### Create queue
{% include_relative _parts/createQueue.md
name="mike"
queueType="Outbound Queue"
ChType="Telephony"
routeType="Skill Based"
skillStyle="Best available agent"
teams="some"
%}
---

### Create Skill
{% include_relative _parts/skill.md
name="steve"
type="Boolean"
enumVals=""
%}
---

### Create Skill
{% include_relative _parts/skill.md
name="mike"
type="Enum"
enumVals="one,two,three"
%}
---

### Collect Digits
<!-- Escape brackets \\{\\{ variable \\}\\} -->
{% include_relative _parts/collectDigits.md
TTSBool="false"
connector="name"
voice="name"
promptCount=1

type1="File"
a1="bill.wav"

type2="File"
a2="steve.wav"

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
maxDigits="10"
termSymbol="#"
noInputLink=""
unmatchedLink=""
%}
---

### Parse
{% include_relative _parts/parse.md
inputVar="this"
contentType="JSON"
OutputVar='Output Variable:is,Path Expression:$.silly
 ||Output Variable:second,Path Expression:$.billiam
 _done!_'
%}

---

### Condition 
{% include_relative _parts/condition.md
expression="\{\{ bill >=2 \}\}"
trueLink="connect to super bill"
falseLink="connect to disconnect"
%}

<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression=" \{\{steve\}\}"
trueLink="to super bill"
falseLink="to disconnect"
%}




### Add HTTP Request
{% include_relative _parts/httpRequest.md
authEndpoint="false"
connector="na"
requestPath="http://www.google.com"
method="GET"
params='Key:thisKey,Value:$.money||Key:thatKey,Value:$.cash_done!_'
headers='Key:headKey,Value:funk||Key:thatKey2,Value:$.cashCash_done!_'
requestContentType="Application/JSON"
body=''
timeout="2000"
retries="1"
responseContentType="JSON"
parse='OutputVar:willy,Path:$.wonka||OutputVar:mike,Path:$.TV_done!_'
%}

### http from snip maybe??
{% include_relative _parts/httpRequest.md
authEndpoint="false"
connector="na"
requestPath="http://www.google.com"
method="GET"
params='
Key:thisKey,Value:$.money
||Key:name,Value:expression
_done!_'
headers='
Key:headKey,Value:funk
||Key:name,Value:expression
_done!_'
requestContentType="Application/JSON"
fileContent="variable name"
body=''
timeout="2000"
retries="1"
responseContentType="JSON"
parse='
OutputVar:willy,Path:$.wonka
_done!_'
%}

### Play Music
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression=""
offset=""
duration=""
%}

<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/playMusic.md
type="static"
musicFileOrExpression="moh.wav"
offset=""
duration=""
%}

### Queue to Agent
{% include_relative _parts/queueToAgent.md
agentVar="var"
lookupType="Email,ID"
setP="false,true"
setPMethod="Static,Variable"
priorityValue="P10"
reportingQueue="name"
park="false,true"
recoveryQueue="name"
nodeExit=""
nodeError=""
%}

{% include_relative _parts/queueToAgent.md
agentVar="bill"
lookupType="Email"
setP="false"
setPMethod="Static"
priorityValue="P10"
reportingQueue="hmm"
park="true"
recoveryQueue="neat"
nodeExit="don't care"
nodeError="HA!!"
%}