import {TUserDb} from "../models/users/users-type";
import * as jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {ObjectId} from "mongodb";


export const jwtService = {

    async createJWT(user: TUserDb) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }
    },
}
