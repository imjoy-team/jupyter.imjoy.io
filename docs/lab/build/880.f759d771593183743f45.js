"use strict";(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[880],{60880:(e,t,o)=>{o.r(t);var r=o(70163),s=o(62933),l=o(56532);const a=Promise.all([o.e(4100),o.e(2914)]).then(o.bind(o,92914)),n=[o.e(520).then(o.t.bind(o,70520,23)),o.e(9925).then(o.t.bind(o,59925,23)),o.e(936).then(o.t.bind(o,40936,23))],i=["@jupyterlab/apputils-extension:workspaces","@jupyterlab/application-extension:logo","@jupyterlab/application-extension:main","@jupyterlab/application-extension:tree-resolver","@jupyterlab/apputils-extension:resolver","@jupyterlab/docmanager-extension:download","@jupyterlab/filebrowser-extension:download","@jupyterlab/filebrowser-extension:share-file","@jupyterlab/help-extension:about"];async function c(e,t){try{return(await window._JUPYTERLAB[e].get(t))()}catch(o){throw console.warn(`Failed to create module: package: ${e}; module: ${t}`),o}}!async function(){await a;const e=[],t=[],f=[],h=[],p=[],u=[],y=JSON.parse(l.PageConfig.getOption("federated_extensions")),b=new Set;function*x(e){let t;t=e.hasOwnProperty("__esModule")?e.default:e;let o=Array.isArray(t)?t:[t];for(let e of o)l.PageConfig.Extension.isDisabled(e.id)||i.includes(e.id)||i.includes(e.id.split(":")[0])||(yield e)}y.forEach((e=>{e.liteExtension?u.push(c(e.name,e.extension)):(e.extension&&(b.add(e.name),t.push(c(e.name,e.extension))),e.mimeExtension&&(b.add(e.name),f.push(c(e.name,e.mimeExtension))),e.style&&h.push(c(e.name,e.style)))}));const d=[];if(!b.has("@jupyterlab/json-extension"))try{let e=o(11227);for(let t of x(e))d.push(t)}catch(e){console.error(e)}if(!b.has("@jupyterlab/javascript-extension"))try{let e=o(20402);for(let t of x(e))d.push(t)}catch(e){console.error(e)}if(!b.has("@jupyterlab/pdf-extension"))try{let e=o(39860);for(let t of x(e))d.push(t)}catch(e){console.error(e)}if(!b.has("@jupyterlab/vega5-extension"))try{let e=o(95241);for(let t of x(e))d.push(t)}catch(e){console.error(e)}if(!b.has("@jupyterlite/iframe-extension"))try{let e=o(87391);for(let t of x(e))d.push(t)}catch(e){console.error(e)}if((await Promise.allSettled(f)).forEach((e=>{if("fulfilled"===e.status)for(let t of x(e.value))d.push(t);else console.error(e.reason)})),!b.has("@jupyterlab/application-extension"))try{let t=o(65781);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/apputils-extension"))try{let t=o(31686);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/celltags-extension"))try{let t=o(85030);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/codemirror-extension"))try{let t=o(43377);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/completer-extension"))try{let t=o(92495);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/console-extension"))try{let t=o(79522);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/csvviewer-extension"))try{let t=o(68916);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/docmanager-extension"))try{let t=o(33773);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/filebrowser-extension"))try{let t=o(70097);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/fileeditor-extension"))try{let t=o(85935);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/help-extension"))try{let t=o(38534);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/htmlviewer-extension"))try{let t=o(53149);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/imageviewer-extension"))try{let t=o(63306);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/inspector-extension"))try{let t=o(12169);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/launcher-extension"))try{let t=o(15282);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/logconsole-extension"))try{let t=o(70665);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/mainmenu-extension"))try{let t=o(85435);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/markdownviewer-extension"))try{let t=o(79125);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/mathjax2-extension"))try{let t=o(39033);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/notebook-extension"))try{let t=o(26503);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/rendermime-extension"))try{let t=o(84726);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/running-extension"))try{let t=o(66189);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/settingeditor-extension"))try{let t=o(68183);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/shortcuts-extension"))try{let t=o(97981);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/statusbar-extension"))try{let t=o(81367);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/theme-dark-extension"))try{let t=o(92461);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/theme-light-extension"))try{let t=o(71828);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/toc-extension"))try{let t=o(48561);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/tooltip-extension"))try{let t=o(37339);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/translation-extension"))try{let t=o(65870);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlab/ui-components-extension"))try{let t=o(2490);for(let o of x(t))e.push(o)}catch(e){console.error(e)}if(!b.has("@jupyterlite/application-extension"))try{let t=o(65405);for(let o of x(t))e.push(o)}catch(e){console.error(e)}(await Promise.allSettled(t)).forEach((t=>{if("fulfilled"===t.status)for(let o of x(t.value))e.push(o);else console.error(t.reason)})),(await Promise.all(n)).forEach((e=>{for(let t of x(e))p.push(t)})),(await Promise.allSettled(u)).forEach((e=>{if("fulfilled"===e.status)for(let t of x(e.value))p.push(t);else console.error(e.reason)})),(await Promise.allSettled(h)).filter((({status:e})=>"rejected"===e)).forEach((({reason:e})=>{console.error(e)}));const j=new s.JupyterLiteServer({});j.registerPluginModules(p),await j.start();const{serviceManager:m}=j,w=new r.JupyterLab({mimeExtensions:d,serviceManager:m,disabled:i});w.name="JupyterLite",w.registerPluginModules(e),"true"===(l.PageConfig.getOption("exposeAppInBrowser")||"").toLowerCase()&&(window.jupyterapp=w),console.log("Starting app"),await w.start(),console.log(`${w.name} started, waiting for restore`),await w.restored,console.log(`${w.name} restored`)}()}}]);
//# sourceMappingURL=880.f759d771593183743f45.js.map