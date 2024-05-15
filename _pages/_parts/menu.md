[(Link to documentation)](https://help.webex.com/en-us/article/n5595zd/Webex-Contact-Center-Setup-and-Administration-Guide#Cisco_Concept.dita_8a8f0369-60b9-4d31-af05-9338f7aa54be)
- { % if inclule.prompt %}Prompt: {include.prompt} { %endif% }
- { % if inclule.audioVar %}Add Audio Variable: { includeaudioVar } { %endif% }
- Make Prompt Interruptible: { include.interruptible | default: "true"}
- { % if inclule.link0 %}Menu Link 0: {include.link0} { %endif% }
- { % if inclule.link1 %}Menu Link 1: {include.link1} { %endif% }
- { % if inclule.link2 %}Menu Link 2: {include.link2} { %endif% }
- { % if inclule.link3 %}Menu Link 3: {include.link3} { %endif% }
- { % if inclule.link4 %}Menu Link 4: {include.link4} { %endif% }
- { % if inclule.link5 %}Menu Link 5: {include.link5} { %endif% }
- { % if inclule.link6 %}Menu Link 6: {include.link6} { %endif% }
- { % if inclule.link7 %}Menu Link 7: {include.link7} { %endif% }
- { % if inclule.link8 %}Menu Link 8: {include.link8} { %endif% }
- { % if inclule.link9 %}Menu Link 9: {include.link9} { %endif% }
- No-Input Timeout (sec): { include noInput | default: "3"} 
- No-Input Timeout Link: { include noInputLink  }
- Unmatched Entry Link: { include unmatchedLink }
- { % if inclule.onError %}Undefined Error: {include onError} { %endif% }

