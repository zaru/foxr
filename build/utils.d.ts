/// <reference types="node" />
import { writeFile } from 'fs';
import { TEvaluateArg, TJSHandleId } from './api/types';
export declare const pWriteFile: typeof writeFile.__promisify__;
export declare const MOUSE_BUTTON: {
    left: number;
    middle: number;
    right: number;
};
export declare const mapEvaluateArgs: (args: TEvaluateArg[]) => import("typeon").TJsonValue[];
export declare const getElementId: (JSHandleId: TJSHandleId) => string;
export declare function hasKey<T>(obj: T, key: any): key is keyof T;
export declare const checkPort: (host: string, port: number) => Promise<boolean>;
export declare const sleep: (timeout: number) => Promise<void>;
export declare const waitForPort: (host: string, port: number) => Promise<void>;
