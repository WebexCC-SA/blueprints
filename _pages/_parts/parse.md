<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_c1a3583f-39e9-4250-9bf8-d8f419da6b05" target="_blank">(Link to documentation)</a></li>
<li>Input Variable: {{include.inputVar}}</li>
<li>Content Type: {{include.contentType}}</li>

{% assign monkey = include.OutputVar | remove:"_done!_" | split: "||"  %}
{% for items in monkey  %}
{% assign these = items | split: ","  %}
<li>{{these[0] | split:":" | first}}: {{these[0] | split:":" | last}} <br>
    {{these[1] | split:":" | first}}: {{these[1] | split:":" | last}} </li>
{% endfor %}
<li>Node Exit: {{include.nodeExit}}</li>
</ul>