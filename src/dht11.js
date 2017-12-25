// @flow
import { Gpio } from 'pigpio'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function dht11(sensor: Gpio, dataCallback: (humidity: number, temperature: number) => void) {
  const data = [0, 0, 0, 0, 0]
  const bits: number[] = []
  let counter = 0
  let start = 0

  sensor.on('alert', (level, tick) => {
    if (level == 1) {
      start = tick
    } else {
      // ignore first 3 states
      counter += 1
      if (counter < 3) return
      if (tick < start) start -= 2 ** 32
      const diff = tick - start

      // 25 us
      if (diff < 50) bits.push(0)

      // 70 us
      if (diff > 50) bits.push(1)
    }

    if (bits.length == 40) {
      bits.forEach((bit, index) => {
        data[Math.floor(index / 8)] *= 2
        if (bit == 1) data[Math.floor(index / 8)] += 1
      })
      if (data.slice(0, 4).reduce((a, b) => a + b) == data[4]) {
        dataCallback(data[0] + data[1] / 100, data[2] + data[3] / 100)
      }
      counter = 0
      bits.length = 0
      data.fill(0)
    }
  })

  async function readData() {
    sensor.mode(Gpio.OUTPUT)
    sensor.digitalWrite(0)
    await sleep(18)
    sensor.trigger(40, 1)
    sensor.mode(Gpio.INPUT)
  }

  setInterval(readData, 1000)
}
