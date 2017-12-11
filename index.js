// @flow
import { Gpio } from 'pigpio'

const dht = new Gpio(4, { alert: true })
const data = Array(5)

let start = 0
let bit = -3 // Skip 3 events

dht.on('alert', (level, tick) => {
  if (level == 1) {
    start = tick
  } else {
    const diff = (tick >> 0) - (start >> 0)
    const byte = bit++ >> 3
    if (byte >= 0) data[byte] <<= 1
    //if (diff >= 20 && diff <= 30) data[byte] <<= 1
    if (diff >= 65 && diff <= 75) data[byte] += 1
  }
})

function readData() {
  data.fill(0)
  dht.mode(Gpio.OUTPUT)
  dht.digitalWrite(0)
  setTimeout(() => {
    dht.trigger(40, 1)
    dht.mode(Gpio.INPUT)
  }, 18)
}

setInterval(() => {
  readData()
  setTimeout(() => {
    bit = -3
    if (data.slice(0, -1).reduce((a, b) => a + b) == data.slice(-1)[0]) {
      console.log('----------------')
      console.log(`Влажность: ${data[0]}.${data[1]}%`)
      console.log(`Температура: ${data[2]}.${data[3]} *C`)
    } else {
      console.log('Wrong checksum')
    }
  }, 1000)
}, 2000)
