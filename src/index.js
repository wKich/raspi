// @flow

import { Gpio } from 'pigpio'
import ipc from 'node-ipc'
import dht11 from './dht11'

ipc.config.id = 'dht11'
ipc.config.silent = true
ipc.connectTo('server', () => {
  dht11(
    new Gpio(4, { alert: true }),
    (humidity, temperature) => ipc.of.server.emit('data', { id: ipc.config.id, humidity, temperature })
  )
})
