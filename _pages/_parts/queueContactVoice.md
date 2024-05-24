<!-- Escape brackets \{\{ variable \}\} -->
<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_c93b6399-3cd7-4c86-9e82-48a82469fb8e" target="_blank">(Link to documentation)</a></li>
<li>Queue Method: {{include.queueMethod}}</li>
<li>Queue {% if include.queueMethod == "Variable" %}Variable{% else %}Name{% endif %}: {{include.nameOrVar}}</li>
{% if include.queueMethod == "Variable" %}<li>Fallback Queue: {{include.fallback}}</li>{% endif %}
<li>Set Contact Priority: {{include.setP}}</li>
{% if include.setP == "true" %}<li>Priority Method: {{include.setPMethod}}</li>
<li>{% if include.setPMethod == "Static" %}Static Priority Value: {% else %} Contact Priority Variable:{% endif %} {{include.priorityValue}}</li> {% endif %}
<li>Check Agent Availability: {{include.agentAvail}} </li>
{% if include.agentAvail == "true" %}<li>{{include.agentAvailMethod}}</li>
{% if include.agentAvailMethod == "Variable Agent Availability Check" %} <li>Check Agent Availability Variable: {{include.agentAvailVariable}}</li> {% endif %}{% endif %}

<li>Skill Requirements</li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li>Enable Skill Relaxation: {{include.skillRelax}}</li>
<li>Skill Relaxation</li>
After waiting in queue for (seconds):
Set skill requirements to:
<li>Node Exit: </li>
</ul>

