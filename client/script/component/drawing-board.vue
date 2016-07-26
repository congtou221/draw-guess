<template>
	
	<canvas id="drawingBoard" width="520" height="350"></canvas>
	<div>
		<span>KeyWord:</span>
		<span id="keyword"></span>
	</div>
	<button id="clean">清空画布</button>
</template>

<script>

	class Draw{
		constructor(ws){
			this.canvas = document.getElementById('drawingBoard');
			this.ctx = this.canvas.getContext('2d');
			this.webSocket = ws;
			this.stageInfo = this.canvas.getBoundingClientRect();
			this.cleanBtn = document.getElementById('clean');
		}
		init(){

			this.canvas.onmousedown = () => {
				this.drawBegin(event)
			};

			this.canvas.onmouseup = () => {
				this.drawEnd()
			};

			this.cleanBtn.onclick = () => {
				this.cleanBoard()
			};
		}
		drawBegin(e){
			let stageLeft = this.stageInfo.left;
			let stageTop = this.stageInfo.top;
			let beginX = e.clientX - stageLeft;
			let beginY = e.clientY - stageTop;

			this.webSocket.send('begin to draw');

			this.ctx.beginPath();
			this.ctx.moveTo(beginX, beginY);
			this.webSocket.send('beginX:' + beginX + ',beginY:' + beginY)

			this.canvas.onmousemove = () => {
				this.drawing(event)
			};			
		}
		drawing(e){
			let stageLeft = this.stageInfo.left;
			let stageTop = this.stageInfo.top;
			let pencilX = e.clientX - stageLeft;
			let pencilY = e.clientY - stageTop; 

			this.ctx.lineTo(pencilX, pencilY);
			this.ctx.stroke();

			this.webSocket.send('x:' + pencilX + ',y:' + pencilY );
	
		}
		drawEnd(){
			this.canvas.onmousemove = null;
		}
		cleanBoard(){
			this.ctx.clearRect(0, 0, 520, 350);
		}
	}
	export default {
		ready(){
			
			let wsServer = 'ws://localhost:3000/';
			let webSocket = new WebSocket(wsServer);
			let canvas = new Draw(webSocket);

			webSocket.onopen = () => {
				canvas.init()
			}
			webSocket.onmessage = (msg) => {
				let keywords = document.querySelector('#keyword');
				let msgArray = msg.data.split(':');

				keywords.innerHTML = msgArray[0] === 'keyword' && msgArray[1];

			}

		}
	}
</script>

<style>
#drawingBoard{
	background-color: blue;
	cursor: crosshair;
}
</style>