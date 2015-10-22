# json to sass loader for webpack

## Installation

`npm install jsontosass-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Example config

``` javascript
var sassGlobals = require('[YourVars.json file]');
var sassVars = JSON.stringify(sassGlobals);
// => returns [YourVars.json file] content as string
var webpackConfig = {
    module: {
        loaders:[
            {test: /.scss$/, loader: "style!css!sass!jsontosass?" + sassVars}
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

**Output SCSS**
``` scss
$breakpoints:(portraitS:320px,portraitM:360px,portraitL:414px);
$localNavHeight:50px;
```

### CSS Modules config

````js

{ test: /\.scss$/, loader: ExtractTextPlugin.extract(
        "style-loader",
        "css-loader?minimize&sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"+
        "!postcss-loader" +
        "!sass-loader?sourceMap"+
        "!jsontosass?"+ sassVars) 
},
````


Forked from gist: [jsonToSassVars](https://gist.github.com/Kasu/ea4f4861a81e626ea308) and [prepend-loader](https://gist.github.com/Kasu/29452051023ff5337bd7)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
