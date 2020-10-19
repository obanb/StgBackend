import {Errors} from 'io-ts';
import * as T from 'fp-ts/lib/Task';
import {NextFunction, Request, Response} from 'express';
import * as HttpStatus from 'http-status-codes';
import {factory, logger} from './logger';
import {PortalError, PortalErrorType} from '../../../lib';

const log = logger(factory.getLogger('resultHandlers'));

export const toPortalErrors = (messages: string[]): PortalError[] =>
    messages.map((msg) => {
        return {
            type: PortalErrorType.ERROR,
            body: msg,
            message: msg,
        } as PortalError;
    });

export const portalError = <A>(message: A): PortalError[] => {
    console.log(message);
    return [
        {
            body: JSON.stringify(message),
            message: JSON.stringify(message),
            type: PortalErrorType.ERROR,
        },
    ];
};

// export const contextPortalError = <A>(message: A) => (context: AccountContext): PortalError[] => {
//     console.log(message);
//     return [
//         {
//             body: JSON.stringify(message),
//             message: JSON.stringify(`${message} caused by ${context.account}`),
//             type: PortalErrorType.ERROR,
//         },
//     ];
// };

export interface PortalResult<A> {
    result: A | undefined;
    errors: PortalError[] | undefined;
}

export const successResult = <A>(data: A): PortalResult<A> => {
    return {
        result: data,
        errors: undefined,
    };
};

export const errorResult = (errors: PortalError[]): PortalResult<undefined> => {
    return {
        errors,
        result: undefined,
    };
};

export const successResultP = <A>(data: A): T.Task<PortalResult<A>> => {
    return () =>
        Promise.resolve({
            result: data,
            errors: undefined,
        });
};

export const successResultStatusTask = <A>(response: Response) => (data: A): T.Task<Response> => {
    return () => Promise.resolve(response.json(data));
};

export const errorResultP = (errors: PortalError[]): T.Task<PortalResult<undefined>> => {
    return () =>
        Promise.resolve({
            errors,
            result: undefined,
        });
};

export const errorResultStatusTask = <A>(response: Response) => (errors: PortalError[]): T.Task<Response> => {
    log.info(`error: ${JSON.stringify(errors)}`)();
    return () => Promise.resolve(response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errors));
};

export const fromIOErrors = (errors: Errors): PortalError[] =>
    errors.map((error) => {
        return {
            message: JSON.stringify(error),
            body: JSON.stringify(error),
            type: PortalErrorType.ERROR,
        } as PortalError;
    });
