import * as t from 'io-ts';
import {ObjectID} from 'mongodb';

export const issueName = t.brand(
    t.string,
    (
        n,
    ): n is t.Branded<
        string,
        {
            readonly issueName: unique symbol;
        }
    > => n.length > 2 && n.length < 50,
    'issueName',
);

export const issueDesc = t.brand(
    t.string,
    (
        n,
    ): n is t.Branded<
        string,
        {
            readonly issueDesc: unique symbol;
        }
    > => n.length > 5 && n.length < 100,
    'issueDesc',
);

export const issueRaw = t.interface({
    _tag: t.literal('issueRaw'),
    name: issueName,
    desc: issueDesc,
});

export const issuePopulated = t.interface({
    _tag: t.literal('issuePopulated'),
    name: issueName,
    desc: issueDesc,
});

export type IssueRaw = t.TypeOf<typeof issueRaw> & {owner: ObjectID};
