<!-- Queue -->
<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#task_0D969AB2DE725459343B382EBD0841D4" target="_blank">(Link to documentation)</a></li>
<li>Name: {{include.name}}</li>
<li>Queue Type: {{include.queueType | default: "Inbound Queue"}}</li>
<li>Channel Type: {{include.ChType | default: "Telephony"}}</li>
<li>Queue Routing Type: {{include.routeType | default: "Longest Available Agent"}}</li>
{% if include.routeType == "Skill Based" %}<li>Select Agent: {{include.skillStyle | default: "Agent available longest"}}</li>{% endif %}
<li>Distribution: {{include.teams}}</li>
<li>Configure the Advanced Settings to meet the needs of the business.</li>
</ul>