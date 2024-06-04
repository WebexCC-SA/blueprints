<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_8a8f0369-60b9-4d31-af05-9338f7aa54be" target="_blank">(Link to documentation)</a></li>
<li> Enable Text-To-Speech: {{ include.TTSBool | default:"false" }}</li>
{% if include.TTSBool == "true" %}<li>Connector: {{include.connector}} </li> 
<li>Output Voice: {{include.voice}} </li>  {% endif %}
{% if include.promptCount >= 1 %}<li> {{include.type1 | default:"Audio File"}}: {{include.a1}}</li> {% endif %}
{% if include.promptCount >= 2 %}<li> {{include.type2 | default:"Audio File"}}: {{include.a2}}</li> {% endif %}
{% if include.promptCount >= 3 %}<li> {{include.type3 | default:"Audio File"}}: {{include.a3}}</li> {% endif %}
{% if include.promptCount >= 4 %}<li> {{include.type4 | default:"Audio File"}}: {{include.a4}}</li> {% endif %}
{% if include.promptCount >= 5 %}<li> {{include.type5 | default:"Audio File"}}: {{include.a5}}</li> {% endif %}
<li>Make Prompt Interruptible: {{ include.interruptible | default: "true" }}</li>
{% if include.link0 != "Enter Link Info" %} <li>Menu Link 0: {{include.link0}} </li>{% endif %}
{% if include.link1 != "Enter Link Info" %} <li>Menu Link 1: {{include.link1}} </li>{% endif %}
{% if include.link2 != "Enter Link Info" %} <li>Menu Link 2: {{include.link2}} </li>{% endif %}
{% if include.link3 != "Enter Link Info" %} <li>Menu Link 3: {{include.link3}} </li>{% endif %}
{% if include.link4 != "Enter Link Info" %} <li>Menu Link 4: {{include.link4}} </li>{% endif %}
{% if include.link5 != "Enter Link Info" %} <li>Menu Link 5: {{include.link5}} </li>{% endif %}
{% if include.link6 != "Enter Link Info" %} <li>Menu Link 6: {{include.link6}} </li>{% endif %}
{% if include.link7 != "Enter Link Info" %} <li>Menu Link 7: {{include.link7}} </li>{% endif %}
{% if include.link8 != "Enter Link Info" %} <li>Menu Link 8: {{include.link8}} </li>{% endif %}
{% if include.link9 != "Enter Link Info" %} <li>Menu Link 9: {{include.link9}} </li>{% endif %}
<li>No-Input Timeout (sec): {{ include.noInputTimeout | default: "3"}}</li>
<li>No-Input Timeout Link: {{ include.noInputLink  }}</li>
<li>Unmatched Entry Link: {{ include.unmatchedLink }}</li>
{% if include.onError %}<li>Undefined Error: {{include.onError}}</li>{% endif %}
</ul>