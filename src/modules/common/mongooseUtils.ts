import {portalError} from './resultHandlers';
import {Document, Model} from 'mongoose';
import * as TE from 'fp-ts/lib/TaskEither';
import {PortalError} from '../../../lib';


export const createDocument = <A extends Document, B>(model: Model<A>) => (plainData: B): TE.TaskEither<PortalError[], A> =>
    TE.tryCatch<PortalError[], A>(() => model.create(plainData), portalError);

export const saveDocument = <A extends Document>(doc: A): TE.TaskEither<PortalError[], A> => TE.tryCatch<PortalError[], A>(() => doc.save(), portalError);

export const findDocumentById = <A extends Document>(model: Model<A>) => (id: string): TE.TaskEither<PortalError[], A> =>
    TE.tryCatch<PortalError[], A>(() => model.findById(id).exec(), portalError);

export const findDocumentByKey = <A extends Document, B extends keyof A>(model: Model<A>, key: B) => (keyValue: A[B]) =>
    TE.tryCatch<PortalError[], A>(() => model.findOne({[key]: keyValue}).exec(), portalError);

export const findManyDocumentsByIds = <A extends Document>(model: Model<A>) => (ids: string[]) =>
    TE.tryCatch<PortalError[], A[]>(
        () =>
            model
                .find()
                .where('_id')
                .in(ids)
                .exec(),
        portalError,
    );

// export const findManyDocumentsByIdsAdmin = <A extends Document>(model: Model<A>) => (ids: string[]): RTE.ReaderTaskEither<AccountContext, PortalError[], A[]> => (
//     context: AccountContext,
// ) =>
//     pipe(
//         context,
//         (c) => (c.level === AuthLevelEnum.ADMIN ? E.right(c) : E.left(`auth error for ${c.level} account context level`)),
//         TE.fromEither,
//         TE.mapLeft(portalError),
//         TE.chain((_) =>
//             TE.tryCatch<PortalError[], A[]>(
//                 () =>
//                     model
//                         .find()
//                         .where('_id')
//                         .in(ids)
//                         .exec(),
//                 portalError,
//             ),
//         ),
//     );
