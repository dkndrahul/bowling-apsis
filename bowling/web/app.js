/*

 Deekonda Rahul
 ----------------------
 Author:         AV
 Created Date:   03/09/2015
 Purpose:        Angular framework with express and route

 */

var express = require('express');
var http = require('http');
var app = express();

var port = 2323;
app.use(app.router);
app.use(express.static(__dirname));

//app.listen(port);
server = http.createServer(app);

server.listen(port, function() {
    console.log('UI listening on port '+ server.address().port);
      
});

module.exports = app;
