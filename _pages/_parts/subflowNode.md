<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#task-template_776a2728-e42a-4fa4-82ea-77c26198fd53" target="_blank">(Link to documentation)</a></li>
<li>Name: {{include.name}}</li>
<li>Subflow Label: {{include.label"}}</li>
<li>Enable automatic updates: {{include.autoUpdates | default: "true" }}</li>
{% assign inputs = include.inputVar | remove:"_done!_" | split: "^" %}
{% if inputs.size >0 %}
<li>Subflow Input Variables:</li>
     <table>
          <thread>
            <tr>
              <th style="text-align: center">Current Flow Variable</th>
              <th style="text-align: center">Subflow Input Variable</th>
            </tr>
          </thread>
          <tbody>
{% for items in inputs  %}
{% assign these = items | split: ","  %}
            <tr>
              <td style="text-align: center">{{these[0] | split:":" | last}}</td>
              <td style="text-align: center">{{these[1] | split:":" | last}}</td>
            </tr>
{% endfor %}
            </tbody>
    </table>
    {% endif %}
{% assign outputs = include.outputVar | remove:"_done!_" | split: "^" %}
{% if outputs.size >0 %}
<li>Subflow Output Variables:</li>
     <table>
          <thread>
            <tr>
              <th style="text-align: center">Current Flow Variable</th>
              <th style="text-align: center">Subflow Output Variable</th>
            </tr>
          </thread>
          <tbody>
{% for items in outputs  %}
{% assign these = items | split: ","  %}
            <tr>
              <td style="text-align: center">{{these[0] | split:":" | last}}</td>
              <td style="text-align: center">{{these[1] | split:":" | last}}</td>
            </tr>
{% endfor %}
            </tbody>
            </table> 
            {% endif %}
<li>Node Exit: {{include.nodeExit}}</li>
</ul>


