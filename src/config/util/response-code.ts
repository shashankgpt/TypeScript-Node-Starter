/**
 * 200 OK	Successful.
 */
export const SUCCESSFUL = 200;
/**
 * 201 Created	Created.
 */
export const CREATED = 201;

/**
 * 400 Bad Request	Bad input parameter. Error message should indicate which one and why.
 */
export const BADREQUEST = 400;

/**
 * 401 Unauthorized
 * The client passed in the invalid Auth token.
 * Client should refresh the token and then try again. *
 */
export const UNAUTHORIZED = 401;

/**
 * 403 Forbidden
 *  Customer doesn’t exist. * Application not registered.
 *  Application try to access to properties not belong to an App.
 *  Application try to trash/purge root node.
 *  Application try to update contentProperties.
 *  Operation is blocked (for third-party apps). * Customer account over quota.
 */
export const FORBIDDEN = 403;

/**
 * 404 Not Found	Resource not found.
 */
export const NOTFOUND = 404;

/**
 * 405 Method Not Allowed	The resource doesn't support the specified HTTP verb.
 */
export const NOTALLOWED = 405;

/**
 * 409 Conflict	Conflict.
 */
export const CONFLICT = 405;

/**
 * 411 Length Required	The Content-Length header was not specified.
 */
export const REQUIRED = 411;

/**
 * 412 Precondition Failed	Precondition failed.
 */
export const PRECONDITIONFAILED = 412;

/**
 * 429 Too Many Requests	Too many request for rate limiting.
 */
export const TOMANAYREQUEST = 429;

/**
 * 500 Internal Server Error
 * Servers are not working as expected.
 * The request is probably valid but needs to be requested again later.
 */
export const INTERNALSERVERERROR = 500;

/**
 * 503 Service Unavailable	Service Unavailable.
 */
export const NOTAVAILABLE = 503;
