<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Reference.dita_73019837-1eec-4f05-b490-7b9ae5568683" target="_blank">(Link to documentation)</a></li>
<li>Go To: {{include.goToType}}</li>
<li>{{include.goToType}} Name: {{include.name}}</li>
{% if include.goToType == "Flow" %}<li>Version Label: {{include.versionLabel}}</li> {% endif %}
{% assign maps = include.mappedVar | remove:"_done!_" | split: "^" %}
{% if maps.size >0 %}
<li>Variable Mapping:</li>
     <table>
          <thead>
            <tr>
              <th style="text-align: center">Current Variable</th>
              <th style="text-align: center">Destination Variable</th>
            </tr>
          </thead>
            <tbody>
{% for items in maps  %}
{% assign these = items | split: ","  %}
            <tr>
              <td style="text-align: center">{{these[0] | split:":" | last}}</td>
              <td style="text-align: center">{{these[1] | split:":" | last}}</td>

            </tr>
{% endfor %}
            </tbody>

            </table>
{% endif %}
</ul>

