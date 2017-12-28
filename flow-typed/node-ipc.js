declare module 'node-ipc' {
  declare export default {
    config: {
      id: string,
      silent: boolean,
    },
    connectTo: (path: string, callback: () => void) => void,
    of: { world: { on: (name: string, callback: Function ) => void } },
    serve: (path: string, callback?: () => void) => void,
    serve: (callback?: () => void) => void,
    server: {
      start: () => void,
      broadcast: (name: string, data: mixed) => void
    }
  }
}
