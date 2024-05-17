<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_19353180-2d4f-41eb-b081-6d817451470b">(Link to documentation)</a></li>
<li> Enable Text-To-Speech: {{ include.TTSBool | default:"false" }}</li>
{% if include.TTSBool == "true" %}<li>Connector: {{include.connector}} </li> 
<li>Output Voice: {{include.voice}} </li>  {% endif %}
{% if include.a1 %}<li> {{include.type1 | default:"Audio File"}}: {{include.a1}}</li> {% endif %}
{% if include.a2 %}<li> {{include.type2 | default:"Audio File"}}: {{include.a2}}</li> {% endif %}
{% if include.a3 %}<li> {{include.type3 | default:"Audio File"}}: {{include.a3}}</li> {% endif %}
{% if include.a4 %}<li> {{include.type4 | default:"Audio File"}}: {{include.a4}}</li> {% endif %}
{% if include.a5 %}<li> {{include.type5 | default:"Audio File"}}: {{include.a5}}</li> {% endif %}
</ul>

<script> (function() {Array.from(document.querySelectorAll("li")).forEach((element) => {element.innerHTML = element.innerHTML.replaceAll("\\","")})})()</script>