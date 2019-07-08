/// <reference types="node" />
import EventEmitter from 'events';
import Page from './Page';
import { TSend } from './types';
declare class Browser extends EventEmitter {
    private _send;
    constructor(arg: {
        send: TSend;
    });
    close(): Promise<void>;
    disconnect(): Promise<void>;
    install(path: string, isTemporary: boolean): Promise<string | null>;
    newPage(): Promise<Page>;
    pages(): Promise<Page[]>;
    uninstall(id: string): Promise<void>;
}
export default Browser;
