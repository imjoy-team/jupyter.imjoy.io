"use strict";(self.webpackChunkcodex_chat_notebook=self.webpackChunkcodex_chat_notebook||[]).push([[412],{1568:(t,e,o)=>{o.r(e),o.d(e,{default:()=>u});var n=o(6825),s=o(2138),i=o(3706),l=o(7023),a=o.n(l),c=o(7905),r=o(4198),h=o(608);class d{constructor(t){t.currentChanged.connect((t=>{this.notebook=t.currentWidget.children()._source[2]}))}createNew(t,e){const o=t.content;this.notebook=o,o._sessionContex=e.sessionContext;let i=new n.ToolbarButton({iconClass:"jp-MaterialIcon jp-LinkIcon",onClick:()=>{console.log(`Notebook "${o.title.label}" is now activated as the current chat notebook!`)},tooltip:"Codex Chat Notebook is enabled"});return t.toolbar.insertItem(0,"activate",i),new s.DisposableDelegate((()=>{i.dispose(),this.notebook===o&&(this.notebook=null)}))}getState(t){return{wasFocused:t.node.contains(document.activeElement),activeCell:t.activeCell}}handleState(t,e,o=!1){const{activeCell:n,node:s}=t;(e.wasFocused||"edit"===t.mode)&&t.activate(),o&&n&&h.ElementExt.scrollIntoViewIfNeeded(s,n.node)}getCodeHistory(t,e){const o=this.notebook.model.cells,n=[];let s=!0;for(let i=0;i<o.length&&!(i>this.notebook.activeCellIndex);i++){const l=o.get(i);if("code"===l.type)s?(n.push(`\n"""\n${t}\n"""\n${l.value.text}\n${e}`),s=!1):n.push(l.value.text);else if("markdown"===l.type){let o="";const i=l.value.text.split("\n");if(o+="## "+i[0].replace(/^(\#+\s)/,""),s||i.length>1){let n,l;l=s?t:"",n=i.length>1?i.slice(1).join("\n"):"",o+=`\n"""\n${l}\n${n}\n"""`,s&&(o+=`\n${e}`,s=!1)}n.push(o)}}return n}addCell(t,e){const o=this.notebook;if(!o.model)return;const n=this.getState(o),s=o.model,i=s.contentFactory.createMarkdownCell({});i.value.text=t,s.cells.insert(o.activeCellIndex+1,i);const l=s.contentFactory.createCodeCell({});l.value.text=e,s.cells.insert(o.activeCellIndex+2,l),o.activeCellIndex+=2,this.notebook.lastCellIndex=o.activeCellIndex,this.notebook.lastCellNumber=2,o.deselectAll(),this.handleState(o,n,!0),setTimeout((async()=>{try{const t=await c.v.run(this.notebook,this.notebook._sessionContex);console.log(t)}catch(t){console.error(t)}}),0)}addMarkdown(t){const e=this.notebook;if(!e.model)return;const o=this.getState(e),n=model.contentFactory.createMarkdownCell({});n.value.text=t,model.cells.insert(e.activeCellIndex+1,n),e.activeCellIndex+=1,this.notebook.lastCellIndex=e.activeCellIndex,this.notebook.lastCellNumber=1,e.deselectAll(),this.handleState(e,o,!0)}runCell(){notebook.model&&notebook.activeCell&&c.v.run(this.notebook,this.notebook._sessionContex)}runAllCells(){c.v.runAll(this.notebook,this.notebook._sessionContex)}undoCell(){let t="";if(this.notebook.lastCellNumber&&this.notebook.lastCellNumber>0){for(let e=0;e<this.notebook.lastCellNumber;e++){const e=this.notebook.model.cells.get(this.notebook.activeCellIndex);e&&"markdown"===e.type&&e.value.text.trim().startsWith("# ")&&(t=e.value.text.trim().replace(/^(\#+\s)/,"")),c.v.cut(this.notebook),this.notebook.activeCellIndex=this.notebook.lastCellIndex-(this.notebook.lastCellNumber-1)}this.notebook.lastCellIndex=0,this.notebook.lastCellNumber=0,this.notebook.activeCellIndex-=1}else{const e=this.notebook.model.cells.get(this.notebook.activeCellIndex);e&&"markdown"===e.type&&e.value.text.trim().startsWith("# ")&&(t=e.value.text.trim().replace(/^(\#+\s)/,"")),c.v.cut(this.notebook),this.notebook.activeCellIndex-=1}return t}}async function p(t,e){e=t.base_url.replace(/\/$/,"")+"/"+e;const o=await fetch(e),n=(await o.text()).split("\n");let s="prompt",i="",l="";for(let t=0;t<n.length;t++)if("prompt"===s){if(n[t].startsWith("-----")){s="code";continue}i+=n[t]+"\n"}else{const e=n[t].replace(/```/g,"");""!==e.trim()&&(l+=e+"\n")}return{prefix:i.trim(),examples:l.trim()}}const u={id:"codex-chat-notebook",autoStart:!0,requires:[r.INotebookTracker],activate:function(t,e){const o=new d(e);t.docRegistry.addWidgetExtension("Notebook",o),console.log("JupyterLab extension codex-chat-notebook is activated!");class n extends i.Widget{constructor(){super(),this.addClass("content"),this.id="tutorial",this.title.label="Codex Chat Notebook",this.title.closable=!0,this.createNode()}setupSpeech(){if("webkitSpeechRecognition"in window){let t=new webkitSpeechRecognition,e="",o=!1;t.continuous=!0,t.interimResults=!0,t.lang="en-US",this.speechButton.style.background="",t.onstart=()=>{o=!0,e="",this.speechButton.style.background="greenyellow"},t.onerror=()=>{o=!1,this.speechButton.style.background="red",console.log("Speech Recognition Error")},t.onend=()=>{o=!1,this.speechButton.style.background="",console.log("Speech Recognition Ended")},t.onresult=t=>{let o="";for(let n=t.resultIndex;n<t.results.length;++n)t.results[n].isFinal?(e+=t.results[n][0].transcript,this.inputBox.value=e):(o+=t.results[n][0].transcript,this.inputBox.value=o)},this.speechRecognition=t,this.speechButton.onclick=()=>{o?t.stop():t.start()}}else console.error("Speech Recognition Not Available"),this.speechButton.style.display="none"}async createNode(){let t;this.repo=await async function(){const t=await fetch("https://raw.githubusercontent.com/oeway/codex-chat-notebook/master/codex-prompt-repository/index.json");return await t.json()}(),this.node.innerHTML='<h2 style="color: slategrey;font-family: monospace;">Codex Chat Notebook</h2><p>Built with OpenAI Codex, by Wei Ouyang</p>',this.node.style.padding="10px",this.node.style.background="white",this.node.style.height="100%",this.node.style.overflow="auto",this.tokenInput=document.createElement("input"),this.tokenInput.style.display="block",this.tokenInput.style.width="100%",this.tokenInput.style.color="gray",this.tokenInput.type="password",this.tokenInput.placeholder="OpenAI API token",this.tokenInput.title="OpenAI API token",this.promptSelect=document.createElement("select"),this.promptSelect.style.display="block",this.promptSelect.style.width="100%",this.promptSelect.style.marginTop="10px",this.promptSelect.style.color="black",this.promptSelect.title="Prompt",this.promptDetails=document.createElement("p"),this.promptDetails.style.display="block",this.promptDetails.style.width="100%",this.promptDetails.style.color="gray",this.repo.items.forEach((t=>{const e=document.createElement("option");e.value=t.source,e.title=t.description,e.innerText=t.name,this.promptSelect.appendChild(e)})),this.inputBox=document.createElement("textarea"),this.inputBox.style.marginTop="10px",this.inputBox.style.display="block",this.inputBox.style.width="100%",this.inputBox.style.height="6rem",this.inputBox.style.fontSize="16px",this.speechButton=document.createElement("button"),this.speechButton.innerHTML="Voice",this.speechButton.style.width="50%",this.speechButton.style.height="20px",this.speechButton.style.fontSize="16px",this.speechButton.style.display="inline-block",this.speechButton.classList.add("bp3-button","bp3-minimal","jp-ToolbarButtonComponent","minimal","jp-Button"),this.undoButton=document.createElement("button"),this.undoButton.style.width="50%",this.undoButton.style.height="20px",this.undoButton.style.fontSize="16px",this.undoButton.innerHTML="Undo",this.undoButton.style.display="inline-block",this.undoButton.classList.add("bp3-button","bp3-minimal","jp-ToolbarButtonComponent","minimal","jp-Button"),this.executeButton=document.createElement("button"),this.executeButton.innerHTML="Execute",this.executeButton.style.display="block",this.executeButton.style.background="lavender",this.executeButton.style.fontSize="16px",this.executeButton.style.width="100%",this.executeButton.classList.add("bp3-button","bp3-minimal","jp-ToolbarButtonComponent","minimal","jp-Button"),this.node.appendChild(this.tokenInput),this.node.appendChild(this.promptSelect),this.node.appendChild(this.promptDetails),this.node.appendChild(this.inputBox),this.node.appendChild(this.speechButton),this.node.appendChild(this.undoButton),this.node.appendChild(this.executeButton),this.requestedCodeElm=document.createElement("pre"),this.requestedCodeElm.style.color="gray",this.respondCodeElm=document.createElement("pre"),this.respondCodeElm.style.color="blue",this.node.appendChild(this.respondCodeElm),this.node.appendChild(this.requestedCodeElm);const e=localStorage.getItem("openai-token");e&&(t=new(a())(e),this.tokenInput.value=e),this.tokenInput.onchange=()=>{t=new(a())(this.tokenInput.value),localStorage.setItem("openai-token",this.tokenInput.value)},this.promptPrefix='# Generate code for Jupyter notebooks\nI start with an empty jupyter notebook with Python 3 kernel, and incrementally add instructions for each cell. The instructions are comment string starts with "##" (with additional details are provided as quoted with """) the lines after the instructions or details should be a generated executable Python 3 code block or empty.\nThe instructions are given by a human via a speech-to-text program in a noisy environment, therefore the text maybe confusing and requires correction but the general context is using python for data analysis.\nThe result of each code block should be printed or displayed in the notebook.\n\nIn the following cases, it should generate a special command string instead of a python code block:\n - To cancel or undo last cell, generate "%undo"\n - To execute all the cells, generate "%run-all"\n - To execute the current or active cell, generate "%run"\n',this.codeExamples='## Print hello world\nprint("Hello world")\n',p(this.repo,this.promptSelect.value).then((t=>{this.promptPrefix=t.prefix,this.codeExamples=t.examples})),this.promptSelect.onchange=()=>{this.selectedPrompt=this.promptSelect.value;const t=this.repo.items.find((t=>t.source===this.selectedPrompt));this.promptSelect.title="Select a prompt template for your task.",this.promptDetails.innerHTML=t.description,p(this.repo,this.selectedPrompt).then((t=>{this.promptPrefix=t.prefix,this.codeExamples=t.examples})).catch((t=>{console.error(t),alert("Failed to fetch prompt: "+this.selectedPrompt)}))},this.executeButton.onclick=async()=>{this.respondCodeElm.innerHTML="",this.speechRecognition&&this.speechRecognition.stop();const e=(n=this.inputBox.value.trim())&&n[0].toUpperCase()+n.slice(1);var n;if(e.length<=0)return;const s=e.split("\n");let i="## "+s[0].replace(/^(\#+\s)/,"");s.length>1&&(i+='\n"""\n'+s.slice(1).join("\n")+'\n"""');const l=o.getCodeHistory(this.promptPrefix,this.codeExamples).join("\n")+`\n${i}\n`;this.requestedCodeElm.innerHTML="==== Request Prompt ====\n"+l,this.executeButton.style.background="LightGoldenRodYellow";try{const n=await t.complete({engine:"davinci-codex",prompt:l,maxTokens:500,temperature:.1,topP:1,presencePenalty:0,frequencyPenalty:0,bestOf:1,n:1,stream:!1,stop:["## "]});console.log(n.data);const s=n.data.choices[0].text.trim();if(this.respondCodeElm.innerHTML="==== Generated Code ====\n\n"+s,s.startsWith("%undo"))this.undoButton.onclick();else if(s.startsWith("%run"))o.runCell();else if(s.startsWith("%run-all"))o.runAllCells();else if(s.startsWith("%markdown")){const t=s.substring(10);o.addMarkdown(t)}else o.addCell("# "+e.trim(),s)}catch(t){console.error(t),alert(`Failed to execute: ${t}`)}this.executeButton.style.background="lavender",this.inputBox.value=""},this.undoButton.onclick=async()=>{if(this.speechRecognition&&this.speechRecognition.stop(),this.inputBox.value.trim().length>0)this.inputBox.value="";else{const t=o.undoCell();this.inputBox.value=t.split("\n")[0]}},this.inputBox.addEventListener("keydown",(t=>{"Enter"!=t.key||t.shiftKey||(this.executeButton.onclick(),t.preventDefault())})),this.setupSpeech()}}const s=new i.Panel;s.id="Codex-Chat-Panel",s.title.iconClass="jp-MaterialIcon jp-LinkIcon",s.addWidget(new n),t.shell.add(s,"left",{rank:1})}}}}]);