const validaterMiddleware = (req, res, next) => {
        const results = validationResult(req)
        if(!results.isEmpty()){
            const err = {statusCode:400, message: "Validation error", errors: results.errors}
            next(err)
        }
        next()
    }

// module.exports = {validaterMiddleware}