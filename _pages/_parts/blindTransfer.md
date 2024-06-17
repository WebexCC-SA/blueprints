<!-- Escape brackets \{\{ variable \}\} -->
<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Generic_Topic.dita_9762deed-12dd-47c3-a699-2fb28daf0a99" target="_blank">(Link to documentation)</a></li>
<!-- <li>Transfer Dial Number:</li> -->
<li>{% if include.type == "Specific" %}Specific Dial Number: {% else %}Variable Dial Number:{% endif %} {{include.DN}} </li>
</ul>

