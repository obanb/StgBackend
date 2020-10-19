import {Semigroup} from 'fp-ts/lib/Semigroup';
import {Monad2C} from 'fp-ts/lib/Monad';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';

export const taskEitherLeftConcat = <TError>(semi: Semigroup<TError[]>): Monad2C<typeof TE.URI, TError[]> => ({
    URI: TE.URI,
    _E: undefined as any,
    map: TE.taskEither.map, // (TaskEither<TError,A>,fn(A => B) => TaskEither<TError,B>
    of: TE.taskEither.of, // (A) => TaskEither<TError, A>
    ap: (mab, ma) => () =>
        Promise.all([mab(), ma()]).then(([f, val]) =>
            E.isLeft(f) ? (E.isLeft(val) ? E.left(semi.concat(f.left, val.left)) : f) : E.isLeft(val) ? val : E.right(f.right(val.right)),
        ),
    chain: TE.taskEither.chain,
});

export const getSemigroupArray = <A>(): Semigroup<A[]> => ({
    concat: (x, y) => [...x, ...y],
});