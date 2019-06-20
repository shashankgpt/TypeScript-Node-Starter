/**
 * 200 OK	Successful.
 */
export const SUCCESSFUL: Readonly<number> = 200;
/**
 * 201 Created	Created.
 */
export const CREATED: Readonly<number> = 201;

/**
 * 400 Bad Request	Bad input parameter. Error message should indicate which one and why.
 */
export const BADREQUEST: Readonly<number> = 400;

/**
 * 401 Unauthorized
 * The client passed in the invalid Auth token.
 * Client should refresh the token and then try again. *
 */
export const UNAUTHORIZED: Readonly<number> = 401;

/**
 * 403 Forbidden
 *  Customer doesn’t exist. * Application not registered.
 *  Application try to access to properties not belong to an App.
 *  Application try to trash/purge root node.
 *  Application try to update contentProperties.
 *  Operation is blocked (for third-party apps). * Customer account over quota.
 */
export const FORBIDDEN: Readonly<number> = 403;

/**
 * 404 Not Found	Resource not found.
 */
export const NOTFOUND: Readonly<number> = 404;

/**
 * 405 Method Not Allowed	The resource doesn't support the specified HTTP verb.
 */
export const NOTALLOWED: Readonly<number> = 405;

/**
 * 409 Conflict	Conflict.
 */
export const CONFLICT: Readonly<number> = 405;

/**
 * 411 Length Required	The Content-Length header was not specified.
 */
export const REQUIRED: Readonly<number> = 411;

/**
 * 412 Precondition Failed	Precondition failed.
 */
export const PRECONDITIONFAILED: Readonly<number> = 412;

/**
 * 429 Too Many Requests	Too many request for rate limiting.
 */
export const TOMANAYREQUEST: Readonly<number> = 429;

/**
 * 500 Internal Server Error
 * Servers are not working as expected.
 * The request is probably valid but needs to be requested again later.
 */
export const INTERNALSERVERERROR: Readonly<number> = 500;

/**
 * 503 Service Unavailable	Service Unavailable.
 */
export const NOTAVAILABLE: Readonly<number> = 503;
