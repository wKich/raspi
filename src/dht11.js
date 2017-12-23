// @flow
import { Gpio } from 'pigpio'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function dht11(sensor: Gpio, dataCallback: (humidity: number, temperature: number) => void) {
  const data = [0, 0, 0, 0, 0]
  let seq = 0
  let start = 0

  sensor.on('alert', (level, tick) => {
    if (level == 1) {
      start = tick
    } else {
      if (tick < start) start -= 2 ** 32
      const diff = tick - start

      // 0
      if (diff >= 20 && diff <= 30) {
        data[seq % 8] *= 2
        seq += 1
      }

      // 1
      if (diff >= 65 && diff <= 75) {
        data[seq % 8] += 1
        seq += 1
      }
    }

    if (seq == 40) {
      if (data.slice(0, 4).reduce((a, b) => a + b) == data[4]) {
        dataCallback(data[0] + data[1] / 100, data[2] + data[3] / 100)
      }
      seq = 0
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

  setTimeout(readData, 1000)
}
