<!-- Global Variable -->
<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Task.dita_1d70cd62-fc99-4e7c-baaf-9d9ab2209846" target="_blank">(Link to documentation)</a></li>
<li>Name: {{include.name}}</li>
<li>Type: {{include.type |default: "String"}}</li>
{% if include.sensitive == "false" %}<li>Default Value: {{include.defaultValue }}</li>{% endif %}
<li>Sensitive Information: {{include.sensitive | default: false }}</li>
<li>Reportable: {{include.reportable | default: false}}</li>
<li>Agent Viewable: {{include.viewable |default: false}}</li>
<li>Agent Editable: {{include.editable | default: false}}</li>
{% if include.viewable == "true" %} <li>Desktop Label: {{include.desktopLabel}}</li>{% endif %}
</ul>

 