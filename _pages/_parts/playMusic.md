
<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_c5322b24-0803-42ca-b831-3101e8c5b053" target="_blank">(Link to documentation)</a></li>
<li>Audio File: {{include.type}}</li>
<li>{% if include.type == "static" %}Music File: {% else %} Dynamic Audio File: {% endif %}{{include.musicFileOrExpression}}</li>
<li>Start Offset (seconds): {{include.offset | default: "0"}}</li>
<li>Music Duration: {{include.duration}} </li>
<li>Node Exit: {{include.nodeExit}}</li>
</ul>

<script> (function() {Array.from(document.querySelectorAll("li")).forEach((element) => {element.innerHTML = element.innerHTML.replaceAll("\\","")})})()</script>