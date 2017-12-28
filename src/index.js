// @flow
import { Gpio } from 'pigpio'
import ipc from 'node-ipc'
import dht11 from './dht11'

ipc.config.id = 'dht11'
ipc.config.silent = true
ipc.serve(() => {
  console.log('DHT11 server was started')
  dht11(
    new Gpio(4, { alert: true }),
    (humidity, temperature) => ipc.server.broadcast('data', { humidity, temperature })
  )
})
ipc.server.start()
