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


## Testing

### Setup

### MoP
