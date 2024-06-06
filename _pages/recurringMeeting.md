---
title: Schedule a Weekly Recurring Meeting with All or Part of the Contact Center Closed
category: Voice
layout: post
created: 06/04/2024
updated: 05/07/2023
mermaid: true
status: draft
---

## Problem
A line of business in the contact center need to schedule a recurring meeting once per week on Thursday at 11:00 in their timezone.  During this time callers should receive  special routing and messaging.

## Solution
Use business hours to create a special "shift" for the meeting and use a Condition node in the flow to evaluate the shift name for additional routing opportunities.

For this blueprint we are using the following requirements:
- Normal hours 9:00 AM to 5:00 PM Monday - Friday
- The recurring meeting will be scheduled between 11:00 AM and 12:00 PM on Thursday

### Constraints
While this method could be used for events which occur weekly or more frequently, if you need a longer frequency, you will need to use Business Hours Overrides and schedule events independently.


## Required Components
- Business Hours Working Hours
- Existing Flow
- Flow logic to be run during the recurring meeting.
- Flow logic to be run during non-business hours.

---

## Method

### Create a new Business Hours Working Hours
{% include_relative _parts/createBusinessHours.md
name="With Thursday Meeting"
description=""
timezone="Set to meet the needs of the business"
shifts='Name=Working;Days=Monday,Tuesday,Wednesday,Friday;FromTime=9:00 AM;ToTime=5:00 PM
^ Name=Before Meeting;Days=Thursday;FromTime=9:00 AM;ToTime=10:59 AM
^ Name=Meeting;Days=Thursday;FromTime=11:00 AM;ToTime=12:00 PM
^ Name=After Meeting;Days=Thursday;FromTime=12:01 PM;ToTime=5:00 PM
_done!_'
holidayList=""
override=""
%}
---

### In your exciting flow

### Add a Business Hours Node
{% include_relative _parts/businessHoursNode.md
name="With Thursday Meeting"
workingHours="Connect to Condition node created in next step"
Holidays="Connect to current holiday treatment (or to the Condition node working hours is connected to if you do not have an existing treatment)"
Override="Connect to current override treatment (or to the Condition node working hours is connected to if you do not have an existing treatment)"
Default="Connect to normal default (non working hours) treatment (or to the Condition node working hours is connected to if you do not have an existing treatment)"
%}

---

### Add a Condition node
<!-- Escape brackets \{\{ variable \}\} -->
{% include_relative _parts/condition.md
expression="\{\{ BusinessHours_(id postfix from business hours node).WorkingHoursShift_Name == \"Meeting\"\}\}"
trueLink="Connect to treatment for meeting"
falseLink="Connect to the previous next node of your normal flow"
%}


---

#### Publish the flow

---

## Testing

### Setup
- No additional setup required

### MoP
- Call mapped number which will hit your flow during non-meeting hours (Not Thursday between 11:00 AM and 12:00 PM)
  - Your call will be routed normally.
- Call mapped number which will hit your flow during meeting hours (Thursday between 11:00 AM and 12:00 PM)
  - Your call will be routed according to the meeting treatment.

---