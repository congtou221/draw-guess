<template>
	<canvas id="guessingBoard" width="520" height="350"></canvas>
	<div>
		<input type="text" /><button id="submitBtn">Submit Answer</button>
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
				this.repeat(msg);
			}

			let submitBtn = document.querySelector('#submitBtn');
			submitBtn.onclick = () => {
				this.checkAnswer();
			}
		},
		methods: {

			repeat(msg) {
				let pencilCoord = msg.data.split(',');
				let pencilX = pencilCoord[0].split(':');
				let pencilY = pencilCoord[1].split(':');

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
				ctx.lineTo(this.x, this.y);
			},
			checkAnswer() {

			}
		}
	}
</script>

<style>
#guessingBoard{
	background-color: pink;
}
</style>