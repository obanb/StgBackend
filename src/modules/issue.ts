import * as t from 'io-ts';

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

export const issue = t.interface({
    _tag: t.literal('issue'),
    name: issueName,
    desc: issueDesc,
});

export type Issue = t.TypeOf<typeof issue>;
