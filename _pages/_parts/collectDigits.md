<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_022710c1-5527-4a8a-9d27-d38b615e1f68" target="_blank">(Link to documentation)</a></li>
<li> Enable Text-To-Speech: {{ include.TTSBool | default:"false" }}</li>
{% if include.TTSBool == "true" %}<li>Connector: {{include.connector}} </li> 
<li>Output Voice: {{include.voice}} </li>  {% endif %}
{% if include.promptCount >= 1 %}<li> {{include.type1 | default:"Audio File"}}: {{include.a1}}</li> {% endif %}
{% if include.promptCount >= 2 %}<li> {{include.type2 | default:"Audio File"}}: {{include.a2}}</li> {% endif %}
{% if include.promptCount >= 3 %}<li> {{include.type3 | default:"Audio File"}}: {{include.a3}}</li> {% endif %}
{% if include.promptCount >= 4 %}<li> {{include.type4 | default:"Audio File"}}: {{include.a4}}</li> {% endif %}
{% if include.promptCount >= 5 %}<li> {{include.type5 | default:"Audio File"}}: {{include.a5}}</li> {% endif %}
<li>Make Prompt Interruptible: {{ include.interruptible | default: "true" }}</li>
<li>No-Input Timeout (sec): {{ include.noInputTimeout | default: "3"}}</li>
<li>Inter-Digit Timeout: {{include.interDigitTimeout | default: "3"}}</li>
<li>Minimum Digits: {{include.minDigits | default: "1" }}</li>
<li>Maximum Digits: {{include.maxDigits | default: "10" }}</li>
<li>Terminator Symbol: {{include.termSymbol | default: "#"}}</li>
<li>No-Input Timeout Link: {{ include.noInputLink  }}</li>
<li>Unmatched Entry Link: {{ include.unmatchedLink }}</li>
{% if include.onError %}<li>Undefined Error: {{include.onError}}</li>{% endif %}
</ul>

<script> (function() {Array.from(document.querySelectorAll("li")).forEach((element) => {element.innerHTML = element.innerHTML.replaceAll("\\","")})})()</script>