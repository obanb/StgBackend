import {IO} from 'fp-ts/lib/IO';

export const getNow: IO<Date> = () => new Date();
