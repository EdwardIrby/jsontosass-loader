"use strict";

var loaderUtils = require("loader-utils");

module.exports = function(content) {



    function jsonToSassVars (obj, indent) {
        // Make object root properties into sass variables
        var sass = "";
        for (var key in obj) {
            sass += "$" + key + ":" + JSON.stringify(obj[key], null, indent) + ";\n";
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
            sass = sass.replace(str.id, str.value);
        });


        return sass;
    }

    var query = loaderUtils.parseQuery(this.query);

    var sass = jsonToSassVars(query);

    return sass ? sass + '\n ' + content : content;
}