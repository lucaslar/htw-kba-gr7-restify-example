import { Request, Response, Next } from 'restify';
import FakeDb from '../helpers/fake-db';
import { BadRequestError } from 'restify-errors';

/**
 * Controller for sending a random Nobel prize to the client.
 *
 * @param req Request
 * @param res Response
 */
export const randomNobelPrize = (req: Request, res: Response): void => {
    // If there is no error, `send(...)` defaults to code 200.
    res.send(FakeDb.prizes[Math.floor(Math.random() * FakeDb.prizes.length)]);
};

/**
 * Controller for sending a random Nobel Prize of a given category (case insensitive) to the client.
 * Case 1: Category does not exist => Bad Request Error
 * Case 2: Category exists => Determine Nobel Prize of category and emit data
 *
 * @param req Request
 * @param res Response
 * @param next Next function (in this context, called with error if necessary)
 */
export const randomNobelPrizeInCategory = (
    req: Request,
    res: Response,
    next: Next
): void => {
    // Get the route param `category` (to lower case)
    const cat = req.params.category.toLowerCase();

    // If the category does not exist in the fake database:
    if (!FakeDb.categories.includes(cat)) {
        const catList = FakeDb.categories.join(', ');
        const errMsg = `Unknown category '${cat}'! Must be one of: ${catList}`;
        const err = new BadRequestError(errMsg);
        // Sends a Bad Request error (400) to the client
        next(err);
        // Same as:
        // res.send(400, err);
    } else {
        // Otherwise...
        const prizes = FakeDb.prizes.filter((p) => p.category === cat);
        const randomNr = Math.floor(Math.random() * prizes.length);
        res.send(prizes[randomNr]);
    }
};
