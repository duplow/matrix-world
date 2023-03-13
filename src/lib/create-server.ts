import dgram from 'node:dgram'
import { EventEmitter } from 'events'
import { v4 as uuid } from 'uuid'

export type ServerOptions = {
  address?: string
  port?: number
}

export type PlayerPosition = {
  x: number,
  y: number,
  z: number,
}

export type PlayerBars = {
  hp: number, // Life
  mp: number, // Magic
  sp: number, // Stamina
  str: number, // Strengh
  spd: number // Speed
}

export type PlayerStats = {
  id: string,
  name: string,
  race: string,
  alive: boolean,
  position: PlayerPosition,
  direction: number,
  days: number, // Number of days alive
  exp: number, // Expirence
  max: PlayerBars,
  current: PlayerBars
}

export enum ClientCommand {
  REGISTER = 'REGISTER',
  MOVE = 'MOVE',
  ATTACK = 'ATTACK',
  DEFEND = 'DEFEND',
  CHANGE_DIRECTION = 'CHANGE_DIRECTION',
  COLLECT_ITEM = 'COLLECT_ITEM',
  USE_SKILL = 'USE_SKILL',
  USE_ITEM = 'USE_ITEM',
  DISTRIBUTE_SKILL_POINTS = 'DISTRIBUTE_SKILL_POINTS'
}

export enum ServerCommand {
  EXP = 'EXP', // +EXP
  HEAL = 'HEAL', // +LIFE
  DAMAGE = 'DAMAGE', // -LIFE
  DEBUFF = 'DEBUFF', // -STAT
  BUFF = 'BUFF', // +STAT
  DEAD = 'DEAD'
}

const defaultStats: PlayerBars = {
  hp: 100,
  mp: 70,
  sp: 100,
  str: 10,
  spd: 2
}

export type Connection = {
  playerId: string,
  connectionId: string
} 

const createMap = (width: number, height: number) => {
  return (new Array(height)).fill([]).map(() => {
    return new Array(width).fill(0)
  })
}

export const createServer = (options: ServerOptions) => {
  const udp = dgram.createSocket('udp4')
  const eventEmitter = new EventEmitter()
  const stage = createMap(50, 50)
  const players: PlayerStats[] = []
  const connections: Connection[] = []

  const sendMessage = (message, address: string, port: number) => {
    // TODO: Code here
    udp.send(message, port, address)
  }

  const _sendWorldMessage = (message) => {
    // TODO: Code here
  }

  eventEmitter.on('ready', () => {
    console.log('Server ready for receive messages!')
  })

  udp.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`)
    udp.close()
  });

  udp.on('message', (msg, rinfo) => {
    const content = msg.toString('utf-8')
    console.log(`server got: ${content} from ${rinfo.address}:${rinfo.port}`)

    if (content.startsWith(ClientCommand.REGISTER)) {
      const playerId = 'p:' + uuid()
      const connectionId = 'c:' + uuid()

      const newPlayer = {
        id: playerId,
        name: `Player ${players.length + 1}`,
        race: 'human',
        alive: true,
        position: {
          x: Math.round(Math.random() * 50),
          y: Math.round(Math.random() * 50),
          z: 0,
        },
        direction: 0,
        days: 0,
        exp: 0,
        max: defaultStats,
        current: defaultStats,
      }

      connections.push({
        connectionId: connectionId,
        playerId
      })

      players.push(newPlayer)
      sendMessage(`REGISTRED ${connectionId}`, rinfo.address, rinfo.port)
      console.log('A new player connected')
    }

    if (content.startsWith(ClientCommand.MOVE)) {
      sendMessage(`MOVED`, rinfo.address, rinfo.port)
      console.log('Moved')
    }
  });

  udp.on('listening', () => {
    console.log('Server is ready!')
  
    const address = udp.address()
    console.log(`server listening ${address.address}:${address.port}`)
  });


  return {
    on: function (eventName, listener) {
      eventEmitter.on(eventName, listener)
      return this
    },
    start: function () {
      udp.bind(options.port || 53, options.address)
      return this
    },
    close: function () {
      udp.close()
      return this
    }
  }
}