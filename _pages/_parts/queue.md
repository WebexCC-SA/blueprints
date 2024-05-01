<!-- Queue -->
- [(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#task_0D969AB2DE725459343B382EBD0841D4){:target="\_blank"}
- Name: {{include.name | escape}}
- Queue Type: {{include.queueType | "Inbound Queue"}}
- Channel Type: {{include.ChType | "Telephony"}}
- Queue Routing Type: {{include.routeType | "Longest Available Agent"}}
- Teams: {{include.teams}}