const { ApiError } = require("../middleware/customerror");

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            error: {
                status: err.statusCode,
                message: err.message,
                detail: err.detail,
            },
        });
    } else {
        console.log('unhandled error', err);
        return res.status(500).json({
            error: {
                status: 500,
                message: "server error",
                detail: "unhandled error caught",
            },
        });
    }
};

module.exports = { errorHandler };