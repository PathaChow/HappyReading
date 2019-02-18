// global variables
//const fs = require('fs');

var express = require('express')
var app = express()
var path = require('path');


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/ReadingAssistant.html'));

})

app.get('/query/:bookname', function (req, res) {
    console.log(req.params);
})

app.listen(3000)

// create a Web server instance

// Create a node-static server instance to serve the './public' folder

// called on http request arrival event










/*


function fileNotFound (request, response) {
    //fileServer.serveFile('/not-found.html', 404, {},request, response);
}


// what to do on a query
function queryHandler (request, response, url) {
    var query = url[1]; // position 6 thru end
    var type = query.split("=")[0];
    var params = query.split("=")[1];
    console.log(params);
    console.log(type);
    if (type == "bookname") { handleBookname(params, response); }
    else { badQuery(response); }
}

function handleBookname(params, response){
	fs.readFile(params, (err, data) => {  
    if (err) throw err;
    response.writeHead(200, {"Content-Type": "text"});
    response.write(data);
    response.end();
    console.log(student);
	});
}

function badQuery(response) {
    response.writeHead(400, {"Content-Type": "text"});
    response.write("bad query");
    response.end();
}
*/

