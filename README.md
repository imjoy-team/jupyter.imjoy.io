# ImJoy JupyterLite

Available at https://jupyter.imjoy.io


## Development
Download elFinder
```bash
wget https://github.com/imjoy-team/elFinder/archive/refs/heads/gh-pages.zip
unzip gh-pages.zip 
rm gh-pages.zip 
rm -rf docs/elFinder
mv elFinder-gh-pages/ docs/elFinder
cp docs/elFinder/service-worker.js docs # make sure we have service worker for all domains
```

```bash
jupyter lite init --output-dir=./docs
jupyter lite build --output-dir=./docs
jupyter lite serve --output-dir=./docs --port=8382
```

```bash
pip install -U plotly codex-chat-notebook imjoy-jupyterlite-extension
jupyter lite serve --output-dir=./docs --port=8382
```

Note: Make sure we restore the CNAME file:
```bash
echo "jupyter.imjoy.io" > docs/CNAME
```

## Load content with ImJoy API
```javascript
const jupyter = await api.createWindow({src: "https://jupyter.imjoy.io/lab/index.html", window_id: "jupyter-container", config={"left_collapsed": true}})
const content = await (await fetch("https://raw.githubusercontent.com/imjoy-team/imjoy-tutorials/master/2-bioengine/1-bioengine-engine-tutorial.ipynb")).text()
if(await jupyter.fileExists('my-file.ipynb')){
    await jupyter.removeFile('my-file.ipynb')
}
const filePath = await jupyter.loadFile('my-file.ipynb', content, 'application/json')
await jupyter.openFile(filePath)
```
