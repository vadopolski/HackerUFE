console.log('YO');
var httpServer = require('http');
var counter = 0;


function handleServerRequest(request, response){
    console.log('>>>> NODE: got request', ++counter);
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Hello World!!!! <br/>This is the response');
    response.end();
}

httpServer.createServer(handleServerRequest).listen(8888);

console.log('>>>> Node Server');