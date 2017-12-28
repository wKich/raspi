type RISING_EDGE = 0
type FALLING_EDGE = 1
type EITHER_EDGE = 2

type INPUT = 0
type OUTPUT = 1
type ALT0 = 4
type ALT1 = 5
type ALT2 = 6
type ALT3 = 7
type ALT4 = 3
type ALT5 = 2

type PUD_OFF = 0
type PUD_DOWN = 1
type PUD_UP = 2

type Edge = RISING_EDGE | FALLING_EDGE | EITHER_EDGE
type Mode = INPUT | OUTPUT | ALT0 | ALT1 | ALT2 | ALT3 | ALT4 | ALT5
type PullUpDown = PUD_OFF | PUD_DOWN | PUD_UP

type Options = {
  alert?: boolean,
  edge?: Edge,
  mode?: Mode,
  pullUpDown?: PullUpDown,
  timeout?: number,
}

type Level = 0 | 1
type TIMEOUT = 2
type MIN_GPIO = 0
type MAX_GPIO = 53
type MAX_USER_GPIO = 31

type BANK1 = 1
type BANK2 = 2

declare module 'pigpio' {
  declare export class Gpio {
    constructor(gpio: number, options?: Options): this;
    mode(mode: Mode): this;
    getMode(): Mode;
    pullUpDown(pud: PullUpDown): this;
    digitalRead(): Level;
    digitalWrite(level: Level): this;
    trigger(pulseLen: number, level: Level): this;
    pwmWrite(dutyCycle: number): this;
    hardwarePwmWrite(frequency: number, dutyCycle: number): this;
    getPwmDutyCycle(): number;
    pwmRange(range: number): this;
    getPwmRange(): number;
    getPwmRealRange(): number;
    pwmFrequency(frequency: number): this;
    getPwmFrequency(): number;
    servoWrite(pulseWidth: number): this;
    getServoPulseWidth(): number;
    enableInterrupt(edge: Edge, timeout?: number): this;
    disableInterrupt(): this;
    enableAlert(): this;
    disableAlert(): this;
    on(event: 'alert', listener: (level: Level, tick: number) => void): this;
    on(event: 'interrupt', listener: (level: Level | TIMEOUT) => void): this;

    static INPUT: INPUT;
    static OUTPUT: OUTPUT;
    static ALT0: ALT0;
    static ALT1: ALT1;
    static ALT2: ALT2;
    static ALT3: ALT3;
    static ALT4: ALT4;
    static ALT5: ALT5;

    static TIMEOUT: TIMEOUT;
    static MIN_GPIO: MIN_GPIO;
    static MAX_GPIO: MAX_GPIO;
    static MAX_USER_GPIO: MAX_USER_GPIO;
  }

  declare export class GpioBank {
    constructor(bank?: BANK1 | BANK2): this;
    read(): number;
    set(bits: number): this;
    clear(bits: number): this;
    bank(): BANK1 | BANK2;
    bankNo: BANK1 | BANK2;

    static BANK1: BANK1;
    static BANK2: BANK2;
  }

  declare export class Notifier {}

  // declare export function hardwareRevision
  // declare export function initialize
  // declare export function terminate
  // declare export function configureClock
  // declare export function configureSocketPort

  //declare export CLOCK_PWM = 0
  //declare export CLOCK_PCM = 1
}
