'use strict';
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
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({server : server});
let keywordsArr = ['Dog', 'Money', 'Cat', 'Bird'];

let keyWord = ((arr) => {
	let num = Math.floor(Math.random()*keywordsArr.length);
	return arr[num];
})(keywordsArr)

wss.on('connection', function connection(ws){
	console.log('success connect!');

	ws.send('keyword:' + keyWord);

	ws.on('message', function incoming(msg){
		if(msg === keyWord){
			wss.client.forEach(client => {
				client.send('success: You got it!')
			})
			return;
		}
		wss.clients.forEach(client => {
			client.send(msg);
		})		
	})
	
	ws.on('close', function closing(){
		console.log('stopping client');
	})


})







