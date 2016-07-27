<template>
	<canvas id="guessingBoard" width="520" height="350"></canvas>
	<div>
		<input type="text" id="answer"/><button id="submitBtn">Submit Answer</button>
	</div>
</template>

<script>
	export default {
		data(){
			return {}
		},	
		ready(){
			const wsServer = 'ws://localhost:3000/';
			const webSocket = new WebSocket(wsServer);
			this.canvas = document.getElementById('guessingBoard');
			this.ctx = this.canvas.getContext('2d');

			webSocket.onmessage = (msg) => {
				let msgArr = msg.data.split(':');
				let msgKey = msgArr[0];
				let msgVal = msgArr[1];

				if(msgKey === 'answer'){
					alert(msgVal);
				}else if(msgKey === 'position'){
					this.repeat(msgVal);
				}else if(msgKey === 'keyword'){
					
				}else if(msgKey === 'clean'){
					this.cleanBoard(webSocket);
				}else if(msgKey === 'end'){
					this.endRepeat();
				}
				else{
					throw "wrong message!";
				}
				
			}

			let submitBtn = document.querySelector('#submitBtn');
			
			submitBtn.onclick = () => {
				this.checkAnswer(webSocket);
			}
		},
		methods: {

			repeat(msg) {
				let pencilCoord = msg.split(';');
				let pencilX = pencilCoord[0].split(',');
				let pencilY = pencilCoord[1].split(',');

				if(pencilX[0] === 'beginX' && pencilY[0] === 'beginY'){
					this.beginX = pencilX[1];
					this.beginY = pencilY[1];

					this.beginRepeat();
					return;
				}

				this.x = pencilX[1];
				this.y = pencilY[1];
				this.repeating();
			},
			beginRepeat() {
				let ctx = this.ctx;

				ctx.beginPath();
				ctx.moveTo(this.beginX, this.beginY);

			},
			repeating() {
				let ctx = this.ctx;

				ctx.lineTo(this.x, this.y);
				ctx.stroke();
			},
			endRepeat() {
				let ctx = this.ctx;
				ctx.onmousemove = null;
			},
			checkAnswer(ws) {
				let answer = document.querySelector('#answer').value.toLowerCase();
				ws.send(answer);
			},
			cleanBoard(ws){
				this.ctx.clearRect(0, 0, 520, 350);
			}			
		}
	}
</script>

<style>
#guessingBoard{
	background-color: pink;
}
</style>