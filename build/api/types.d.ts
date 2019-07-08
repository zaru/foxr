import { TJsonValue } from 'typeon';
import JSHandle from './JSHandle';
import ElementHandle from './ElementHandle';
import Marionette from '../Marionette';
export declare type TStringifiableFunction = (...args: Array<TJsonValue | Element>) => TJsonValue | Promise<TJsonValue> | void;
export declare type TJSHandleId = {
    [key: string]: string;
};
export declare type TEvaluateArg = TJsonValue | JSHandle | ElementHandle;
export declare type TEvaluateResult = {
    error: string | null;
    value: TJsonValue | void;
};
export declare type TEvaluateHandleResult = {
    error: string | null;
    value: TJSHandleId | null;
};
export declare type TEvaluateResults = {
    error: string | null;
    value: TJsonValue[] | void[];
};
export declare type TMouseButton = 'left' | 'middle' | 'right';
export declare type TClickOptions = {
    button?: TMouseButton;
    clickCount?: number;
};
export declare type TSend = Marionette['send'];
export declare type TInstallAddonResult = {
    value: string | null;
};
