<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_2a7326f7-67da-4157-bab1-e477b219ec7e" target="_blank">(Link to documentation)</a></li>
<li>Callback Dial Number: {{include.callbackDNVar}}</li>
<li>Register callback to different destination: {{include.differentQueue}}</li>
{% if include.differentQueue == "true" %}<li>Queue Type: {{include.diffQueueType}}</li>
<li>{% if include.diffQueueType == "Variable" %}Variable{% else %}Static{% endif %} Queue: {{include.queueVar}}</li> {% endif %}
<li>Callback ANI Type: {{include.cbAniType}}</li>
<li>{% if include.cbAniType == "Variable" %}Variable{% else %}Static{% endif %} ANI: {{include.CBAni}}</li>
<li>Node Exit: {{include.nodeExit}}</li>
</ul>
