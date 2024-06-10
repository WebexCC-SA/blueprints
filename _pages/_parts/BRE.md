<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_1f2a1a18-837b-49dc-9586-03db2b3a9a94" target="_blank">(Link to documentation)</a></li>
<h5>BRE Request Settings</h5>
<ul>
{% assign pPairs = include.params | remove:"_done!_" | split: "||" %}
{% for items in pPairs  %}
{% assign these = items | split: ","  %}
<li>Key: {{these[0] | split:":" | last}} <br>Value: {{these[1] | split:":" | last}}</li>
{% endfor %}
</ul>
<li>Response Timeout (ms): {{include.timeout |default: "2000"}}</li>
<li>Number of retries: {{include.retries | default:"1"}}</li>
<h5>Parse Settings</h5>
<li>Content Type: {{include.responseContentType}}</li>
<ul>
{% assign pPairs = include.parse | remove:"_done!_" | split: "||" %}
{% for items in pPairs  %}
{% assign these = items | split: ","  %}
<li>Output Variable: {{these[0] | split:":" | last}} <br>Path Expression: {{these[1] | split:":" | last}}</li>
{% endfor %}
</ul>
<li>Node Exit: {{include.nodeExit}}</li>
</ul>