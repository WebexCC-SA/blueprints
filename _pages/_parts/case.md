<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_5b84496c-fa1d-407e-bebd-fa25d2bc0f49" target="_blank">(Link to documentation)</a></li>
{% if include.variableorExpression == "variable" %}<li>Variable: {{include.variableorExpressionValue}} </li> {% endif %}
{% if include.variableorExpression == "expression" %}<li>Build Expression: {{include.variableorExpressionValue}} </li> {% endif %}
{% assign cases = include.case | remove:"_done!_" | split: "^" %}
<ul>
{% for items in cases  %}
{% assign these = items | split: ";"  %}
<li>Value: {{these[0] | split:"~" | last}} <br>Link to: {{these[1] | split:"~" | last}}</li>
{% endfor %}
</ul>
<li> Default Link: {{include.defaultlink}}</li>

</ul>

<script> (function() {Array.from(document.querySelectorAll("li")).forEach((element) => {element.innerHTML = element.innerHTML.replaceAll("\\","")})})()</script>