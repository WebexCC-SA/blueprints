
<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_8768b492-9297-4ae9-af68-c209cd538d76" target="_blank">(Link to documentation)</a></li>
<li>Agent Variable: {{include.agentVar}}</li>
<li>Agent Lookup Type: {{include.lookupType}}</li>
<li>Set Contact Priority: {{include.setP}}</li>
{% if include.setP == "true" %}<li>Priority Method: {{include.setPMethod}}</li>
<li>{% if include.setPMethod == "Static" %}Static Priority Value: {% else %} Contact Priority Variable:{% endif %} {{include.priorityValue}}</li> {% endif %}
<li>Reporting Queue: {{include.reportingQueue}}</li>
<li>Park Contact if Agent Unavailable: {{include.park}}</li>
<li>Recovery Queue: {{include.recoveryQueue}}</li>
<li>Node Exit: {{include.nodeExit}}</li>
<li>Node Error: {{include.nodeError}}</li>
</ul>
