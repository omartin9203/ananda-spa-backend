import { Document } from 'mongoose';

export class ResourceModel extends Document {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static ModelName: string;
}
