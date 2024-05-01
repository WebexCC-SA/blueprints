<!-- Global Variable -->
- [(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Task.dita_1d70cd62-fc99-4e7c-baaf-9d9ab2209846){:target="\_blank"}
- Name: {{include.name}}
- Type: {{include.type |default: "String"}}
- Default Value: {{include.dValue }}
- Reportable: {{include.reportable | default: false}}
- Agent Viewable: {{include.viewable |default: false}}
- Agent Editable: {{include.editable | default: false}}


{% if site.howto %}
{% include_relative _parts/globalVariable.md 
    reportable="true" 
    viewable="true" 
    editable="true" 
    type="String"
    dValue=""
    
%}
{% endif %}
 