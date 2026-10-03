import { Router } from 'express'
import { recommendedMovies } from '../controller'

export const recommendRouter = Router()

recommendRouter.post("/", recommendedMovies)


