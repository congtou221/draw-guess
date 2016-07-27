<template>
	<button v-if = "this.userId === 0" @click="draw">draw</button>
	<button v-if = "this.userId === 0" @click="guess">guess</button>
	
	<drawing-board v-if = "this.userId === 1"></drawing-board>
	<guessing-board v-if = "this.userId === 2"></guessing-board>

	<button v-if = "this.userId !== 0" @click="replay">replay</button>
</template>

<script>
import Vue from 'vue'

import DrawingBoard from './component/drawing-board.vue'

import GuessingBoard from './component/guessing-board.vue'

export default {
	data() {
		return {
			userId : 0
		}
	},
	methods: {
		draw() {
			this.userId = 1;
		},
		guess() {
			this.userId = 2;
		},
		replay() {
			this.userId = 0;
			location.reload();
		}
	},
	components: {
		'drawing-board' : DrawingBoard,
		'guessing-board' : GuessingBoard
	}
}
</script>