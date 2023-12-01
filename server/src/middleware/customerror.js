class ApiError extends Error {
    constructor(statusCode, message, detail) {
        super(message);
        this.statusCode = statusCode;
        this.detail = detail;
        this.name = this.constructor.name;
    };
};
module.exports = { ApiError };