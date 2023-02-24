var http = require('http');
var url = require("url");
const querystring = require("querystring");
const routerLogger = (path) => {
    if (path === "/"){
        return { status : 200 , message : "home page !"};
    }
    else if (path ==="/contact"){
        return { status : 200 , message : "contact page !"};
    }
    else if (path ==="/affichage/1/user"){
        return { status : 200 , message : "afficher l\'utilisateur qui a l\'id 1  !"};
    }
    else {
        return { status :200 , message :"page not found "};
    }
}
var server = http.createServer(function(req,res){
    res.writeHead(200);
    var page = url.parse(req.url).pathname;
    console.log("req.url ",url.parse(req.url).pathname);
    res.writeHead(200,{"Content-type":"text/plain"});
    const routerLogs = routerLogger(page);
    res.write(routerLogs.message);
    res.end();
})
server.listen(8080);

