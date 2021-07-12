import { Request, Response } from 'restify';
import FakeDb from '../helpers/fake-db';

export const randomNobelPrize = (req: Request, res: Response): void => {
    const randomNr = Math.floor(Math.random() * FakeDb.prizes.length);
    res.send(FakeDb.prizes[randomNr]);
};

export const randomNobelPrizeInCategory = (
    req: Request,
    res: Response
): void => {
    const cat = req.params.category.toLowerCase();
    if (!FakeDb.categories.includes(cat)) {
        const errMsg = `Unknown category '${cat}'! Must be one of: ${FakeDb.categories.join(
            ', '
        )}`;
        res.sendRaw(400, errMsg);
        // Same as:
        // res.status(400);
        // res.sendRaw(errMsg);
    } else {
        const prizes = FakeDb.prizes.filter((p) => p.category === cat);
        const randomNr = Math.floor(Math.random() * prizes.length);
        res.send(prizes[randomNr]);
    }
};
