import { Next, Request, Response } from 'restify';
import FakeDb from '../helpers/fake-db';
import { getToken } from '../helpers/fake-token-service';

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
        const { surname, firstname, password } = req.body;
        const laureate = FakeDb.laureates.find(
            (l) => l.surname === surname && l.firstname === firstname
        );
        if (
            laureate?.prizes.some((p) => `${p.category}-${p.year}` === password)
        ) {
            // While express has res.locals for storing data, in restify, data has to be passed by
            // adding a new attribute to the req-object. This works, too. However, if used with TypeScript,
            // it has to be casted to Any before.
            (req as any).data = { laureate };

            // Convention to use "return", but "next" works, too!
            return next();
        } else {
            res.sendRaw(
                401,
                'No laureate found with the given password (password = <prize category>-<prize year> (of the given laureate))'
            );
        }
    }
};

export const generateSuperSecretToken = (req: Request, res: Response): void => {
    // Here, we know that we will receive laureate data. After casting to any again, we can read the data:
    const laureate = (req as any).data.laureate;
    const token = getToken(laureate);
    res.send({ message: `Hello, ${laureate.firstname}!`, token });
};