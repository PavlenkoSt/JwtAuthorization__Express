class ApiError extends Error {

    errors;
    status;

    constructor (status, message, errors) {
        super(message);
        this.errors = errors;
        this.status = status;
    }

    static unautorizedError () {
        return new ApiError(401, 'Вы не авторизованы');
    }

    static badRequest (message, errors = []) {
        return new ApiError(400, message, errors);
    }
}