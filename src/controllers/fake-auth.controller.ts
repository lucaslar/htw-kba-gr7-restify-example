import { Next, Request, Response } from 'restify';
import FakeDb from '../helpers/fake-db';

export const login = (req: Request, res: Response, next: Next): void => {
    const required = ['firstname', 'surname', 'password'];
    const keys = Object.keys(req.body);
    if (
        keys.length !== required.length ||
        keys.some((k) => !required.includes(k))
    ) {
        const reqJoin = required.join(', ');
        res.status(400);
        res.sendRaw(
            `Required body with attributes ${reqJoin}, got: ${keys.join(', ')}`
        );
    } else {
        const [surname, firstname] = [req.body.surname, req.body.firstname];
        const laureate = FakeDb.laureates.find(
            (l) => l.surname === surname && l.firstname === firstname
        );
        if (
            laureate?.prizes.some(
                (p) => `${p.category}-${p.year}` === req.body.password
            )
        ) {
            res.sendRaw(`Hello, ${firstname}!`);
            // TODO next();
        } else
            res.sendRaw(
                401,
                'No laureate found with the given password (password = <prize category>-<prize year> (of the given laureate))'
            );
    }
};
