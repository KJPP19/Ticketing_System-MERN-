const asyncHandler = (controllerFunc) => async (req, res, next) => {
    try {
        await controllerFunc(req, res, next);
    } catch(error) {
        return next(error);
    }
};

module.exports = {asyncHandler};