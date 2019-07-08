/// <reference types="node" />
import { Transform } from 'stream';
import { TJsonValue } from 'typeon';
export declare const createParseStream: () => Transform;
export declare const parse: (buf: Buffer) => import("typeon").TJsonMap;
export declare const stringify: (data: TJsonValue) => string;
