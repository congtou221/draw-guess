<template>
	
	<canvas id="drawingBoard" width="520" height="350"></canvas>
	<div>
		<span>KeyWord:</span>
		<span id="keyword"></span>
		<button id="clean">清空画布</button>
	</div>
	
</template>

<script>

	export default {
		ready(){
			
			let wsServer = 'ws://localhost:3000/';
			let webSocket = new WebSocket(wsServer);
			let Canvas = this.draw();
			let canvas = new Canvas(webSocket);

			webSocket.onopen = () => {
				canvas.init()
			}
			webSocket.onmessage = (msg) => {
				let keywords = document.querySelector('#keyword');
				let msgArr = msg.data.split(':');
				let msgKey = msgArr[0];
				let msgVal = msgArr[1];

				if(msgKey === 'answer'){
					alert(msgVal);
				}else if(msgKey === 'position'){
					
				}else if(msgKey === 'keyword'){
					keywords.innerHTML = msgVal;
				}else if(msgKey === 'clean'){
					
				}else if(msgKey === 'end'){
					
				}else{
					throw "wrong message!";
				}

			}

		},
		methods: {
			draw() {
				return class Canvas{
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

						this.ctx.beginPath();
						this.ctx.moveTo(beginX, beginY);
						this.webSocket.send('position:beginX,' + beginX + ';beginY,' + beginY)

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

						this.webSocket.send('position:x,' + pencilX + ';y,' + pencilY );
				
					}
					drawEnd(){
						this.canvas.onmousemove = null;
						this.webSocket.send('end');
					}
					cleanBoard(){
						this.ctx.clearRect(0, 0, 520, 350);
						this.webSocket.send('clean');
					}
				}
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