// @flow

import ipc from 'node-ipc'

ipc.config.id = 'server'
ipc.config.silent = true
ipc.serve(() => {
  ipc.server.on('data', data => {
    ipc.server.broadcast(data.id, data)
  })
})
ipc.server.start()
