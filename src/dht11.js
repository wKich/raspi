// @flow
import { Gpio } from 'pigpio'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function dht11(sensor: Gpio, dataCallback: (humidity: number, temperature: number) => void) {
  // 25 us == 0
  // 70 us == 1
  // ignore first 3 states
  const data = [0, 0, 0, 0, 0]
  let counter = -3
  let start = 0

  sensor.on('alert', (level, tick) => {
    if (level == 1) {
      start = tick
    } else {
      if (counter >= 0) {
        const diff = (tick >> 0) - (start >> 0)

        data[counter / 8 | 0] <<= 1
        if (diff > 50) data[counter / 8 | 0] += 1
      }
      counter += 1
    }

    if (counter == 40) {
      if (data.slice(0, 4).reduce((a, b) => a + b) == data[4]) {
        dataCallback(data[0] + data[1] / 100, data[2] + data[3] / 100)
      }
      counter = -3
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
