import { Strategy } from 'passport-jwt';
interface JwtPayload {
    sub: number;
    username: string;
    role: string;
    memberId: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): {
        id: number;
        username: string;
        role: string;
        memberId: number;
    };
}
export {};
