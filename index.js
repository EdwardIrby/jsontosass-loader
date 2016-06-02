"use strict";

var loaderUtils = require("loader-utils");
var fs = require('fs');
var path = require("path");
module.exports = function(content) {
  var query = loaderUtils.parseQuery(this.query).path;
  var queryString = JSON.stringify(query);
  var varPath = queryString.replace(/["']/g, '');
  this.cacheable();
  var contentPath = path.resolve(varPath);
  this.addDependency(contentPath);
  var obj = JSON.parse(fs.readFileSync(contentPath, 'utf8'));


  function jsonToSassVars (obj, indent) {
    // Make object root properties into sass variables
    var sass = "";
    for (var key in obj) {
      sass += "$" + key + ":" + JSON.stringify(obj[key], null, indent) + ";\n";
    }

    if (!sass) {
      return sass
    }

    // Store string values (so they remain unaffected)
    var storedStrings = [];
    sass = sass.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {

      var id = "___JTS" + storedStrings.length;
      storedStrings.push({id: id, value: str});
      return id;
    });

    // Convert js lists and objects into sass lists and maps
    sass = sass.replace(/[{\[]/g, "(").replace(/[}\]]/g, ")");

    // Put string values back (now that we're done converting)
    storedStrings.forEach(function (str) {
      str.value = str.value.replace(/["']/g, '');
      sass = sass.replace(str.id, str.value);
    });

    return sass;
  }


  var sass = jsonToSassVars(obj);

  return sass ? sass + '\n ' + content : content;
}
