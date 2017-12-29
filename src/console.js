// @flow

import ipc from 'node-ipc'

function clear() {
  // The first code `\u001B[2J` instructs the terminal to clear itself,
  // and the second one `\u001B[0;0f` forces the cursor back to position 0,0.
  process.stdout.write('\u001B[2J\u001B[0;0f')
}

ipc.config.id = 'console'
ipc.config.silent = true
ipc.connectTo('server', () => {
  ipc.of.server.on('dht11', ({ humidity, temperature }: { humidity: number, temperature: number}) => {
    clear()
    console.log(`Время: ${new Date().toLocaleTimeString()}`)
    console.log(`Влажность: ${humidity}%`)
    console.log(`Температура: ${temperature} *C`)
  })
})
