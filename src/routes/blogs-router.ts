import {Request, Response, Router} from "express";
// import {blogsRepository} from "../repositories-in-memory/blogs-repository";
import {blogsRepository} from "../repositories-db/blogs-repository-db";
import {validationResult} from "express-validator";
import {blogCreateValidators, blogUpdateValidators} from "../validadation/blog-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {inputValidationMiddleware} from "../validadation/input-validation-middleware";
import {blogsService} from "../domain/blogs-service";


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs = await blogsService.findBlogs()
    res.status(200).send(blogs)

})

blogsRouter.post('/', basicAuthGuardMiddleware, blogCreateValidators, inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const newBlog = await blogsService.createBlog(req.body.name,
            req.body.description,
            req.body.websiteUrl)
        res.status(201).send(newBlog)

    })

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const blog = await blogsService.getBlogById(req.params.id)

    if (blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }

})

blogsRouter.put('/:id', basicAuthGuardMiddleware, blogUpdateValidators, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blog = await blogsService.updateBlog(
            req.params.id,
            req.body.name,
            req.body.description,
            req.body.websiteUrl)

        if (blog) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })

blogsRouter.delete('/:id', basicAuthGuardMiddleware,
    async (req: Request, res: Response) => {

        const newBlogs = await blogsService.deleteBlog(req.params.id)

        if (newBlogs) {

            res.sendStatus(204)
        } else {

            res.sendStatus(404)
        }

    })























