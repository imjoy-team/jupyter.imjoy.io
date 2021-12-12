# ImJoy JupyterLite

Available at https://jupyter.imjoy.io


## Development
Download elFinder
```bash
wget https://github.com/imjoy-team/elFinder/archive/refs/heads/gh-pages.zip
unzip gh-pages.zip 
rm gh-pages.zip 
mv elFinder-gh-pages/ docs/elFinder
cp docs/elFinder/service-worker.js docs # make sure we have service worker for all domains
```

```bash
jupyter lite init --output-dir=./docs
jupyter lite build --output-dir=./docs
jupyter lite serve --output-dir=./docs --port=8382
```