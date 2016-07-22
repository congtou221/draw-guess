// 构建http服务器
var app = require('express')(), 
	server = require('http').createServer(app);

server.listen(3000);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
})
app.get('/dist/bundle.js', function(req, res){
	res.sendFile(__dirname + '/dist/bundle.js');
})
// 启动WebSocket服务
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server : server});


wss.on('connection', function connection(ws){
	console.log('success connect!');
	ws.on('message', function incoming(msg){
		console.log('received: %s', msg);

		ws.send('something');
	})
	
	ws.on('close', function closing(){
		console.log('stopping client');
	})


})







