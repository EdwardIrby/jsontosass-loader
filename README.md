# json to sass loader for webpack

### 0.1.7 Changes
- **Flagged as cacheable**
- **Simpler implementation** (See Example Config)
- **Marked dependencies** (triggers build on webpack watch and webpack-dev-server when vars file is changed)


### Installation

`npm install jsontosass-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Example config
**You can use either a json file or a js file with the module.exports syntax as your vars file.**

``` javascript
var sassVars = 'path/to/your/vars.js|json';
var webpackConfig = {
    module: {
        loaders:[
            {test: /.scss$/, loader: "style!css!sass!jsontosass?path="+ sassVars}
        ]
    },
}

```

**Input [YourVars.json file]**
``` json
{
"breakpoints":{
    "portraitS": "320px",
    "portraitM": "360px",
    "portraitL": "414px",
  },
  "localNavHeight":"50px",
}
```
**Input [YourVars.js file]**
``` js
module.exports = {
  "breakpoints":{
      "portraitS": "320px",
      "portraitM": "360px",
      "portraitL": "414px",
    },
    "localNavHeight":"50px",
}
```
**Output SCSS**
``` scss
$breakpoints:(portraitS:320px,portraitM:360px,portraitL:414px);
$localNavHeight:50px;
```


Forked from gist: [jsonToSassVars](https://gist.github.com/Kasu/ea4f4861a81e626ea308) and [prepend-loader](https://gist.github.com/Kasu/29452051023ff5337bd7)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
