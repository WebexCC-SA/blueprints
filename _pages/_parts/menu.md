- [(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_8a8f0369-60b9-4d31-af05-9338f7aa54be)
{%- if include.prompt %} - Prompt: {{include.prompt}} {% endif %}
{%- if include.audioVar %} - Add Audio Variable: {{ include.audioVar }} {% endif %}
- Make Prompt Interruptible: {{ include.interruptible | default: "true" }}
{%- if include.link0 %} - Menu Link 0: {{include.link0}} {% endif %}
{%- if include.link1 %} - Menu Link 1: {{include.link1}} {% endif %}
{%- if include.link2 %} - Menu Link 2: {{include.link2}} {% endif %}
{%- if include.link3 %} - Menu Link 3: {{include.link3}} {% endif %}
{%- if include.link4 %} - Menu Link 4: {{include.link4}} {% endif %}
{%- if include.link5 %} - Menu Link 5: {{include.link5}} {% endif %}
{%- if include.link6 %} - Menu Link 6: {{include.link6}} {% endif %}
{%- if include.link7 %} - Menu Link 7: {{include.link7}} {% endif %}
{%- if include.link8 %} - Menu Link 8: {{include.link8}} {% endif %}
{%- if include.link9 %} - Menu Link 9: {{include.link9}} {% endif %}
- No-Input Timeout (sec): {{ include.noInput | default: "3"}}
- No-Input Timeout Link: {{ include.noInputLink  }}
- Unmatched Entry Link: {{ include.unmatchedLink }}
{%- if include.onError %} - Undefined Error: {{include.onError}} {% endif %}