import {ObjectId} from "mongodb";

// export type TBlogDb = {
//     _id: ObjectId
//     id: string
//     name: string
//     description: string
//     websiteUrl: string
//     createdAt: string
//     isMembership: boolean
// }


export type TBlogView = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}
