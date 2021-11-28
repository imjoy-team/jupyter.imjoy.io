"use strict";
(self["webpackChunkimjoy_jupyterlab_extension"] = self["webpackChunkimjoy_jupyterlab_extension"] || []).push([["lib_index_js"],{

/***/ "./lib/comm-connection.js":
/*!********************************!*\
  !*** ./lib/comm-connection.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "putBuffers": () => (/* binding */ putBuffers),
/* harmony export */   "removeBuffers": () => (/* binding */ removeBuffers),
/* harmony export */   "Connection": () => (/* binding */ Connection)
/* harmony export */ });
/* eslint max-classes-per-file: "off" */
/* eslint no-underscore-dangle: "off" */

function isSerializable(object) {
  return typeof object === 'object' && object && object.toJSON;
}

function isObject(value) {
  return (
    value && typeof value === 'object' && value.constructor === Object
  );
}

// pub_buffers and removeBuffers are taken from
// https://github.com/jupyter-widgets/ipywidgets/blob/master/packages/base/src/utils.ts
// Author: IPython Development Team
// License: BSD
function putBuffers(state, bufferPaths, buffers) {
  buffers = buffers.map(b => {
    if (b instanceof DataView) {
      return b.buffer;
    }
    return b instanceof ArrayBuffer ? b : b.buffer;
  });
  for (let i = 0; i < bufferPaths.length; i++) {
    const bufferPath = bufferPaths[i];
    // say we want to set state[x][y][z] = buffers[i]
    let obj = state;
    // we first get obj = state[x][y]
    for (let j = 0; j < bufferPath.length - 1; j++) {
      obj = obj[bufferPath[j]];
    }
    // and then set: obj[z] = buffers[i]
    obj[bufferPath[bufferPath.length - 1]] = buffers[i];
  }
}

/**
 * The inverse of putBuffers, return an objects with the new state where all buffers(ArrayBuffer)
 * are removed. If a buffer is a member of an object, that object is cloned, and the key removed. If a buffer
 * is an element of an array, that array is cloned, and the element is set to null.
 * See putBuffers for the meaning of buffer_paths
 * Returns an object with the new state (.state) an array with paths to the buffers (.buffer_paths),
 * and the buffers associated to those paths (.buffers).
 */
function removeBuffers(state) {
  const buffers = [];
  const bufferPaths = [];
  // if we need to remove an object from a list, we need to clone that list, otherwise we may modify
  // the internal state of the widget model
  // however, we do not want to clone everything, for performance
  function remove(obj, path) {
    if (isSerializable(obj)) {
      // We need to get the JSON form of the object before recursing.
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior
      obj = obj.toJSON();
    }
    if (Array.isArray(obj)) {
      let isCloned = false;
      for (let i = 0; i < obj.length; i++) {
        const value = obj[i];
        if (value) {
          if (
            value instanceof ArrayBuffer ||
            ArrayBuffer.isView(value)
          ) {
            if (!isCloned) {
              obj = obj.slice();
              isCloned = true;
            }
            buffers.push(
              ArrayBuffer.isView(value) ? value.buffer : value,
            );
            bufferPaths.push(path.concat([i]));
            // easier to just keep the array, but clear the entry, otherwise we have to think
            // about array length, much easier this way
            obj[i] = null;
          } else {
            const newValue = remove(value, path.concat([i]));
            // only assigned when the value changes, we may serialize objects that don't support assignment
            if (newValue !== value) {
              if (!isCloned) {
                obj = obj.slice();
                isCloned = true;
              }
              obj[i] = newValue;
            }
          }
        }
      }
    } else if (isObject(obj)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(obj)) {
        let isCloned = false;
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (value) {
            if (
              value instanceof ArrayBuffer ||
              ArrayBuffer.isView(value)
            ) {
              if (!isCloned) {
                obj = {
                  ...obj,
                };
                isCloned = true;
              }
              buffers.push(
                ArrayBuffer.isView(value) ? value.buffer : value,
              );
              bufferPaths.push(path.concat([key]));
              delete obj[key]; // for objects/dicts we just delete them
            } else {
              const newValue = remove(value, path.concat([key]));
              // only assigned when the value changes, we may serialize objects that don't support assignment
              if (newValue !== value) {
                if (!isCloned) {
                  obj = {
                    ...obj,
                  };
                  isCloned = true;
                }
                obj[key] = newValue;
              }
            }
          }
        }
      }
    }
    return obj;
  }
  const newState = remove(state, []);
  return {
    state: newState,
    buffers,
    buffer_paths: bufferPaths,
  };
}

class MessageEmitter {
  constructor(debug) {
    this._event_handlers = {};
    this._once_handlers = {};
    this._debug = debug;
  }

  emit() {
    throw new Error('emit is not implemented');
  }

  on(event, handler) {
    if (!this._event_handlers[event]) {
      this._event_handlers[event] = [];
    }
    this._event_handlers[event].push(handler);
  }

  once(event, handler) {
    handler.___event_run_once = true;
    this.on(event, handler);
  }

  off(event, handler) {
    if (!event && !handler) {
      // remove all events handlers
      this._event_handlers = {};
    } else if (event && !handler) {
      // remove all hanlders for the event
      if (this._event_handlers[event])
        this._event_handlers[event] = [];
    } else if (this._event_handlers[event]) {
      // remove a specific handler
      const idx = this._event_handlers[event].indexOf(handler);
      if (idx >= 0) {
        this._event_handlers[event].splice(idx, 1);
      }
    }
  }

  _fire(event, data) {
    if (this._event_handlers[event]) {
      let i = this._event_handlers[event].length;
      while (i--) {
        const handler = this._event_handlers[event][i];
        try {
          handler(data);
        } catch (e) {
          console.error(e);
        } finally {
          if (handler.___event_run_once) {
            this._event_handlers[event].splice(i, 1);
          }
        }
      }
    } else if (this._debug) {
      console.warn('unhandled event', event, data);
    }
  }
}

class Connection extends MessageEmitter {
  constructor(config) {
    super(config && config.debug);
    const comm = config.kernel.createComm('imjoy_rpc');
    comm.open({});
    comm.onMsg = msg => {
      const { data } = msg.content;
      const bufferPaths = data.__buffer_paths__ || [];
      delete data.__buffer_paths__;
      putBuffers(data, bufferPaths, msg.buffers || []);
      if (data.type === 'log' || data.type === 'info') {
        console.log(data.message);
      } else if (data.type === 'error') {
        console.error(data.message);
      } else {
        if (data.peer_id) {
          this._peer_id = data.peer_id;
        }
        this._fire(data.type, data);
      }
    };
    this.comm = comm;
  }

  connect() {}

  disconnect() {}

  emit(data) {
    data.peer_id = this._peer_id;
    const split = removeBuffers(data);
    split.state.__buffer_paths__ = split.buffer_paths;
    this.comm.send(split.state, {}, {}, split.buffers);
  }
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var imjoy_core_dist_imjoy_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! imjoy-core/dist/imjoy-loader */ "./node_modules/imjoy-core/dist/imjoy-loader.js");
/* harmony import */ var imjoy_core_dist_imjoy_loader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(imjoy_core_dist_imjoy_loader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../package.json */ "./package.json");
/* harmony import */ var _comm_connection_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comm-connection.js */ "./lib/comm-connection.js");










async function patchPyodideKernel(kernel){
  const info = await kernel.info;
  // apply patch for pyolite to make sure we have the kernel id
  if(info.implementation === 'pyodide') {
    const kernel_patch = `
import os
import ipykernel
import micropip
import sys

await micropip.install([ "imjoy-rpc"])
import imjoy_rpc

if 'imjoy' not in sys.modules:
    sys.modules['imjoy'] = sys.modules['imjoy_rpc']

if 'IMJOY_RPC_CONNECTION' not in os.environ:
    os.environ['IMJOY_RPC_CONNECTION'] = 'jupyter'

class Connect():
    def __init__(self, kernel_id):
        self.kernel_id = kernel_id

    def get_connection_file(self):
        return f"kernel-{self.kernel_id}.json"

if not hasattr(ipykernel, 'connect'):
    ipykernel.connect = Connect("${kernel.id}")
`;
    const future = kernel.requestExecute({ code: kernel_patch } );
    await future.done
    console.log('Pyodide kernel patch applied');

  }
}

class ImjoyExtension {
  constructor(jupyterBaseUrl) {
    this.baseUrl = jupyterBaseUrl;
    if (window.self !== window.top) {
      throw new Error('Jupyter extension cannot run in an iframe.');
    }
    this.notebookHandlerPromise = new Promise((resolve, reject) => {
      this.resolveNotebookHandler = resolve;
      this.rejectNotebookHandler = reject;
    })
    // create an div with id= "window-container"
    const container = document.createElement('div');
    container.id = 'window-container';
    document.body.appendChild(container)
    let imjoy;
    (0,imjoy_core_dist_imjoy_loader__WEBPACK_IMPORTED_MODULE_0__.loadImJoyBasicApp)({
        process_url_query: true,
        show_window_title: false,
        show_progress_bar: true,
        show_empty_window: true,
        menu_style: { position: "absolute", right: 0, top: "2px" },
        window_style: {width: '100%', height: '100%'},
        main_container: null,
        menu_container: null,
        expose_api: false,
        // window_manager_container: "window-container",
        imjoy_api: {
          async createWindow(_plugin, w, extra_config) {
            if (!document.getElementById(w.window_id)) {
              if (!w.dialog) {
                if (document.getElementById(_plugin.id)) {
                  const elem = document.createElement('div');
                  elem.id = w.window_id;
                  elem.classList.add('imjoy-inline-window');
                  document.getElementById(_plugin.id).appendChild(elem);
                }
              }
            }
            return await imjoy.pm.createWindow(_plugin, w, extra_config);
          },
        }
    }).then(async app=>{
      console.log(`ImJoy Basic App loaded!`)
      imjoy = app.imjoy;
      const kernelInfo = {}

      async function connectPlugin(kernel_id) {
        if (!kernelInfo[kernel_id]) {
          console.warn('Kernel is not ready: ' + kernel_id);
          return;
        }
        const kernel = kernelInfo[kernel_id].kernel;
        await kernel.ready;
        const plugin = await imjoy.pm.connectPlugin(
          new _comm_connection_js__WEBPACK_IMPORTED_MODULE_3__.Connection({ kernel }),
        );
        kernelInfo[kernel_id].plugin = plugin;
      }
    
      async function runNotebookPlugin(kernel_id) {
        if (!kernelInfo[kernel_id]) {
          console.warn('Kernel is not ready: ' + kernel_id);
          return;
        }
        try {
          const plugin = kernelInfo[kernel_id].plugin;
          if (plugin && plugin.api.run) {
            let config = {};
            if (
              plugin.config.ui &&
              plugin.config.ui.indexOf('{') > -1
            ) {
              config = await app.imjoy.pm.imjoy_api.showDialog(
                plugin,
                plugin.config,
              );
            }
            await plugin.api.run({
              config: config,
              data: {},
            });
          }
        } catch (e) {
          console.error(e);
          app.showMessage(`Failed to load the plugin, error: ${e}`);
        }
      }
      window.connectPlugin = async kernel_id => {
        if (!kernel_id) {
          console.warn(
            'Please upgrade imjoy-rpc(>=0.3.35) by running `pip install -U imjoy-rpc`',
          );
          return;
        }
        await connectPlugin(kernel_id);
        await runNotebookPlugin(kernel_id);
      };
      window._connectPlugin = async kernel_id => {
        await connectPlugin(kernel_id);
      };
      window._runPluginOnly = async kernel_id => {
        await runNotebookPlugin(kernel_id);
      };

      this.resolveNotebookHandler(async (sessionContext, panelNode, buttonNode)=>{
        const { kernel } = sessionContext.session;
        sessionContext.kernelChanged.connect(() => {
          patchPyodideKernel(kernel);
        }, sessionContext);
        await patchPyodideKernel(kernel);
        kernelInfo[kernel._id] = { kernel };
        buttonNode.firstChild.innerHTML = `<img src="https://imjoy.io/static/img/imjoy-logo-black.svg" style="height: 17px;">`;
        buttonNode.firstChild.onclick = () => {
          runNotebookPlugin(kernel._id);
        };
      })
    })
    .catch(e => {
      console.error(e);
      this.rejectNotebookHandler(e);
    });
  }

  /**
   * Create a new extension object.
   */
  createNew(panel, context) {
    const button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton({
      tooltip: `ImJoy JupyterLab Extension (version: ${_package_json__WEBPACK_IMPORTED_MODULE_4__.version})`,
    });
    panel.toolbar.insertItem(0, 'Run ImJoy Plugin', button);

    context.sessionContext.ready.then(async () => {
      const notebookHandler = await this.notebookHandlerPromise;
      notebookHandler(context.sessionContext, panel.node, button.node);
    });
    return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
      button.dispose();
    });
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  id: 'imjoy-jupyterlab-extension',
  autoStart: true,
  activate: function (app) {
    const jupyterBaseUrl =
    app.serviceManager.settings.serverSettings.baseUrl;
    app.docRegistry.addWidgetExtension(
      'Notebook',
      new ImjoyExtension(jupyterBaseUrl),
    );
    console.log(
      'JupyterLab extension imjoy-jupyterlab-extension is activated!'
    );
  }
});


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"imjoy-jupyterlab-extension","version":"0.1.1","description":"Run ImJoy plugins in JupyterLab","keywords":["jupyter","jupyterlab","jupyterlab-extension"],"homepage":"https://github.coimjoy-team/imjoy-jupyterlab-extension","bugs":{"url":"https://github.coimjoy-team/imjoy-jupyterlab-extension/issues"},"license":"BSD-3-Clause","author":{"name":"Wei Ouyang","email":"oeway007@gmail.com"},"files":["lib/**/*.{d.ts,eot,gif,html,jpg,js,js.map,json,png,svg,woff2,ttf}","style/**/*.{css,.js,eot,gif,html,jpg,json,png,svg,woff2,ttf}"],"main":"lib/index.js","style":"style/index.css","repository":{"type":"git","url":"https://github.coimjoy-team/imjoy-jupyterlab-extension.git"},"scripts":{"build":"jlpm run build:labextension:dev","build:prod":"jlpm run build:labextension","build:labextension":"jupyter labextension build .","build:labextension:dev":"jupyter labextension build --development True .","clean:labextension":"rimraf imjoy-jupyterlab-extension/labextension","clean:all":"jlpm run clean:labextension","install:extension":"jupyter labextension develop --overwrite .","prepare":"jlpm run build:prod","prettier":"prettier --write \\"**/*{.js,.jsx,.css,.json,.md}\\"","watch":"jlpm run watch:labextension","watch:labextension":"jupyter labextension watch ."},"dependencies":{"@jupyterlab/application":"^3.2.4","@jupyterlab/apputils":"^3.2.4","@jupyterlab/docregistry":"^3.2.4","@jupyterlab/notebook":"^3.2.4","@phosphor/disposable":"^1.3.1","imjoy-core":"^0.14.2"},"devDependencies":{"@jupyterlab/builder":"^3.0.0","prettier":"^2.1.1","rimraf":"^3.0.2"},"sideEffects":["style/*.css","style/index.js"],"styleModule":"style/index.js","jupyterlab":{"extension":true,"outputDir":"imjoy-jupyterlab-extension/labextension"}}');

/***/ })

}]);
//# sourceMappingURL=lib_index_js.6e0f3f22f5ea8b639abd.js.map