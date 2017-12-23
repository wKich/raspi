// @flow
import { Gpio } from 'pigpio'
import dht11 from './dht11'

dht11(
  new Gpio(4, { alert: true }),
  (humidity, temperature) => {
    console.log(`Влажность: ${humidity}%`)
    console.log(`Температура: ${temperature} *C`)
  }
)
