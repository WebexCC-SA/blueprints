<!-- Queue -->
- [(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#task_0D969AB2DE725459343B382EBD0841D4){:target="\_blank"}
- Name: {{include.name}}
- Queue Type: {{include.queueType | default: "Inbound Queue"}}
- Channel Type: {{include.ChType | default: "Telephony"}}
- Queue Routing Type: {{include.routeType | default: "Longest Available Agent"}}
- Teams: {{include.teams}}