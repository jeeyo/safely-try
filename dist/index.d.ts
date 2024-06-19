declare function safelyTry<T, E = Error>(fn: (((...args: any[]) => T) | (() => T)), ...args: any[]): T extends PromiseLike<any> ? Promise<{
    data: undefined;
    error: E;
}> | Promise<{
    data: Awaited<T>;
    error: undefined;
}> : {
    data: undefined;
    error: E;
} | {
    data: T;
    error: undefined;
};
export default safelyTry;
