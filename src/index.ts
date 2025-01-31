import express from 'express'
import userRouter from './routes/user.routes'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
