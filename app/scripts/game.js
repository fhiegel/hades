'use strict'
// https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-element-canvas
// https://www.w3schools.com/graphics/game_canvas.asp

export class GameSettings {
	constructor () {
		this._players = []
		this._victoryConditions = undefined
	}

	addPlayer (player) {
		return this._players.push(player);
	}

	starts () {
		return new Game({
			players: this._players,
			victoryConditions: this._victoryConditions
		}).play();
	}
	
	isWonWhen (predicate) {
		this._victoryConditions = predicate
		return this
	}
}

export class Game {
	constructor (options) {
		let {players = [], winners = [], 
			victoryConditions = player => this.state.players.length == 1, 
			states=[],
			running = false, runningLock = {},speedInterval=15} = options
		this.state = new GameState({
			players: players,
			winners: winners
		});
		this.states = states
		this.victoryConditions = victoryConditions
		this.running = running
		this.runningLock = runningLock
		this.speedInterval = speedInterval
	}

	play() {
		this.running = true;
		this.runningLock = setInterval(() => this.run(), this.speedInterval)
		return this;
	}

	stop() {
		this.running = false
		clearInterval(this.runningLock)
		return this;
	}
	
	run() {
		if (this.running) {
			this.update();
		}
	}
	
	update() {
		this.checkVictoryConditions();
		this.states.push(this.state)
	}
	
	checkVictoryConditions () {
		for (let player of this.state.players) {
			if (this.victoryConditions (player)) {
				this.state = this.state.addWinner(player)
			}
		}
		if (this.state.winners.length > 0) {
			this.stop()
		}
	}

}

export class GameState {
	constructor (previous) {
		let {players = [], winners = []} = previous
		this.players = players
		this.winners = winners
	}

	addWinner(winner) {
		return new GameState ({
				players: this.players,
				winners: [winner, ...this.winners]
			})
	}

}

export class Player {
	constructor (name) {
		this.name = name;
	}
}
