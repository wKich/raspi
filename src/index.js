// @flow
import { Gpio } from 'pigpio'
import dht11 from './dht11'

function clear() {
  // The first code `\u001B[2J` instructs the terminal to clear itself,
  // and the second one `\u001B[0;0f` forces the cursor back to position 0,0.
  process.stdout.write('\u001B[2J\u001B[0;0f')
}

dht11(
  new Gpio(4, { alert: true }),
  (humidity, temperature) => {
    clear()
    console.log(`Время: ${new Date().toLocaleTimeString()}`)
    console.log(`Влажность: ${humidity}%`)
    console.log(`Температура: ${temperature} *C`)
  }
)
