import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {userAuthCreateValidators, userCreateValidators} from "../validadation/user-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {body} from "express-validator";

export const usersRouter = Router({})

usersRouter.get('/',basicAuthGuardMiddleware,
    async (req: Request, res: Response) => {

        let searchLoginTerm: string | null = req.query.searchLoginTerm as any
         if(!searchLoginTerm) {
             searchLoginTerm = null
         }

        let searchEmailTerm: string | null = req.query.searchEmailTerm as any
        if(!searchEmailTerm) {
            searchEmailTerm = null
        }

        let sortBy: string = req.query.sortBy as any
        if(!sortBy) {
            sortBy = 'createdAt'
        }

        let sortDirection: 'asc' | 'desc' | undefined = req.query.sortDirection as 'asc' | 'desc' | undefined
        if(!sortDirection || sortDirection.toLowerCase() !== 'asc') {
            sortDirection = 'desc'
        }

        let pageSize: number = req.query.pageSize as any
        const checkPagSize = +pageSize

        if(!pageSize || !Number.isInteger(checkPagSize) || checkPagSize <= 0) {
            pageSize = 10
        }

        let pageNumber: number = req.query.pageNumber as any
        const checkPageNumber = +pageNumber

        if (!pageNumber || !Number.isInteger(checkPageNumber) || checkPageNumber <= 0 ) {
            pageNumber = 1
        }
      //  const adc = isNaN(Number(req.query.pageNumber)) ? 10 : Number(req.query.pageNumber)
        console.log('hellllooooo',sortBy,sortDirection,+pageSize, +pageNumber,
            searchLoginTerm, searchEmailTerm)
            const users = await usersService.findUsers(sortBy,sortDirection,+pageSize, +pageNumber,
            searchLoginTerm, searchEmailTerm)
        res.status(200).send(users)

})

// usersRouter.get('/:id', async (req: Request, res: Response) => {
//     const user = await usersService.getUserById(req.params.id)
//
//     if(user) {
//         res.status(200).send(user)
//     } else {
//         res.sendStatus(404)
//     }
//     })

// usersRouter.post('/',basicAuthGuardMiddleware,userAuthCreateValidators,inputValidationMiddleware,
//     async (req: Request, res: Response) => {
//         console.log("user creation")
//     try {
//
//         const newUser = await usersService.createUser(req.body.login,
//             req.body.password,
//             req.body.email)
//         res.status(201).send(newUser)
//     }
//     catch (error) {
//         console.error(error)
//     }
//     })

usersRouter.post('/',basicAuthGuardMiddleware,userAuthCreateValidators,inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const newUser = await usersService.createUser(req.body.login,
                req.body.password,
                req.body.email)
            res.status(201).send(newUser)
})

usersRouter.delete('/:id',basicAuthGuardMiddleware,
    async (req: Request, res: Response) => {

        const newUser = await usersService.deleteUser(req.params.id)

        if(newUser) {
            res.sendStatus(204)
        } else {

            res.sendStatus(404)
        }

    })




