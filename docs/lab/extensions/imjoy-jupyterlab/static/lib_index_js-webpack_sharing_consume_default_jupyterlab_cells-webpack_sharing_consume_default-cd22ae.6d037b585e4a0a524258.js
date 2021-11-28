"use strict";
(self["webpackChunkimjoy_jupyterlab"] = self["webpackChunkimjoy_jupyterlab"] || []).push([["lib_index_js-webpack_sharing_consume_default_jupyterlab_cells-webpack_sharing_consume_default-cd22ae"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _phosphor_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @phosphor/disposable */ "webpack/sharing/consume/default/@phosphor/disposable/@phosphor/disposable");
/* harmony import */ var _phosphor_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_phosphor_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var openai_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! openai-api */ "webpack/sharing/consume/default/openai-api/openai-api");
/* harmony import */ var openai_api__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(openai_api__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_notebook_lib_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/notebook/lib/actions */ "./node_modules/@jupyterlab/notebook/lib/actions.js");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_4__);
/**
 * A notebook widget extension that adds a button to the toolbar.
 */
 










function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

const promptPrefix = `# Generate code for Jupyter notebooks
I start with an empty jupyter notebook with Python 3 kernel, and incrementally add instructions for each cell. The instructions are comment string starts with "##" (with additional details are provided as quoted with """) the lines after the instructions or details should be a generated executable Python 3 code block or empty.
The instructions are given by a human via a speech-to-text program in a noisy environment, therefore the text maybe confusing and requires correction but the general context is using python for data analysis.
The result of each code block should be printed or displayed in the notebook.

In the following cases, it should generate a special command string instead of a python code block:
 - To cancel or undo last cell, generate "%undo"
 - To execute all the cells, generate "%run-all"
 - To execute the current or active cell, generate "%run"
`
class NotebookExtension {
   /**
    * Create a new extension object.
    */
   createNew(panel, context) {
     const notebook = panel.content
      let callback = () => {
          this.notebook = notebook;
          this.sessionContext = context.sessionContext;
          // enable the previous button and disable the current one
          if(this.button) this.button.enabled = true;
          button.enabled = false;
          this.button = button;
          alert(`Notebook "${notebook.title.label}" is now activated as the current chat notebook!`)
       };
       let button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
         iconClass: 'jp-MaterialIcon jp-LinkIcon',
         onClick: callback,
         tooltip: 'Make this notebook as the current chat notebook'
       });
       if(!this.notebook){
        // enable the previous button and disable the current one
        if(this.button) this.button.enabled = true;
          button.enabled = false;
          this.button = button;
          this.notebook = notebook;
          this.sessionContext = context.sessionContext;
       }
        
       panel.toolbar.insertItem(0, 'activate', button);
     
     return new _phosphor_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
        button.dispose();
        this.button = null;
        this.notebook = null;
        this.sessionContext = null;
        this.lastCellNumber = null;
        this.lastCellIndex = null;
     });
   }

    /**
   * Get the state of a widget before running an action.
   */
  getState(notebook) {
    return {
      wasFocused: notebook.node.contains(document.activeElement),
      activeCell: notebook.activeCell
    };
  }

  /**
   * Handle the state of a widget after running an action.
   */
  handleState(
    notebook,
    state,
    scrollIfNeeded = false
  ) {
    const { activeCell, node } = notebook;

    if (state.wasFocused || notebook.mode === 'edit') {
      notebook.activate();
    }

    if (scrollIfNeeded && activeCell) {
      _lumino_domutils__WEBPACK_IMPORTED_MODULE_4__.ElementExt.scrollIntoViewIfNeeded(node, activeCell.node);
    }
  }

   getCodeHistory(){
    const cells = this.notebook.model.cells;
    const history = [];
    let firstMarkdown = true;
    for (let i = 0; i < cells.length; i++) {
      if(i>this.notebook.activeCellIndex) break;
      const cell = cells.get(i);
      if (cell.type === 'code') {
        history.push(cell.value.text)
      }
      else if (cell.type === 'markdown') {
        const text = cell.value.text;
        let newText = "";
        // add ## before each line in the text
        const lines = text.split('\n');
        newText += '## ' + lines[0].replace(/^(\#+\s)/,"");
        
        if(firstMarkdown || lines.length>1){
          let details, prefix;
          if(firstMarkdown){
            prefix = promptPrefix;
          }
          else prefix = "";
  
          if(lines.length>1) details = lines.slice(1).join('\n');
          else details = "";
  
          newText += `\n"""\n${prefix}\n${details}\n"""`;

          if(firstMarkdown){
            newText += `\n## Print hello world\nprint("Hello world")`;
            firstMarkdown = false;
          }
        }
        // remove leading # and add ##
        // newText = lines.map(line => '## ' + line.replace(/^(\#+\s)/,"")).join('\n');
        history.push(newText)
      }
    }
    return history
   }

   addCell(doc, code) {
    const notebook = this.notebook;
    if (!notebook.model || !notebook.activeCell) {
      return;
    }
    const state = this.getState(notebook);
    const model = notebook.model;
    // 
    
    const docCell = model.contentFactory.createMarkdownCell({});
    docCell.value.text = doc
    model.cells.insert(notebook.activeCellIndex + 1, docCell);

    const codeCell = model.contentFactory.createCodeCell({});
    codeCell.value.text = code // 'print("hello world")'
    model.cells.insert(notebook.activeCellIndex + 2, codeCell);
    notebook.activeCellIndex+=2;
    this.lastCellIndex = notebook.activeCellIndex
    this.lastCellNumber = 2

    notebook.deselectAll();
    this.handleState(notebook, state, true);
    setTimeout(async ()=>{
      // Try to execute the cell
      try{
        const ret = await _jupyterlab_notebook_lib_actions__WEBPACK_IMPORTED_MODULE_5__.NotebookActions.run(this.notebook, this.sessionContext)
        console.log(ret)
      }
      catch(e){
        console.error(e)
      }
      
    },0)
   }

   addMarkdown(markdown){
    const notebook = this.notebook;
    if (!notebook.model || !notebook.activeCell) {
      return;
    }
    const state = this.getState(notebook);
    const docCell = model.contentFactory.createMarkdownCell({});
    docCell.value.text = markdown
    model.cells.insert(notebook.activeCellIndex + 1, docCell);
    notebook.activeCellIndex+=1;
    this.lastCellIndex = notebook.activeCellIndex
    this.lastCellNumber = 1
    notebook.deselectAll();
    this.handleState(notebook, state, true);
   }

   runCell(){
    _jupyterlab_notebook_lib_actions__WEBPACK_IMPORTED_MODULE_5__.NotebookActions.run(this.notebook, this.sessionContext)
   }

   runAllCells(){
    _jupyterlab_notebook_lib_actions__WEBPACK_IMPORTED_MODULE_5__.NotebookActions.runAll(this.notebook, this.sessionContext)
   }

   undoCell(){
     let returned_text = ""
     
     
     if(this.lastCellNumber && this.lastCellNumber > 0){
       for(let i=0;i<this.lastCellNumber;i++){
        const cell = this.notebook.model.cells.get(this.notebook.activeCellIndex);
         // obtain the content if it's a comment cell
        if(cell && cell.type === 'markdown' && cell.value.text.trim().startsWith('# ')){
          returned_text = cell.value.text.trim().replace(/^(\#+\s)/,"");
         }
        _jupyterlab_notebook_lib_actions__WEBPACK_IMPORTED_MODULE_5__.NotebookActions.cut(this.notebook)
        this.notebook.activeCellIndex = this.lastCellIndex - (this.lastCellNumber - 1)
       }
        this.lastCellIndex = 0
        this.lastCellNumber = 0
     }
     else{
        const cell = this.notebook.model.cells.get(this.notebook.activeCellIndex);
        // obtain the content if it's a comment cell
        if(cell && cell.type === 'markdown' && cell.value.text.trim().startsWith('# ')){
          returned_text = cell.value.text.trim().replace(/^(\#+\s)/,"");
        }
        _jupyterlab_notebook_lib_actions__WEBPACK_IMPORTED_MODULE_5__.NotebookActions.cut(this.notebook)
        this.notebook.activeCellIndex -=1;
     }
      return returned_text
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  id: 'imjoy-jupyterlab',
  autoStart: true,
  activate: function (app) {
    console.log(
      'JupyterLab extension imjoy-jupyterlab is activated!'
    );
    console.log(app.commands);
    const nbExt = new NotebookExtension()
    app.docRegistry.addWidgetExtension('Notebook', nbExt);

    class ContentWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
      constructor() {
          super();
          this.addClass('content'); 
          this.id = 'tutorial'
          this.title.label = 'Codex Chat Notebook'
          this.title.closable = true;
          this.createNode()
      }

      setupSpeech(){
        if ("webkitSpeechRecognition" in window) {
          let speechRecognition = new webkitSpeechRecognition();
          let final_transcript = "";
          let started = false;
          // const colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'segment', 'cells' ];
          // const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
          // var speechRecognitionList = new SpeechGrammarList();
          // speechRecognitionList.addFromString(grammar, 1);
          // speechRecognition.grammars = speechRecognitionList;
          speechRecognition.continuous = true;
          speechRecognition.interimResults = true;
          speechRecognition.lang = 'en-US';
          this.speechButton.style.background = "";
        
          speechRecognition.onstart = () => {
            started = true;
            final_transcript = '';
            this.speechButton.style.background = "LightGoldenRodYellow";
          };
          speechRecognition.onerror = () => {
            started = false;
            this.speechButton.style.background = "red";
            console.log("Speech Recognition Error");
          };
          speechRecognition.onend = () => {
            started = false;
            this.speechButton.style.background = "";
            console.log("Speech Recognition Ended");
          };
        
          speechRecognition.onresult = (event) => {
            let interim_transcript = "";
        
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                this.inputBox.value = final_transcript;
              } else {
                interim_transcript += event.results[i][0].transcript;
                this.inputBox.value = interim_transcript;
              }
            }
          };
          this.speechRecognition = speechRecognition;
          this.speechButton.onclick = () => {
            if (started) {
              speechRecognition.stop();
            }
            else{
              speechRecognition.start();
            }
          };
        } else {
          console.error("Speech Recognition Not Available");
          this.speechButton.style.display = "none";
        }
      }

      createNode() {
        this.node.innerHTML = `<h2>Chat Notebook</h2><p>Built with OpenAI GPT-3 and Codex, by Wei Ouyang</p>`
        this.node.style.padding = "10px"
        this.node.style.background = "white";
        this.node.style.height = "100%";
        this.node.style.overflow = "auto";
        this.tokenInput = document.createElement('input')
        this.tokenInput.style.display = "block";
        this.tokenInput.style.width = "100%";
        this.tokenInput.style.color = "gray";
        this.tokenInput.type = "password";
        this.inputBox = document.createElement('textarea')
        this.inputBox.style.marginTop = "10px";
        this.inputBox.style.display = "block";
        this.inputBox.style.width = "100%";
        this.inputBox.style.height = "6rem";
        this.inputBox.style.fontSize = "16px";
        this.speechButton = document.createElement('button')
        this.speechButton.innerHTML = 'Voice'
        this.speechButton.style.width = "50%";
        this.speechButton.style.height = "20px";
        this.speechButton.style.fontSize = "16px";
        this.speechButton.style.display = "inline-block";
        this.speechButton.classList.add("bp3-button", "bp3-minimal", "jp-ToolbarButtonComponent", "minimal", "jp-Button")
        this.undoButton = document.createElement('button')
        this.undoButton.style.width = "50%";
        this.undoButton.style.height = "20px";
        this.undoButton.style.fontSize = "16px";
        this.undoButton.innerHTML = 'Undo'
        this.undoButton.style.display = "inline-block";
        this.undoButton.classList.add("bp3-button", "bp3-minimal", "jp-ToolbarButtonComponent", "minimal", "jp-Button")
        this.executeButton = document.createElement('button')
        this.executeButton.innerHTML = 'Execute'
        this.executeButton.style.display = "block";
        this.executeButton.style.fontSize = "16px";
        this.executeButton.style.width = "100%";
        this.executeButton.classList.add("bp3-button", "bp3-minimal", "jp-ToolbarButtonComponent", "minimal", "jp-Button")
       
        this.node.appendChild(this.tokenInput)
        this.node.appendChild(this.inputBox)
        this.node.appendChild(this.speechButton)
        this.node.appendChild(this.undoButton)
        this.node.appendChild(this.executeButton)
        
        this.requestedCodeElm = document.createElement('pre')
        this.requestedCodeElm.style.color = 'gray'
        this.respondCodeElm = document.createElement('pre')
        this.respondCodeElm.style.color = 'blue'
        this.node.appendChild(this.respondCodeElm)
        this.node.appendChild(this.requestedCodeElm)

        let openai;
        const lastToken = localStorage.getItem('openai-token');
        if (lastToken) {
            openai = new (openai_api__WEBPACK_IMPORTED_MODULE_3___default())(lastToken);
            this.tokenInput.value = lastToken;
        }
        this.tokenInput.onchange = () => {
          openai = new (openai_api__WEBPACK_IMPORTED_MODULE_3___default())(this.tokenInput.value);
          localStorage.setItem('openai-token', this.tokenInput.value);
        }

        this.executeButton.onclick = async () => {
          this.respondCodeElm.innerHTML = ""
          if(this.speechRecognition) this.speechRecognition.stop();
          const command = capitalize(this.inputBox.value.trim())
          if(command.length <=0) return;
          const lines = command.split('\n');

          let formatedCommand = '## ' + lines[0].replace(/^(\#+\s)/,"");
          if(lines.length>1) formatedCommand += '\n"""\n' + lines.slice(1).join('\n') + '\n"""' 
          const prompt = nbExt.getCodeHistory().join('\n') + `\n${formatedCommand}\n`
          this.requestedCodeElm.innerHTML = prompt
          this.executeButton.style.background = "LightGoldenRodYellow";
          try{
            const gptResponse = await openai.complete({
              engine: 'davinci-codex',
              prompt,
              maxTokens: 500,
              temperature: 0.1,
              topP: 1,
              presencePenalty: 0,
              frequencyPenalty: 0,
              bestOf: 1,
              n: 1,
              stream: false,
              stop: ['## ']
            });
            console.log(gptResponse.data);
            const completion = gptResponse.data.choices[0].text.trim()
            this.respondCodeElm.innerHTML = completion
            if(completion.startsWith('%undo')){
              this.undoButton.onclick();
            }
            else if(completion.startsWith('%run')){
              nbExt.runCell()
            }
            else if(completion.startsWith('%run-all')){
              nbExt.runAllCells()
            }
            else if(completion.startsWith('%markdown')){
              // remove the %markdown from the completion
              const markdown = completion.substring(10)
              nbExt.addMarkdown(markdown)
            }
            else{
              nbExt.addCell("# " + command.trim(), completion)
            }
          }
          catch(e){
            console.error(e)
            alert(`Failed to execute: ${e}`)
          }
          this.executeButton.style.background = "";
          this.inputBox.value = '';
        }
        this.undoButton.onclick = async () => {
          if(this.speechRecognition) this.speechRecognition.stop();
          if(this.inputBox.value.trim().length>0){
            this.inputBox.value = '';
            return;
          }
          else{
            const lastMarkdownCellContent = nbExt.undoCell()
            this.inputBox.value = lastMarkdownCellContent.split('\n')[0];
          }
        }
        this.inputBox.addEventListener('keydown', (e)=>{
          if (e.key == 'Enter' && !e.shiftKey) {
            this.executeButton.onclick();
            e.preventDefault();
          }
        });
        this.setupSpeech()
      }
    }
    const panel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel();
    panel.id = 'Example-tab';
    panel.title.iconClass = 'jp-MaterialIcon jp-LinkIcon';
    panel.addWidget(new ContentWidget());
    app.shell.add(panel, 'left', { rank: 1 })
  }
});



/***/ })

}]);
//# sourceMappingURL=lib_index_js-webpack_sharing_consume_default_jupyterlab_cells-webpack_sharing_consume_default-cd22ae.6d037b585e4a0a524258.js.map