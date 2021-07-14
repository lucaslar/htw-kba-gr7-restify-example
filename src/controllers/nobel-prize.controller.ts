import { Request, Response, Next } from 'restify';
import FakeDb from '../helpers/fake-db';
import { BadRequestError } from 'restify-errors';

export const randomNobelPrize = (req: Request, res: Response): void => {
    const randomNr = Math.floor(Math.random() * FakeDb.prizes.length);
    res.send(FakeDb.prizes[randomNr]);
};

export const randomNobelPrizeInCategory = (
    req: Request,
    res: Response,
    next: Next
): void => {
    const cat = req.params.category.toLowerCase();
    if (!FakeDb.categories.includes(cat)) {
        const catList = FakeDb.categories.join(', ');
        const errMsg = `Unknown category '${cat}'! Must be one of: ${catList}`;
        const err = new BadRequestError(errMsg);
        next(err);
        // Same as:
        // res.send(400, err);
    } else {
        const prizes = FakeDb.prizes.filter((p) => p.category === cat);
        const randomNr = Math.floor(Math.random() * prizes.length);
        res.send(prizes[randomNr]);
    }
};
