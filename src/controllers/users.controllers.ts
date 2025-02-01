import { Request, Response } from 'express'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'pvdev1805@gmail.com' && password === '123123') {
    res.json({
      message: 'Login successful'
    })

    return
  }

  res.status(400).json({
    error: 'Login failed'
  })
  return
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const result = await usersService.register({ email, password })

    // await databaseService.users.find({})

    res.json({
      message: 'Register successful',
      result
    })
    return
  } catch (error) {
    res.status(400).json({
      message: 'Register failed',
      error
    })

    return
  }
}
