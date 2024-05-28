<!-- Escape brackets \{\{ variable \}\} -->
<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_c93b6399-3cd7-4c86-9e82-48a82469fb8e" target="_blank">(Link to documentation)</a></li>
<li>Queue Method: {{include.queueMethod}}</li>
<li>Queue {% if include.queueMethod == "Variable" %}Variable{% else %}Name{% endif %}: {{include.nameOrVar}}</li>
{% if include.queueMethod == "Variable" %}<li>Fallback Queue: {{include.fallback}}</li>{% endif %}
<li>Set Contact Priority: {{include.setPriority}}</li>
{% if include.setPriority == "true" %}<li>Priority Method: {{include.setPMethod}}</li>
<li>{% if include.setPMethod == "Static" %}Static Priority Value: {% else %} Contact Priority Variable:{% endif %} {{include.priorityValue}}</li> {% endif %}
<li>Check Agent Availability: {{include.agentAvail}} </li>
{% if include.agentAvail == "true" %}<li>{{include.agentAvailMethod}}</li>
{% if include.agentAvailMethod == "Variable Agent Availability Check" %} <li>Check Agent Availability Variable: {{include.agentAvailVariable}}</li> {% endif %}{% endif %}
{% assign skills = include.skill | remove:"_done!_" | split: "^" %}

<li>Skill Requirements</li>
     <table>
          <thead>
            <tr>
              <th style="text-align: center">Skill</th>
              <th style="text-align: center">Operator</th>
              <th style="text-align: center">Value Type</th>
              <th style="text-align: center">Value</th>
            </tr>
          </thead>
            <tbody>
{% for items in skills  %}
{% assign these = items | split: ","  %}
            <tr>
              <td style="text-align: center">{{these[0] | split:":" | last}}</td>
              <td style="text-align: center">{{these[1] | split:":" | last}}</td>
              <td style="text-align: center">{{these[2] | split:":" | last}}</td>
              <td style="text-align: center">{{these[3] | split:":" | last}}</td>
            </tr>
{% endfor %}
            </tbody>

            </table>


<li>Enable Skill Relaxation: {{include.skillRelax}}</li>
{% if include.skillRelax == "true" %}<li>Skill Relaxation</li> 
{% assign steps = include.skillRelaxSteps | remove:"_done!_" | split: "^" %}
     <table> 
          <thead>
            <tr>
              <th style="text-align: center">After waiting in <br> queue for (seconds)</th>
              <th style="text-align: center">Skill</th>
              <th style="text-align: center">Operator</th>
              <th style="text-align: center">Value Type</th>
              <th style="text-align: center">Value</th>
            </tr>
          </thead>
            <tbody>
{% for items in steps  %}
{% assign these = items | split: ","  %}
            <tr>
              <td style="text-align: center">{{these[0] | split:":" | last}}</td>
              <td style="text-align: center">{{these[1] | split:":" | last}}</td>
              <td style="text-align: center">{{these[2] | split:":" | last}}</td>
              <td style="text-align: center">{{these[3] | split:":" | last}}</td>
              <td style="text-align: center">{{these[4] | split:":" | last}}</td>
            </tr>
{% endfor %}
            </tbody>

            </table>
{% endif %}

<li>Node Exit: </li>
</ul>

