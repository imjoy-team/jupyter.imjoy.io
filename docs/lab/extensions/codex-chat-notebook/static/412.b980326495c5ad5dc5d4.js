"use strict";(self.webpackChunkcodex_chat_notebook=self.webpackChunkcodex_chat_notebook||[]).push([[412],{1568:(e,t,o)=>{o.r(t),o.d(t,{default:()=>p});var n=o(6825),s=o(2138),i=o(3706),l=o(7023),a=o.n(l),c=o(7905),h=o(4198),r=o(608);const d='# Generate code for Jupyter notebooks\nI start with an empty jupyter notebook with Python 3 kernel, and incrementally add instructions for each cell. The instructions are comment string starts with "##" (with additional details are provided as quoted with """) the lines after the instructions or details should be a generated executable Python 3 code block or empty.\nThe instructions are given by a human via a speech-to-text program in a noisy environment, therefore the text maybe confusing and requires correction but the general context is using python for data analysis.\nThe result of each code block should be printed or displayed in the notebook.\n\nIn the following cases, it should generate a special command string instead of a python code block:\n - To cancel or undo last cell, generate "%undo"\n - To execute all the cells, generate "%run-all"\n - To execute the current or active cell, generate "%run"\n';class u{constructor(e){e.currentChanged.connect((e=>{this.notebook=e.currentWidget.children()._source[2]}))}createNew(e,t){const o=e.content;this.notebook=o,o._sessionContex=t.sessionContext;let i=new n.ToolbarButton({iconClass:"jp-MaterialIcon jp-LinkIcon",onClick:()=>{console.log(`Notebook "${o.title.label}" is now activated as the current chat notebook!`)},tooltip:"Codex Chat Notebook is enabled"});return e.toolbar.insertItem(0,"activate",i),new s.DisposableDelegate((()=>{i.dispose(),this.notebook===o&&(this.notebook=null)}))}getState(e){return{wasFocused:e.node.contains(document.activeElement),activeCell:e.activeCell}}handleState(e,t,o=!1){const{activeCell:n,node:s}=e;(t.wasFocused||"edit"===e.mode)&&e.activate(),o&&n&&r.ElementExt.scrollIntoViewIfNeeded(s,n.node)}getCodeHistory(){const e=this.notebook.model.cells,t=[];let o=!0;for(let n=0;n<e.length&&!(n>this.notebook.activeCellIndex);n++){const s=e.get(n);if("code"===s.type)o?(t.push(`\n"""\n${d}\n"""\n`+s.value.text),o=!1):t.push(s.value.text);else if("markdown"===s.type){let e="";const n=s.value.text.split("\n");if(e+="## "+n[0].replace(/^(\#+\s)/,""),o||n.length>1){let t,s;s=o?d:"",t=n.length>1?n.slice(1).join("\n"):"",e+=`\n"""\n${s}\n${t}\n"""`,o&&(e+='\n## Print hello world\nprint("Hello world")\n',o=!1)}t.push(e)}}return t}addCell(e,t){const o=this.notebook;if(!o.model)return;const n=this.getState(o),s=o.model,i=s.contentFactory.createMarkdownCell({});i.value.text=e,s.cells.insert(o.activeCellIndex+1,i);const l=s.contentFactory.createCodeCell({});l.value.text=t,s.cells.insert(o.activeCellIndex+2,l),o.activeCellIndex+=2,this.notebook.lastCellIndex=o.activeCellIndex,this.notebook.lastCellNumber=2,o.deselectAll(),this.handleState(o,n,!0),setTimeout((async()=>{try{const e=await c.v.run(this.notebook,this.notebook._sessionContex);console.log(e)}catch(e){console.error(e)}}),0)}addMarkdown(e){const t=this.notebook;if(!t.model)return;const o=this.getState(t),n=model.contentFactory.createMarkdownCell({});n.value.text=e,model.cells.insert(t.activeCellIndex+1,n),t.activeCellIndex+=1,this.notebook.lastCellIndex=t.activeCellIndex,this.notebook.lastCellNumber=1,t.deselectAll(),this.handleState(t,o,!0)}runCell(){notebook.model&&notebook.activeCell&&c.v.run(this.notebook,this.notebook._sessionContex)}runAllCells(){c.v.runAll(this.notebook,this.notebook._sessionContex)}undoCell(){let e="";if(this.notebook.lastCellNumber&&this.notebook.lastCellNumber>0){for(let t=0;t<this.notebook.lastCellNumber;t++){const t=this.notebook.model.cells.get(this.notebook.activeCellIndex);t&&"markdown"===t.type&&t.value.text.trim().startsWith("# ")&&(e=t.value.text.trim().replace(/^(\#+\s)/,"")),c.v.cut(this.notebook),this.notebook.activeCellIndex=this.notebook.lastCellIndex-(this.notebook.lastCellNumber-1)}this.notebook.lastCellIndex=0,this.notebook.lastCellNumber=0,this.notebook.activeCellIndex-=1}else{const t=this.notebook.model.cells.get(this.notebook.activeCellIndex);t&&"markdown"===t.type&&t.value.text.trim().startsWith("# ")&&(e=t.value.text.trim().replace(/^(\#+\s)/,"")),c.v.cut(this.notebook),this.notebook.activeCellIndex-=1}return e}}const p={id:"codex-chat-notebook",autoStart:!0,requires:[h.INotebookTracker],activate:function(e,t){console.log("JupyterLab extension codex-chat-notebook is activated!");const o=new u(t);e.docRegistry.addWidgetExtension("Notebook",o);class n extends i.Widget{constructor(){super(),this.addClass("content"),this.id="tutorial",this.title.label="Codex Chat Notebook",this.title.closable=!0,this.createNode()}setupSpeech(){if("webkitSpeechRecognition"in window){let e=new webkitSpeechRecognition,t="",o=!1;e.continuous=!0,e.interimResults=!0,e.lang="en-US",this.speechButton.style.background="",e.onstart=()=>{o=!0,t="",this.speechButton.style.background="LightGoldenRodYellow"},e.onerror=()=>{o=!1,this.speechButton.style.background="red",console.log("Speech Recognition Error")},e.onend=()=>{o=!1,this.speechButton.style.background="",console.log("Speech Recognition Ended")},e.onresult=e=>{let o="";for(let n=e.resultIndex;n<e.results.length;++n)e.results[n].isFinal?(t+=e.results[n][0].transcript,this.inputBox.value=t):(o+=e.results[n][0].transcript,this.inputBox.value=o)},this.speechRecognition=e,this.speechButton.onclick=()=>{o?e.stop():e.start()}}else console.error("Speech Recognition Not Available"),this.speechButton.style.display="none"}createNode(){let e;this.node.innerHTML="<h2>Codex Chat Notebook</h2><p>Built with OpenAI Codex, by Wei Ouyang</p>",this.node.style.padding="10px",this.node.style.background="white",this.node.style.height="100%",this.node.style.overflow="auto",this.tokenInput=document.createElement("input"),this.tokenInput.style.display="block",this.tokenInput.style.width="100%",this.tokenInput.style.color="gray",this.tokenInput.type="password",this.tokenInput.placeholder="OpenAI API token",this.tokenInput.title="OpenAI API token",this.inputBox=document.createElement("textarea"),this.inputBox.style.marginTop="10px",this.inputBox.style.display="block",this.inputBox.style.width="100%",this.inputBox.style.height="6rem",this.inputBox.style.fontSize="16px",this.speechButton=document.createElement("button"),this.speechButton.innerHTML="Voice",this.speechButton.style.width="50%",this.speechButton.style.height="20px",this.speechButton.style.fontSize="16px",this.speechButton.style.display="inline-block",this.speechButton.classList.add("bp3-button","bp3-minimal","jp-ToolbarButtonComponent","minimal","jp-Button"),this.undoButton=document.createElement("button"),this.undoButton.style.width="50%",this.undoButton.style.height="20px",this.undoButton.style.fontSize="16px",this.undoButton.innerHTML="Undo",this.undoButton.style.display="inline-block",this.undoButton.classList.add("bp3-button","bp3-minimal","jp-ToolbarButtonComponent","minimal","jp-Button"),this.executeButton=document.createElement("button"),this.executeButton.innerHTML="Execute",this.executeButton.style.display="block",this.executeButton.style.fontSize="16px",this.executeButton.style.width="100%",this.executeButton.classList.add("bp3-button","bp3-minimal","jp-ToolbarButtonComponent","minimal","jp-Button"),this.node.appendChild(this.tokenInput),this.node.appendChild(this.inputBox),this.node.appendChild(this.speechButton),this.node.appendChild(this.undoButton),this.node.appendChild(this.executeButton),this.requestedCodeElm=document.createElement("pre"),this.requestedCodeElm.style.color="gray",this.respondCodeElm=document.createElement("pre"),this.respondCodeElm.style.color="blue",this.node.appendChild(this.respondCodeElm),this.node.appendChild(this.requestedCodeElm);const t=localStorage.getItem("openai-token");t&&(e=new(a())(t),this.tokenInput.value=t),this.tokenInput.onchange=()=>{e=new(a())(this.tokenInput.value),localStorage.setItem("openai-token",this.tokenInput.value)},this.executeButton.onclick=async()=>{this.respondCodeElm.innerHTML="",this.speechRecognition&&this.speechRecognition.stop();const t=(n=this.inputBox.value.trim())&&n[0].toUpperCase()+n.slice(1);var n;if(t.length<=0)return;const s=t.split("\n");let i="## "+s[0].replace(/^(\#+\s)/,"");s.length>1&&(i+='\n"""\n'+s.slice(1).join("\n")+'\n"""');const l=o.getCodeHistory().join("\n")+`\n${i}\n`;this.requestedCodeElm.innerHTML=l,this.executeButton.style.background="LightGoldenRodYellow";try{const n=await e.complete({engine:"davinci-codex",prompt:l,maxTokens:500,temperature:.1,topP:1,presencePenalty:0,frequencyPenalty:0,bestOf:1,n:1,stream:!1,stop:["## "]});console.log(n.data);const s=n.data.choices[0].text.trim();if(this.respondCodeElm.innerHTML=s,s.startsWith("%undo"))this.undoButton.onclick();else if(s.startsWith("%run"))o.runCell();else if(s.startsWith("%run-all"))o.runAllCells();else if(s.startsWith("%markdown")){const e=s.substring(10);o.addMarkdown(e)}else o.addCell("# "+t.trim(),s)}catch(e){console.error(e),alert(`Failed to execute: ${e}`)}this.executeButton.style.background="",this.inputBox.value=""},this.undoButton.onclick=async()=>{if(this.speechRecognition&&this.speechRecognition.stop(),this.inputBox.value.trim().length>0)this.inputBox.value="";else{const e=o.undoCell();this.inputBox.value=e.split("\n")[0]}},this.inputBox.addEventListener("keydown",(e=>{"Enter"!=e.key||e.shiftKey||(this.executeButton.onclick(),e.preventDefault())})),this.setupSpeech()}}const s=new i.Panel;s.id="Codex-Chat-Panel",s.title.iconClass="jp-MaterialIcon jp-LinkIcon",s.addWidget(new n),e.shell.add(s,"left",{rank:1})}}}}]);