'use strict'
import { GameSettings, Player } from './game'

jest.useFakeTimers()

var p1 = new Player('P1')
var p2 = new Player('P2')

describe('A Game', () => {
	it('is won when Player is alone', () => {
		let game = aGameWithPlayers([p1]).starts()

		jest.runTimersToTime(15)
		
		expect(game.running).toBeFalsy()
		expect(game.state.winners).toContain(p1)
	})
	
	it('should run when started', () => {
		let game = aGameWithTwoPlayers().starts()
		
		let runSpied = jest.spyOn(game, 'run')
		jest.runTimersToTime(15 * 2)
		
		expect(runSpied).toHaveBeenCalledTimes (2)
	})
	
	it('is won when a player meets victory conditions', () => {
		let game = aGameWithTwoPlayers().isWonWhen(player => player.name.startsWith('P1')).starts()
		
		jest.runTimersToTime(15)
		
		expect(game.running).toBeFalsy()
		expect(game.state.winners).toContain(p1)
	})
	
	it('is won by multiple players when both meets victory conditions', () => {
		let game = aGameWithTwoPlayers().isWonWhen(player => player.name.startsWith('P')).starts()
		
		jest.runTimersToTime(15)
		
		expect(game.running).toBeFalsy()
		expect(game.state.winners).toContain(p1)
		expect(game.state.winners).toContain(p2)
	})

})

function aGameWithTwoPlayers(){
	return aGameWithPlayers([p1, p2])
}

function aGameWithPlayers(players){
	let gameSettings = new GameSettings()
	for (let player of players) {
		gameSettings.addPlayer(player)
	}
	return gameSettings
}