/**
 * APIリクエストモジュール
 */
import { AuthClient } from './auth/authClient';
export interface IParams {
    uri: string;
    baseUrl: string;
    form?: any;
    auth?: AuthClient;
    qs?: any;
    method: string;
    headers?: {
        [key: string]: any;
    };
    body?: any;
    expectedStatusCodes: number[];
}
