<ul>
<li><a href="https://help.webex.com/en-us/article/dqekw4/Set-up-business-hours-for-Webex-Contact-Center" target="_blank">(Link to documentation)</a></li>
<li>Name: {{include.name}}</li>
<li>Description: {{include.description}}</li>
<li>Timezone: {{include.timezone}}</li>
<li>Shifts:</li>
{% assign outputs = include.shifts | remove:"_done!_" | split: "^" %}
     <table>
          <thread>
            <tr>
              <th style="text-align: center">Shift Name</th>
              <th style="text-align: center">Days</th>
              <th style="text-align: center">From Time</th>
              <th style="text-align: center">To Time</th>
            </tr>
          </thread>
          <tbody>
{% for items in outputs  %}
{% assign these = items | split: ";"  %}
            <tr>
              <td style="text-align: center">{{these[0] | split:"=" | last}}</td>
              <td style="text-align: center">{{these[1] | split:"=" | last}}</td>
              <td style="text-align: center">{{these[2] | split:"=" | last}}</td>
              <td style="text-align: center">{{these[3] | split:"=" | last}}</td>
            </tr>
{% endfor %}
            </tbody>
            </table> 
<li>Holiday List: {{include.holidayList}}</li>
<li>Override: {{include.override}}</li>
</ul>

