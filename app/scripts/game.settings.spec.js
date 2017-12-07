'use strict'
import { GameSettings, Player } from './game'

describe('Starting a game', () => {
	it('with one player', () => {
		let p1 = new Player("P1")
		let settings = new GameSettings()
		settings.addPlayer(p1)

		let game = settings.starts()
		
		expect(game.state.players.length).toEqual(1)
	})

	it('with two players', () => {
		let settings = new GameSettings()
		settings.addPlayer(new Player("P1"))
		settings.addPlayer(new Player("P2"))

		let game = settings.starts()
		
		expect(game.state.players.length).toEqual(2)
	})
})