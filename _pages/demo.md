---
title: Title of blueprint
category: Digital
layout: post
created: 05/06/2023
updated: 05/07/2023
mermaid: true
status: draft
---

## Problem

## Solution

### Constraints

## Required Components


---

## Method
{% include_relative _parts/flowVariable.md
name="jim"
type="Boolean"
defaultValue="true"
viewable="true"
editable="false"
%}

---

### http request
{% include_relative _parts/httpRequest.md
authEndpoint="false"
connector="na"
requestPath="http://www.google.com"
method="GET"
params='
Key:thisKey,Value:$.money
||Key:bill,Value:steve
_done!_'
headers='
Key:headKey,Value:funk
_done!_'
requestContentType="Application/JSON"
fileContent="variable name"
body=''
timeout="2000"
retries="1"
responseContentType="JSON"
parse='
OutputVar:willy,Path:$.wonka
||Output Variable:seth,Path Expression:$.seth
_done!_'
%}

---

{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar=""
fallback=""
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='_done!_'
skillRelax="true"

%}


### queue test
{% include_relative _parts/queueContactVoice.md
queueMethod="Static"
nameOrVar=""
fallback="FallbackQueueName"
setPriority="false"
setPMethod="Static"
priorityValue="10"
agentAvail="false"
agentAvailMethod="Static"
agentAvailVariable=""
skill='Skill:this,Operator:is,Value Type:Static, Value:real  ^ Skill:still another,Operator:<=,Value Type:Static, Value:9  _done!_'
skillRelax="true"
skillRelaxSteps='Relax After: 60, Skill:this, Operator:isnot, Value Type:Static, Value:real  ^ Relax After: 60, Skill:still another, Operator:<=, Value Type:Static, Value:2  _done!_'
%}


### callback1 
{% include_relative _parts/callback.md
callbackDNVar="NewPhoneContact.ANI"
differentQueue="false"
diffQueueType="Static"
queueVar="bill"
cbAniType="Variable"
CBAni="kyle"
nodeExit=""
%}

### callback2
{% include_relative _parts/callback.md
callbackDNVar="NewPhoneContact.ANI"
differentQueue="false"
diffQueueType="Static"
queueVar="NameorVar"
cbAniType="Static"
CBAni="bill"
nodeExit="to disconnect call node"
%}

### Go To EP
{% include_relative _parts/goto.md
goToType="Entry Point"
name="mike"
versionLabe=""
mappedVar=''
%}


### Go To Flow

{% include_relative _parts/goto.md
goToType="Flow"
name="mike"
versionLabe="Live"
mappedVar='Current:mike,Destination:steve 
^ Current:kyle,Destination:bill'
%}

### Go to test
{% include_relative _parts/goto.md
goToType="Flow"
name="hnn"
versionLabel="Live"
mappedVar='_done!_'
%}




## Testing

### Setup

### MoP
