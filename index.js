"use strict";

var loaderUtils = require("loader-utils");

module.exports = function(content) {
    this.cacheable();
    
    var query = loaderUtils.parseQuery(this.query);
    var prefix = jsonToSassVars(query);
    
    return prefix ? prefix + '\n\n' + content : content;
}

function encodeKey(key) {
    //match escaped sequences, or invalid characters
    //   NOTE: not supporting unescapedunicode values
    var k = key.replace(/(\\[0-9a-fA-F]{4}|[^a-zA-Z0-9_-])/g, function(c){
        //already escaped sequence, keep as-is
        if (c.length > 1) return c;
        
        // escape special character
        if (/\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\]\^\{\|\}\~/.test(c)) return '\\' + c;
        
        //replace unsupported characters with underscore
        return '_';
    });
    
    //if it starts with an invalid character, prefix underscore
    if (k && k[0] && /[^a-zA-Z_-]/.test(k[0])) k = '_' + k;
    
    //return encoded key
    return k;
}

function encode(obj) {
    if (typeof obj === "string") {
        //css dimension - return as-is
        if (/^\d+(em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|q|in|ot|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpom|dppx)?$/.test(obj.trim())) return obj.trim();
        
        //already quoted string
        if (/^(\"(?:[^"\\]|\\.)*\"|\'(?:[^\'\\]|\\.)*\')$/.test(obj.trim())) return obj.trim();
        
        //wrap string
        return '"' + obj.replace(/\"/g,'\\"') + '"'; 
    }
    if (typeof obj === "number") return obj.toString();
    if (obj === null) return '""';
    if (typeof obj === "undefined") return '""';
    if (typeof obj === "boolean") return obj.toString();
    if (obj instanceof Date) return encode(obj.toString());
    if (Array.isArray(obj)) {
        return '(' + obj.map(encode).join(',') + ')';
    }
    if (obj instanceof Object) {
        return '(' + Object.keys(obj).map(function(key){
            return stubKey(key) + ':' + encode(obj[key]);
        }).join(',') + ')';
    }
    return encode(obj.toString());
}

function jsonToSassVars (obj) {
    var keys = Object.keys(obj);
    var kvs = keys.map(function(key){
        return '$' + encodeKey(key) + ':' + encode(obj[key]);
    }).join(';\n');
    return "/*** jsontosass:begin ***/\n" + kvs + ";\n/*** jsontosass:end ***/\n";
}