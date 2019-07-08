/// <reference types="node" />
import EventEmitter from 'events';
import { TJsonMap, TJsonValue } from 'typeon';
export declare type TMarionetteError = {
    error: string;
    message: string;
    stacktrace: string;
};
declare class Marionette extends EventEmitter {
    private globalId;
    private queue;
    private socket;
    private isManuallyClosed;
    constructor();
    connect(host: string, port: number): Promise<void>;
    disconnect(): void;
    send(name: string, params?: TJsonMap, key?: string): Promise<TJsonValue>;
}
export default Marionette;
