// @flow

import ipc from 'node-ipc'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, { polling: true })

let humidity = 0
let temperature = 0

bot.onText(/\/Влажность/i, msg => bot.sendMessage(msg.chat.id, `Влажность: ${humidity}%`))
bot.onText(/\/Температура/i, msg => bot.sendMessage(msg.chat.id, `Температура: ${temperature} *C`))

ipc.config.id = 'telegram'
ipc.config.silent = true
ipc.connectTo('server', () => {
  ipc.of.server.on('dht11', data => {
    ({ humidity, temperature } = data)
  })
})
