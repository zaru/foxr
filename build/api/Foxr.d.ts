import Browser from './Browser';
import { TSend } from './types';
export declare type TConnectOptions = {
    host?: string;
    port?: number;
    defaultViewport?: {
        width?: number;
        height?: number;
    };
};
export declare type TLaunchOptions = {
    args?: string[];
    dumpio?: boolean;
    executablePath: string;
    headless?: boolean;
} & TConnectOptions;
declare class Foxr {
    _setViewport(send: TSend, { width, height }: {
        width: number;
        height: number;
    }): Promise<void>;
    connect(options?: TConnectOptions): Promise<Browser>;
    launch(userOptions: TLaunchOptions): Promise<Browser>;
}
export default Foxr;
