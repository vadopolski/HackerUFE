console.log('YO');
var httpServer = require('http');
var url = require('url');
var counter = 0;

const server = httpServer.createServer(handleServerRequest);

function handleServerRequest(request, response) {
    const parseURL = url.parse(request.url, true);
    const originalPath = parseURL.pathname;

    const querryStringObj = parseURL.query;
    const {headers, method} = request;

    console.log()




    console.log('nUrl in Object', parseURL);
    console.log('>>>> NODE: got request', ++counter);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Hello World!!!! <br/>This is the response');
    response.end();
}

server.listen(8888);

console.log('>>>> Node Server');