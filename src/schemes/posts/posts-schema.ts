import mongoose from "mongoose";
import {ObjectId, WithId} from "mongodb";
import {TPostDb} from "../../models/posts/posts-type";


export const postsSchema = new mongoose.Schema<WithId<TPostDb>>({
    _id: { type: ObjectId, require: true},
    id: { type: String, require: true },
    title: { type: String, require: true},
    shortDescription: { type: String, require: true},
    content: { type: String, require: true},
    blogId: { type:String, require: true},
    blogName: { type: String, require: true},
    createdAt: { type: String, require: true}
})