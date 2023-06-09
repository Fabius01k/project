import {blogsCollection, client} from "../db/db";
import {TBlogDb, TBlogView} from "../models/blogs/blogs-type";
import {ObjectId} from "mongodb";
import {blogsRepository} from "../repositories-db/blogs-repository-db";
import {TPostDb, TPostView} from "../models/posts/posts-type";
import {postsRepository} from "../repositories-db/post-repostory-db";

export let blogs: TBlogDb[] = []
export const blogsService = {

    async findBlogs(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number,searchNameTerm: string | null) {
        return blogsRepository.findBlogs(
            sortBy,sortDirection,pageSize,pageNumber,searchNameTerm
        )
    },

    async findPostByBlogID(sortBy: string,sortDirection: 'asc' | 'desc',
                           pageSize: number,pageNumber: number,blogId: string) {
        return postsRepository.findPostsByBlogId(sortBy,sortDirection,pageSize,pageNumber,blogId
        )

    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<TBlogView> {

        const dateNow = new Date().getTime().toString()
        const newBlog: TBlogDb = {
            _id: new ObjectId(),
            id: dateNow,
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const createdBlogService = await blogsRepository.createBlog(newBlog)

        return createdBlogService
    },

    async createPostByBlogID(title: string, shortDescription: string, content: string,
                         blogId: string): Promise<TPostView | null> {
        const dateNow = new Date().getTime().toString()
        const blog = await blogsCollection.findOne({id: blogId})

        if (!blog) {
            return null
        }
        const newPost: TPostDb = {
            _id: new ObjectId(),
            id: dateNow,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),

        }
        const createdPostService = await postsRepository.createPostByBlogId(newPost)

        return createdPostService

    },

    async getBlogById(id: string): Promise<TBlogView | null> {
        return blogsRepository.getBlogById(id)
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlog(id,name,description,websiteUrl)
    },

    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    }
}
