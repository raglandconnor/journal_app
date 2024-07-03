class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}
/**
 * Status code: 401
 */
export class UnauthorizedErr extends HttpError {}

/**
 * Status code: 409
 */
export class ConflictErr extends HttpError {}

/**
 * Status code: 400
 */
export class MissingParamsErr extends HttpError {}
