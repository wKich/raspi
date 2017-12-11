type Edge = 'RISING_EDGE' | 'FALLING_EDGE' | 'EITHER_EDGE'
type Mode = 'INPUT' | 'OUTPUT' | 'ALT0' | 'ALT1' | 'ALT2' | 'ALT3' | 'ALT4' | 'ALT5'
type PullUpDown = 'PUD_OFF' | 'PUD_DOWN' | 'PUD_UP'

type Options = {
  alert?: boolean,
  edge?: Edge,
  mode?: Mode,
  pullUpDown?: PullUpDown,
  timeout?: number,
}

type Level = 0 | 1
type TIMEOUT = 2

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

    static INPUT: 'INPUT';
    static OUTPUT: 'OUTPUT';
    static ALT0: 'ALT0';
    static ALT1: 'ALT1';
    static ALT2: 'ALT2';
    static ALT3: 'ALT3';
    static ALT4: 'ALT4';
    static ALT5: 'ALT5';

    static TIMEOUT: TIMEOUT;
    static MIN_GPIO: number;
    static MAX_GPIO: number;
    static MAX_USER_GPIO: number;
  }
}
