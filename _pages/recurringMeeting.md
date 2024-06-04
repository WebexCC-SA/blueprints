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
Use business hours to create a special "shift" for the meeting and have a Condition or Case node in the flow to evaluate the shift names for additional routing opportunities.

### Constraints
While this method could be used for events which occur weekly or more frequently, if you need a longer frequency, you will need to use Business Hour Overrides and schedule events independently.

## Required Components


---

## Method


---


## Testing

### Setup

### MoP
