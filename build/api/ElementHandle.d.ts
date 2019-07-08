/// <reference types="node" />
import Page from './Page';
import { TJSHandleId, TClickOptions, TSend } from './types';
import JSHandle from './JSHandle';
declare class ElementHandle extends JSHandle {
    private _page;
    private _send;
    private _actionId;
    constructor(params: {
        page: Page;
        id: TJSHandleId;
        send: TSend;
    });
    private _scrollIntoView;
    $(selector: string): Promise<ElementHandle | null>;
    $$(selector: string): Promise<ElementHandle[]>;
    click(userOptions?: TClickOptions): Promise<void>;
    focus(): Promise<void>;
    hover(): Promise<void>;
    press(key: string): Promise<void>;
    screenshot(options?: {
        path?: string;
    }): Promise<Buffer>;
    type(text: string): Promise<void>;
}
export default ElementHandle;
