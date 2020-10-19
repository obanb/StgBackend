import {Document, model, Model, Schema} from 'mongoose';

export interface PlainTestDocument {
    test: string
}

export interface TestDocument extends PlainTestDocument, Document {}

export const testSchema = new Schema({
    test: {
        type: String,
        required: true,
    },
});

export const testModel: Model<TestDocument> = model<TestDocument>('test', testSchema, 'tests');
