/**
 * Created by vintizer on 1/17/16.
 */
var http = require('http');
var fs = require('fs');
var chat = require('./chat');
http.createServer(function(req,res){
    //console.log(req.url);
   switch (req.url) {
       case '/':
           console.log('/');
           sendFile('index.html', res);
           break;
       case '/subscribe':
           chat.subscribe(req,res);
           //....
           break;
       case '/publish':
           var body = '';
           req.on('readable', function(){
               body += req.read();
           })
               .on('end', function(){
                   body = JSON.parse(body);
                   console.log(body.message);
                   chat.publish(body.message);
                   res.end('ok');
               });
           //chat.publish('...');
           //...
           break;
       default :
           res.statusCode = 404;
           res.end('Not found');
   }
}).listen(3000);

function sendFile(fileName, res){
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function(){
            res.statusCode = 404;
            res.end('Not found');
        })
        .pipe(res);
}