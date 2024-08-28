<ul>
<li><a href="https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_4bd2ee51-57b1-4741-b37e-7326704c916b" target="_blank">(Link to documentation)</a></li>
<li>Queue type: {{include.queueMethod}}</li>
<li>Queue {% if include.queueMethod == "Variable" %}Variable{% else %}Static Queue Name{% endif %}: {{include.nameOrVar}}</li>
<li>Lookback Time: {{include.lookbackTime}} minutes</li>
<li>Node Exit: {{include.nodeExit}}</li>
<li>Insufficient Information: {{include.InsufficientInfo}} </li>
<li>Failure: {{include.failure}}</li>
</ul>