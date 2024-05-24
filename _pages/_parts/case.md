<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_5b84496c-fa1d-407e-bebd-fa25d2bc0f49" target="_blank">(Link to documentation)</a></li>
{% if include.variableorExpression == "variable" %}<li>Variable: {{include.variableorExpressionValue}} </li> {% endif %}
{% if include.variableorExpression == "expression" %}<li>Build Expression: {{include.variableorExpressionValue}} </li> {% endif %}
{% if include.caseCount >= 1 %}<li> Case Value: {{include.c1}}</li> {% endif %}
{% if include.caseCount >= 2 %}<li> Case Value: {{include.c2}}</li> {% endif %}
{% if include.caseCount >= 3 %}<li> Case Value: {{include.c3}}</li> {% endif %}
{% if include.caseCount >= 4 %}<li> Case Value: {{include.c4}}</li> {% endif %}
{% if include.caseCount >= 5 %}<li> Case Value: {{include.c5}}</li> {% endif %}
{% if include.caseCount >= 6 %}<li> Case Value: {{include.c6}}</li> {% endif %}
{% if include.caseCount >= 7 %}<li> Case Value: {{include.c7}}</li> {% endif %}
{% if include.caseCount >= 8 %}<li> Case Value: {{include.c8}}</li> {% endif %}
{% if include.caseCount >= 9 %}<li> Case Value: {{include.c9}}</li> {% endif %}
{% if include.caseCount >= 10 %}<li> Case Value: {{include.c10}}</li> {% endif %}
{% if include.caseCount >= 11 %}<li> Case Value: {{include.c11}}</li> {% endif %}
{% if include.caseCount >= 12 %}<li> Case Value: {{include.c12}}</li> {% endif %}
{% if include.caseCount >= 13 %}<li> Case Value: {{include.c13}}</li> {% endif %}
{% if include.caseCount >= 14 %}<li> Case Value: {{include.c14}}</li> {% endif %}
{% if include.caseCount >= 15 %}<li> Case Value: {{include.c15}}</li> {% endif %}
{% if include.caseCount >= 16 %}<li> Case Value: {{include.c16}}</li> {% endif %}
{% if include.caseCount >= 17 %}<li> Case Value: {{include.c17}}</li> {% endif %}
{% if include.caseCount >= 18 %}<li> Case Value: {{include.c18}}</li> {% endif %}
{% if include.caseCount >= 19 %}<li> Case Value: {{include.c19}}</li> {% endif %}
{% if include.caseCount >= 20 %}<li> Case Value: {{include.c20}}</li> {% endif %}
<li> Default: {{include.defaultlink}}</li>

</ul>

<script> (function() {Array.from(document.querySelectorAll("li")).forEach((element) => {element.innerHTML = element.innerHTML.replaceAll("\\","")})})()</script>