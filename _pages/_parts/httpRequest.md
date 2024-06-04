<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_b1192550-38d4-46e5-be3d-2119794def93" target="_blank">(Link to documentation)</a></li>
<h5>Request Settings</h5>
<li>Use Authenticated Endpoint: {{include.authEndpoint}}</li>
{% if include.authEndpoint == "true" %}<li>Connector: {{include.connector}}</li>
<li>Request Path: {{include.requestPath}}</li> 
{% else %}<li>Request URL: {{include.requestPath}}  </li>{% endif %}
<li>Method: {{include.method}}</li>

<li>Query Parameters</li>
<ul>
{% assign pPairs = include.params | remove:"_done!_" | split: "||" %}
{% for items in pPairs  %}
{% assign these = items | split: ","  %}

<li>Key: {{these[0] | split:":" | last}} <br>Value: {{these[1] | split:":" | last}}</li>
{% endfor %}
</ul>

<li>HTTP Request Headers</li>
<ul>
{% assign hPairs = include.headers | remove:"_done!_" | split: "||" %}
{% for items in hPairs  %}
{% assign these = items | split: ","  %}
<li>Key: {{these[0] | split:":" | last}} <br>Value: {{these[1] | split:":" | last}}</li>
{% endfor %}
</ul>

<li>Content Type: {{include.requestContentType}}</li>
<li> Request Body:<br> <textarea cols="70" rows="7" spellcheck="false">{{include.body}}</textarea></li>
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
<script> (function() {Array.from(document.querySelectorAll("li")).forEach((element) => {element.innerHTML = element.innerHTML.replaceAll("\\","")})})()</script>