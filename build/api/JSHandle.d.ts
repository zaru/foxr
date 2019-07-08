/// <reference types="node" />
import EventEmitter from 'events';
import Page from './Page';
import { TJSHandleId, TSend } from './types';
declare class JSHandle extends EventEmitter {
    _handleId: TJSHandleId | null;
    _elementId: string;
    constructor(params: {
        page: Page;
        id: TJSHandleId;
        send: TSend;
    });
}
export default JSHandle;
