"use strict";(self.webpackChunkimjoy_jupyterlab_extension=self.webpackChunkimjoy_jupyterlab_extension||[]).push([[433],{433:(e,n,t)=>{t.r(n),t.d(n,{default:()=>l});var o=t(703),i=t(129),s=t(825);class r extends class{constructor(e){this._event_handlers={},this._once_handlers={},this._debug=e}emit(){throw new Error("emit is not implemented")}on(e,n){this._event_handlers[e]||(this._event_handlers[e]=[]),this._event_handlers[e].push(n)}once(e,n){n.___event_run_once=!0,this.on(e,n)}off(e,n){if(e||n){if(e&&!n)this._event_handlers[e]&&(this._event_handlers[e]=[]);else if(this._event_handlers[e]){const t=this._event_handlers[e].indexOf(n);t>=0&&this._event_handlers[e].splice(t,1)}}else this._event_handlers={}}_fire(e,n){if(this._event_handlers[e]){let t=this._event_handlers[e].length;for(;t--;){const o=this._event_handlers[e][t];try{o(n)}catch(e){console.error(e)}finally{o.___event_run_once&&this._event_handlers[e].splice(t,1)}}}else this._debug&&console.warn("unhandled event",e,n)}}{constructor(e){super(e&&e.debug);const n=e.kernel.createComm("imjoy_rpc");n.open({}),n.onMsg=e=>{const{data:n}=e.content,t=n.__buffer_paths__||[];delete n.__buffer_paths__,function(e,n,t){t=t.map((e=>e instanceof DataView?e.buffer:e instanceof ArrayBuffer?e:e.buffer));for(let o=0;o<n.length;o++){const i=n[o];let s=e;for(let e=0;e<i.length-1;e++)s=s[i[e]];s[i[i.length-1]]=t[o]}}(n,t,e.buffers||[]),"log"===n.type||"info"===n.type?console.log(n.message):"error"===n.type?console.error(n.message):(n.peer_id&&(this._peer_id=n.peer_id),this._fire(n.type,n))},this.comm=n}connect(){}disconnect(){}emit(e){e.peer_id=this._peer_id;const n=function(e){const n=[],t=[];return{state:function e(o,i){var s,r;if("object"==typeof(s=o)&&s&&s.toJSON&&(o=o.toJSON()),Array.isArray(o)){let s=!1;for(let r=0;r<o.length;r++){const a=o[r];if(a)if(a instanceof ArrayBuffer||ArrayBuffer.isView(a))s||(o=o.slice(),s=!0),n.push(ArrayBuffer.isView(a)?a.buffer:a),t.push(i.concat([r])),o[r]=null;else{const n=e(a,i.concat([r]));n!==a&&(s||(o=o.slice(),s=!0),o[r]=n)}}}else if((r=o)&&"object"==typeof r&&r.constructor===Object)for(const s of Object.keys(o)){let r=!1;if(Object.prototype.hasOwnProperty.call(o,s)){const a=o[s];if(a)if(a instanceof ArrayBuffer||ArrayBuffer.isView(a))r||(o={...o},r=!0),n.push(ArrayBuffer.isView(a)?a.buffer:a),t.push(i.concat([s])),delete o[s];else{const n=e(a,i.concat([s]));n!==a&&(r||(o={...o},r=!0),o[s]=n)}}}return o}(e,[]),buffers:n,buffer_paths:t}}(e);n.state.__buffer_paths__=n.buffer_paths,this.comm.send(n.state,{},{},n.buffers)}}async function a(e){if("pyodide"===(await e.info).implementation){const n=`\nimport os\nimport ipykernel\nimport micropip\nimport sys\n\nawait micropip.install([ "imjoy-rpc"])\nimport imjoy_rpc\n\nif 'imjoy' not in sys.modules:\n    sys.modules['imjoy'] = sys.modules['imjoy_rpc']\n\nif 'IMJOY_RPC_CONNECTION' not in os.environ:\n    os.environ['IMJOY_RPC_CONNECTION'] = 'jupyter'\n\nclass Connect():\n    def __init__(self, kernel_id):\n        self.kernel_id = kernel_id\n\n    def get_connection_file(self):\n        return f"kernel-{self.kernel_id}.json"\n\nif not hasattr(ipykernel, 'connect'):\n    ipykernel.connect = Connect("${e.id}")\n`,t=e.requestExecute({code:n});await t.done,console.log("Pyodide kernel patch applied")}}class c{constructor(e){if(this.baseUrl=e,window.self!==window.top)throw new Error("Jupyter extension cannot run in an iframe.");this.notebookHandlerPromise=new Promise(((e,n)=>{this.resolveNotebookHandler=e,this.rejectNotebookHandler=n}));const n=document.createElement("div");let t;n.id="window-container",document.body.appendChild(n),(0,o.loadImJoyBasicApp)({process_url_query:!0,show_window_title:!1,show_progress_bar:!0,show_empty_window:!0,menu_style:{position:"absolute",right:0,top:"2px"},window_style:{width:"100%",height:"100%"},main_container:null,menu_container:null,expose_api:!1,imjoy_api:{async createWindow(e,n,o){if(!document.getElementById(n.window_id)&&!n.dialog&&document.getElementById(e.id)){const t=document.createElement("div");t.id=n.window_id,t.classList.add("imjoy-inline-window"),document.getElementById(e.id).appendChild(t)}return await t.pm.createWindow(e,n,o)}}}).then((async e=>{console.log("ImJoy Basic App loaded!"),t=e.imjoy;const n={};async function o(e){if(!n[e])return void console.warn("Kernel is not ready: "+e);const o=n[e].kernel;await o.ready;const i=await t.pm.connectPlugin(new r({kernel:o}));n[e].plugin=i}async function i(t){if(n[t])try{const o=n[t].plugin;if(o&&o.api.run){let n={};o.config.ui&&o.config.ui.indexOf("{")>-1&&(n=await e.imjoy.pm.imjoy_api.showDialog(o,o.config)),await o.api.run({config:n,data:{}})}}catch(n){console.error(n),e.showMessage(`Failed to load the plugin, error: ${n}`)}else console.warn("Kernel is not ready: "+t)}window.connectPlugin=async e=>{e?(await o(e),await i(e)):console.warn("Please upgrade imjoy-rpc(>=0.3.35) by running `pip install -U imjoy-rpc`")},window._connectPlugin=async e=>{await o(e)},window._runPluginOnly=async e=>{await i(e)},this.resolveNotebookHandler((async(e,t,o)=>{const{kernel:s}=e.session;e.kernelChanged.connect((()=>{a(s)}),e),await a(s),n[s._id]={kernel:s},o.firstChild.innerHTML='<img src="https://imjoy.io/static/img/imjoy-logo-black.svg" style="height: 17px;">',o.firstChild.onclick=()=>{i(s._id)}}))})).catch((e=>{console.error(e),this.rejectNotebookHandler(e)}))}createNew(e,n){const t=new s.ToolbarButton({tooltip:"ImJoy JupyterLab Extension (version: 0.1.1)"});return e.toolbar.insertItem(0,"Run ImJoy Plugin",t),n.sessionContext.ready.then((async()=>{(await this.notebookHandlerPromise)(n.sessionContext,e.node,t.node)})),new i.DisposableDelegate((()=>{t.dispose()}))}}const l={id:"imjoy-jupyterlab-extension",autoStart:!0,activate:function(e){const n=e.serviceManager.settings.serverSettings.baseUrl;e.docRegistry.addWidgetExtension("Notebook",new c(n)),console.log("JupyterLab extension imjoy-jupyterlab-extension is activated!")}}}}]);