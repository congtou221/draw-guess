'use strict';
// 构建http服务器
const app = require('express')();
const server = require('http').createServer(app);

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
let keywordsArr = ['dog', 'money', 'cat', 'bird'];

let keyWord = ((arr) => {
	let num = Math.floor(Math.random()*keywordsArr.length);
	return arr[num];
})(keywordsArr)

wss.on('connection', function connection(ws){
	console.log('success connect!');

	ws.on('message', function incoming(msg){
		if(msg === keyWord){
			wss.clients.forEach(client => {
				client.send('answer: success!')
			})
			return;
		}
		if(msg.indexOf('position') >= 0){
			wss.clients.forEach(client => {
				client.send(msg);
			})
		}
		if(msg === 'clean'){
			wss.clients.forEach(client => {
				client.send(msg);
			})
		}
		if(typeof msg === 'string'){
			wss.clients.forEach(client => {
				client.send(msg);
			})			
		}		
	})
	
	wss.clients.forEach(client => {
		client.send('keyword: ' + keyWord);
	})

	ws.on('close', function closing(){
		console.log('stopping client');
	})


})







