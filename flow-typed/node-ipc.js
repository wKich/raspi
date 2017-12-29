declare module 'node-ipc' {
  declare export default {
    config: {
      id: string,
      silent: boolean,
    },
    connectTo: (path: string, callback: () => void) => void,
    of: {
      [key: string]: {
        emit: (name: string, data: mixed) => void,
        on: (name: string, callback: Function ) => void
      }
    },
    serve: (path: string, callback?: () => void) => void,
    serve: (callback?: () => void) => void,
    server: {
      broadcast: (name: string, data: mixed) => void,
      on: (name: string, callback: Function) => void,
      start: () => void,
    }
  }
}
