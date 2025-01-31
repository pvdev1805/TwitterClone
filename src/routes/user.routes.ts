import { Router } from 'express'

const userRouter = Router()

userRouter.use(
  (req, res, next) => {
    console.log(`Time: ${Date.now()}`)
    next()
  },
  (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  }
)

userRouter.get('/tweets', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        text: 'Hello World!'
      }
    ]
  })
})

export default userRouter
