import express from 'express'
import { body, validationResult, ContextRunner, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorEntity, ErrorWithStatus } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)

    // If there are no errors, continue to the next middleware
    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()

    const errorEntity = new ErrorEntity({ errors: {} })

    for (const key in errorsObject) {
      const { msg } = errorsObject[key]
      // If the error is not due to the validation, then pass it to the next middleware
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }

      errorEntity.errors[key] = errorsObject[key]
    }

    next(errorEntity)
  }
}
