(self.webpackChunk_retrolab_lab_extension=self.webpackChunk_retrolab_lab_extension||[]).push([[676,697],{676:(e,t,i)=>{"use strict";i.r(t),i.d(t,{IRetroShell:()=>u,RetroApp:()=>f,RetroShell:()=>c});var n=i(180),s=i(950),a=i(448),r=i(983),o=i(361),d=i(850),l=i(797),g=i(211),p=i(168),h=i(706);const u=new l.Token("@retrolab/application:IRetroShell");class c extends h.Widget{constructor(){super(),this._currentChanged=new p.Signal(this),this.id="main";const e=new h.BoxLayout;this._topHandler=new m.PanelHandler,this._menuHandler=new m.PanelHandler,this._main=new h.Panel,this._topHandler.panel.id="top-panel",this._menuHandler.panel.id="menu-panel",this._main.id="main-panel";const t=this._topWrapper=new h.Panel;t.id="top-panel-wrapper",t.addWidget(this._topHandler.panel);const i=this._menuWrapper=new h.Panel;i.id="menu-panel-wrapper",i.addWidget(this._menuHandler.panel),h.BoxLayout.setStretch(t,0),h.BoxLayout.setStretch(i,0),h.BoxLayout.setStretch(this._main,1),this._spacer=new h.Widget,this._spacer.id="spacer-widget",e.spacing=0,e.addWidget(t),e.addWidget(i),e.addWidget(this._spacer),e.addWidget(this._main),this.layout=e}get currentChanged(){return this._currentChanged}get currentWidget(){var e;return null!==(e=this._main.widgets[0])&&void 0!==e?e:null}get top(){return this._topWrapper}get menu(){return this._menuWrapper}activateById(e){const t=(0,d.find)(this.widgets("main"),(t=>t.id===e));t&&t.activate()}add(e,t,i){var n;const s=null!==(n=null==i?void 0:i.rank)&&void 0!==n?n:900;if("top"===t)return this._topHandler.addWidget(e,s);if("menu"===t)return this._menuHandler.addWidget(e,s);if("main"===t||void 0===t){if(this._main.widgets.length>0)return;this._main.addWidget(e),this._main.update(),this._currentChanged.emit(void 0)}}collapseTop(){this._topWrapper.setHidden(!0),this._spacer.setHidden(!0)}expandTop(){this._topWrapper.setHidden(!1),this._spacer.setHidden(!1)}widgets(e){switch(null!=e?e:"main"){case"top":return(0,d.iter)(this._topHandler.panel.widgets);case"menu":return(0,d.iter)(this._menuHandler.panel.widgets);case"main":return(0,d.iter)(this._main.widgets);default:throw new Error(`Invalid area: ${e}`)}}}var m,_;!function(e){e.itemCmp=function(e,t){return e.rank-t.rank},e.PanelHandler=class{constructor(){this._panelChildHook=(e,t)=>{switch(t.type){case"child-added":{const e=t.child;if(this._items.find((t=>t.widget===e)))break;const i=this._items[this._items.length-1].rank;this._items.push({widget:e,rank:i})}break;case"child-removed":{const e=t.child;d.ArrayExt.removeFirstWhere(this._items,(t=>t.widget===e))}}return!0},this._items=new Array,this._panel=new h.Panel,g.MessageLoop.installMessageHook(this._panel,this._panelChildHook)}get panel(){return this._panel}addWidget(t,i){t.parent=null;const n={widget:t,rank:i},s=d.ArrayExt.upperBound(this._items,n,e.itemCmp);d.ArrayExt.insert(this._items,s,n),this._panel.insertWidget(s,t)}}}(m||(m={}));class f extends n.JupyterFrontEnd{constructor(e={shell:new c}){var t,i;if(super(Object.assign(Object.assign({},e),{shell:null!==(t=e.shell)&&void 0!==t?t:new c})),this.name="RetroLab",this.namespace=this.name,this.status=new a.J(this),this.version=null!==(i=r.PageConfig.getOption("appVersion"))&&void 0!==i?i:"unknown",this._formatter=new o.eD((()=>{_.setFormat(this)}),250),e.mimeExtensions)for(const t of(0,s.as)(e.mimeExtensions))this.registerPlugin(t);this._formatter.invoke()}get paths(){return{urls:{base:r.PageConfig.getOption("baseUrl"),notFound:r.PageConfig.getOption("notFoundUrl"),app:r.PageConfig.getOption("appUrl"),static:r.PageConfig.getOption("staticUrl"),settings:r.PageConfig.getOption("settingsUrl"),themes:r.PageConfig.getOption("themesUrl"),doc:r.PageConfig.getOption("docUrl"),translations:r.PageConfig.getOption("translationsApiUrl"),hubHost:r.PageConfig.getOption("hubHost")||void 0,hubPrefix:r.PageConfig.getOption("hubPrefix")||void 0,hubUser:r.PageConfig.getOption("hubUser")||void 0,hubServerName:r.PageConfig.getOption("hubServerName")||void 0},directories:{appSettings:r.PageConfig.getOption("appSettingsDir"),schemas:r.PageConfig.getOption("schemasDir"),static:r.PageConfig.getOption("staticDir"),templates:r.PageConfig.getOption("templatesDir"),themes:r.PageConfig.getOption("themesDir"),userSettings:r.PageConfig.getOption("userSettingsDir"),serverRoot:r.PageConfig.getOption("serverRoot"),workspaces:r.PageConfig.getOption("workspacesDir")}}}handleEvent(e){super.handleEvent(e),"resize"===e.type&&this._formatter.invoke()}registerPluginModule(e){let t=e.default;Object.prototype.hasOwnProperty.call(e,"__esModule")||(t=e),Array.isArray(t)||(t=[t]),t.forEach((e=>{try{this.registerPlugin(e)}catch(e){console.error(e)}}))}registerPluginModules(e){e.forEach((e=>{this.registerPluginModule(e)}))}}!function(e){e.setFormat=function(e){e.format=window.matchMedia("only screen and (max-width: 760px)").matches?"mobile":"desktop"}}(_||(_={}))}}]);