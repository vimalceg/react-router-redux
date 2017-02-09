//$Id$//
'use strict';
var express = require('express');
var app = express();
app.use('/', express.static("public"));


app.listen("9090", function (err) {
  if (err) {
    console.log(err);
    return;
  }
});