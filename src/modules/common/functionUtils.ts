import {Request} from 'express';
import * as IO from 'fp-ts/lib/IO';

const mapIO = <A>(extractFn: (request: Request) => A) => (request: Request): IO.IO<A> => {
    return () => extractFn(request);
};
