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
        const catList = FakeDb.categories.join(', ');
        const err = `Unknown category '${cat}'! Must be one of: ${catList}`;
        res.sendRaw(400, err);
    } else {
        const prizes = FakeDb.prizes.filter((p) => p.category === cat);
        const randomNr = Math.floor(Math.random() * prizes.length);
        res.send(prizes[randomNr]);
    }
};
