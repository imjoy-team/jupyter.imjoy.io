"use strict";(self.webpackChunkimjoy_jupyterlab_extension=self.webpackChunkimjoy_jupyterlab_extension||[]).push([[433],{433:(e,n,t)=>{t.r(n),t.d(n,{default:()=>u});var o=t(703),i=t(967),s=t(324),r=t(468),a=t(321),l=t(294),c=t(129);class d extends class{constructor(e){this._event_handlers={},this._once_handlers={},this._debug=e}emit(){throw new Error("emit is not implemented")}on(e,n){this._event_handlers[e]||(this._event_handlers[e]=[]),this._event_handlers[e].push(n)}once(e,n){n.___event_run_once=!0,this.on(e,n)}off(e,n){if(e||n){if(e&&!n)this._event_handlers[e]&&(this._event_handlers[e]=[]);else if(this._event_handlers[e]){const t=this._event_handlers[e].indexOf(n);t>=0&&this._event_handlers[e].splice(t,1)}}else this._event_handlers={}}_fire(e,n){if(this._event_handlers[e]){let t=this._event_handlers[e].length;for(;t--;){const o=this._event_handlers[e][t];try{o(n)}catch(e){console.error(e)}finally{o.___event_run_once&&this._event_handlers[e].splice(t,1)}}}else this._debug&&console.warn("unhandled event",e,n)}}{constructor(e){super(e&&e.debug);const n=e.kernel.createComm("imjoy_rpc");n.open({}),n.onMsg=e=>{const{data:n}=e.content,t=n.__buffer_paths__||[];delete n.__buffer_paths__,function(e,n,t){t=t.map((e=>e instanceof DataView?e.buffer:e instanceof ArrayBuffer?e:e.buffer));for(let o=0;o<n.length;o++){const i=n[o];let s=e;for(let e=0;e<i.length-1;e++)s=s[i[e]];s[i[i.length-1]]=t[o]}}(n,t,e.buffers||[]),"log"===n.type||"info"===n.type?console.log(n.message):"error"===n.type?console.error(n.message):(n.peer_id&&(this._peer_id=n.peer_id),this._fire(n.type,n))},this.comm=n}connect(){}disconnect(){}emit(e){e.peer_id=this._peer_id;const n=function(e){const n=[],t=[];return{state:function e(o,i){var s,r;if("object"==typeof(s=o)&&s&&s.toJSON&&(o=o.toJSON()),Array.isArray(o)){let s=!1;for(let r=0;r<o.length;r++){const a=o[r];if(a)if(a instanceof ArrayBuffer||ArrayBuffer.isView(a))s||(o=o.slice(),s=!0),n.push(ArrayBuffer.isView(a)?a.buffer:a),t.push(i.concat([r])),o[r]=null;else{const n=e(a,i.concat([r]));n!==a&&(s||(o=o.slice(),s=!0),o[r]=n)}}}else if((r=o)&&"object"==typeof r&&r.constructor===Object)for(const s of Object.keys(o)){let r=!1;if(Object.prototype.hasOwnProperty.call(o,s)){const a=o[s];if(a)if(a instanceof ArrayBuffer||ArrayBuffer.isView(a))r||(o={...o},r=!0),n.push(ArrayBuffer.isView(a)?a.buffer:a),t.push(i.concat([s])),delete o[s];else{const n=e(a,i.concat([s]));n!==a&&(r||(o={...o},r=!0),o[s]=n)}}}return o}(e,[]),buffers:n,buffer_paths:t}}(e);n.state.__buffer_paths__=n.buffer_paths,this.comm.send(n.state,{},{},n.buffers)}}async function p(e){if("pyodide"===(await e.info).implementation){const n=`\nimport os\nimport ipykernel\nimport micropip\nimport sys\n\nawait micropip.install([ "imjoy-rpc"])\nimport imjoy_rpc\n\nif 'imjoy' not in sys.modules:\n    sys.modules['imjoy'] = sys.modules['imjoy_rpc']\n\nif 'IMJOY_RPC_CONNECTION' not in os.environ:\n    os.environ['IMJOY_RPC_CONNECTION'] = 'jupyter'\n\nclass Connect():\n    def __init__(self, kernel_id):\n        self.kernel_id = kernel_id\n\n    def get_connection_file(self):\n        return f"kernel-{self.kernel_id}.json"\n\nif not hasattr(ipykernel, 'connect'):\n    ipykernel.connect = Connect("${e.id}")\n`,t=e.requestExecute({code:n});await t.done,console.log("Pyodide kernel patch applied")}}class h{constructor(e,n,t){this.baseUrl=e;const s=window.self!==window.top;this.notebookHandlerPromise=new Promise(((e,n)=>{this.resolveNotebookHandler=e,this.rejectNotebookHandler=n}));const r=document.createElement("div");let l;r.id="window-container",document.body.appendChild(r),(0,o.loadImJoyBasicApp)({process_url_query:!0,show_window_title:!1,show_progress_bar:!0,show_empty_window:!0,menu_style:{position:"absolute",right:0,top:"2px"},window_style:{width:"100%",height:"100%"},main_container:null,menu_container:null,expose_api:!1,imjoy_api:{async createWindow(e,n,t){if(!document.getElementById(n.window_id)&&!n.dialog&&document.getElementById(e.id)){const t=document.createElement("div");t.id=n.window_id,t.classList.add("imjoy-inline-window"),document.getElementById(e.id).appendChild(t)}return await l.pm.createWindow(e,n,t)}}}).then((async e=>{console.log("ImJoy Basic App loaded!"),l=e.imjoy;const o={};async function r(e){if(!o[e])return void console.warn("Kernel is not ready: "+e);const n=o[e].kernel;await n.ready;const t=await l.pm.connectPlugin(new d({kernel:n}));o[e].plugin=t}async function c(n){if(o[n])try{const t=o[n].plugin;if(t&&t.api.run){let n={};t.config.ui&&t.config.ui.indexOf("{")>-1&&(n=await e.imjoy.pm.imjoy_api.showDialog(t,t.config)),await t.api.run({config:n,data:{}})}}catch(n){console.error(n),e.showMessage(`Failed to load the plugin, error: ${n}`)}else console.warn("Kernel is not ready: "+n)}s&&(await(0,i.setupRPC)({name:"ImJoy"})).export({setup(){},async loadFile(e,n,o){const i=new File([n],e,{type:o});return(await t.model.upload(i)).path},async openFile(e){await n.commands.execute("docmanager:open",{path:e})}}),window.connectPlugin=async e=>{e?(await r(e),await c(e)):console.warn("Please upgrade imjoy-rpc(>=0.3.35) by running `pip install -U imjoy-rpc`")},window._connectPlugin=async e=>{await r(e)},window._runPluginOnly=async e=>{await c(e)},this.resolveNotebookHandler((async(e,n,t)=>{const{kernel:i}=e.session;t.style.minWidth="25px";const s=new a.Spinner;s.node.firstChild.style.width="20px",s.node.firstChild.style.height="20px",e.kernelChanged.connect((()=>{t.appendChild(s.node),p(i).finally((()=>{t.removeChild(s.node)})).catch((()=>{console.error("Failed to apply pyodide patch")}))}),e),t.appendChild(s.node);try{await p(i)}catch(e){throw e}finally{t.removeChild(s.node)}o[i._id]={kernel:i},t.firstChild.innerHTML='<img src="https://imjoy.io/static/img/imjoy-logo-black.svg" style="height: 17px;">',t.firstChild.onclick=()=>{c(i._id)}}))})).catch((e=>{console.error(e),this.rejectNotebookHandler(e)}))}createNew(e,n){const t=new a.ToolbarButton({tooltip:"ImJoy JupyterLab Extension (version: 0.1.10)"});return e.toolbar.insertItem(0,"Run ImJoy Plugin",t),n.sessionContext.ready.then((async()=>{(await this.notebookHandlerPromise)(n.sessionContext,e.node,t.node)})),new c.DisposableDelegate((()=>{t.dispose()}))}}const u={id:"imjoy-jupyterlab-extension",requires:[s.IFileBrowserFactory,r.ITranslator],autoStart:!0,activate:async function(e,n,t){const o=t.load("jupyterlab"),{defaultBrowser:i}=n,s=e.serviceManager.settings.serverSettings.baseUrl;e.docRegistry.addWidgetExtension("Notebook",new h(s,e,i)),console.log("JupyterLab extension imjoy-jupyterlab-extension is activated!");const r=new URL(window.location);e.started.then((()=>{(async function(e,n,t,o){const i=new URLSearchParams(e),s=i.getAll("load");let r=null;for(let e of s){let n,i="";try{const s=await fetch(e);n=await s.blob(),i=s.headers.get("Content-Type")??"";try{const o=l.PathExt.basename(e).split("?")[0],s=new File([n],o,{type:i}),a=await t.model.upload(s);r=a.path,console.log("File uploaded: "+a.path)}catch(e){(0,a.showErrorMessage)(o._p("showErrorMessage","Upload Error"),e)}}catch(n){return n.response&&200!==n.response.status&&(n.message=o.__("Could not open URL: %1",e)),(0,a.showErrorMessage)(o.__("Cannot fetch"),n)}}let c=i.get("open");"1"===c&&(c=r),c&&await n.commands.execute("docmanager:open",{path:c})})(window.location.search,e,i,o).finally((()=>{window.history.pushState(null,"",r)}))}))}}}}]);