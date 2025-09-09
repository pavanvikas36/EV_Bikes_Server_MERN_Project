function errorHandler (err, req, res, next) {
    // console.log(err)
    // res.send("error")
    return res.status(err.statusCode).json({message: err.message, errors: err.errors})
}

module.exports = {errorHandler}