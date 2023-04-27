import {blogs} from "./blogs-repository-db";
import {blogsCollection, client, postsCollection} from "../db/db";
import {TPostDb, TPostView} from "../models/posts/posts-type";
import {ObjectId} from "mongodb";


type TVposts = {

    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export let posts: TVposts[] = []

const mapPostFromDbView = (post: TPostDb): TPostView => {
    return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}

export const postsRepository = {

    async findPosts(): Promise<TPostView[]> {
        const posts: TPostDb[] = await postsCollection.find().toArray()

        return posts.map(p => mapPostFromDbView(p))
    },

    async createPost(newPost: TPostDb): Promise<TPostView | null> {

        await postsCollection.insertOne(newPost)

        return mapPostFromDbView(newPost)


    },

    async getPostById(id: string): Promise<TPostView | null> {
        const post: TPostDb | null = await postsCollection.findOne({id: id})
        if(!post) return null

        return mapPostFromDbView(post)

    },

    async updatePost(id: string, title: string, shortDescription: string, content: string,
                     blogId: string): Promise<boolean | null> {
        const blog = await blogsCollection.findOne({id: blogId})

        if (!blog) {
            return null
        }
        const updatePostPromise = await postsCollection.
        updateOne({id: id}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blog.name,
            },
        })
        const post = updatePostPromise.matchedCount === 1
        return post
    },

    async deletePost(id: string): Promise<boolean> {
        const deletePostPromise = await postsCollection.
        deleteOne({id: id})

        return deletePostPromise.deletedCount === 1

    }
}