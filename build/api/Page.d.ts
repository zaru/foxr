/// <reference types="node" />
import EventEmitter from 'events';
import { TJsonValue } from 'typeon';
import Browser from './Browser';
import ElementHandle from './ElementHandle';
import { TStringifiableFunction, TEvaluateArg, TSend } from './types';
import JSHandle from './JSHandle';
declare class Page extends EventEmitter {
    private _browser;
    private _id;
    private _send;
    constructor(params: {
        browser: Browser;
        id: string;
        send: TSend;
    });
    $(selector: string): Promise<ElementHandle | null>;
    $$(selector: string): Promise<ElementHandle[]>;
    $eval(selector: string, func: TStringifiableFunction, ...args: TEvaluateArg[]): Promise<TJsonValue | void>;
    $$eval(selector: string, func: TStringifiableFunction, ...args: TEvaluateArg[]): Promise<Array<TJsonValue | void>>;
    bringToFront(): Promise<void>;
    browser(): Browser;
    close(): Promise<void>;
    content(): Promise<string>;
    evaluate(target: TStringifiableFunction | string, ...args: TEvaluateArg[]): Promise<TJsonValue | void>;
    evaluateHandle(target: TStringifiableFunction | string, ...args: TEvaluateArg[]): Promise<JSHandle>;
    focus(selector: string): Promise<void>;
    goto(url: string): Promise<void>;
    screenshot(options?: {
        path?: string;
    }): Promise<Buffer>;
    setContent(html: string): Promise<void>;
    title(): Promise<string>;
    url(): Promise<string>;
    viewport(): Promise<{
        width: number;
        height: number;
    }>;
    goBack(): Promise<void>;
    goForward(): Promise<void>;
}
export default Page;
