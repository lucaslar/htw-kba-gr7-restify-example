import { Next, Request, Response } from 'restify';
import FakeDb from '../helpers/fake-db';
import {
    getToken,
    isValidToken,
    tokenKey,
} from '../helpers/fake-token-service';

/**
 * Controller for (faked) login.
 * Passwords are expected to be <category of the won Nobel Prize>-<year>
 * See the inline documentation to get more information.
 *
 * @param req Request
 * @param res Response
 * @param next Next function
 */
export const login = (req: Request, res: Response, next: Next): void => {
    // First, the required POST data (keys) are defined
    const required = ['firstname', 'surname', 'password'];
    const keys = Object.keys(req.body);
    // If the some required key is missing...
    if (
        keys.length !== required.length ||
        keys.some((k) => !required.includes(k))
    ) {
        const reqJoin = required.join(', ');
        // Set the status of the response before sending it
        res.status(400);
        // Send a raw text containing an error message
        res.sendRaw(
            `Required body with attributes ${reqJoin}, got: ${keys.join(', ')}`
        );
    } else {
        // Otherwise...
        const { surname, firstname, password } = req.body;
        // Check if a laureate with the given first/last name exists:
        const laureate = FakeDb.laureates.find(
            (l) => l.surname === surname && l.firstname === firstname
        );
        // Check if the determined laureate has won the Nobel Prize sa determined in the password
        // (Nullish coalescing: if no laureate exists => condition is falsy)
        if (
            laureate?.prizes.some((p) => `${p.category}-${p.year}` === password)
        ) {
            // While express has res.locals for storing data, in restify, data has to be passed by
            // adding a new attribute to the req-object. This works, too. However, if used with TypeScript,
            // it has to be casted to Any before.
            (req as any).data = { laureate };

            // If the password is valid, move on to the next function
            // Convention to use "return", but only "next();" works, too!
            return next();
        } else {
            // Here, the status code and the raw text are set in one place
            res.sendRaw(
                401,
                'No laureate found with the given password (password = <prize category>-<prize year> (of the given laureate))'
            );
        }
    }
};

/**
 * Controller for generating a super secret token and sending it to the client.
 *
 * @param req Request
 * @param res Response
 */
export const generateSuperSecretToken = (req: Request, res: Response): void => {
    // Here, we know that we will receive laureate data. After casting to any again, we can read the data:
    const laureate = (req as any).data.laureate;
    const token = getToken(laureate);
    res.send({ message: `Hello, ${laureate.firstname}!`, token });
};

/**
 * Validates a token and either sends an Error to the client or moves on to the next function if valid.
 *
 * @param req Request
 * @param res Response
 * @param next Next function
 */
export const validateToken = (
    req: Request,
    res: Response,
    next: Next
): void => {
    const token = req.header(tokenKey);
    if (!token) {
        const errMsg = `No ${tokenKey} provided! You're right, this is rather an error 401. Check the application in order to understand the demo case for throwing this error.`;
        // Retuning an error with next will default to error 500:
        return next(new Error(errMsg));
    } else if (isValidToken(token)) return next();
    else return res.sendRaw(401, `No valid ${tokenKey} provided!`);
};
