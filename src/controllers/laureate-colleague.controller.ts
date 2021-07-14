import { Request, Response } from 'restify';
import FakeDb from '../helpers/fake-db';

const validQueryParams = [
    'id',
    'firstname',
    'surname',
    'born',
    'died',
    'bornCountry',
    'bornCountryCode',
    'bornCity',
    'diedCountry',
    'diedCountryCode',
    'diedCity',
    'gender',
];

export const getColleagueData = (req: Request, res: Response): void => {
    const queryParams = Object.keys(req.query);
    const ignoredQueryParams = queryParams.filter(
        (p) => !validQueryParams.includes(p)
    );
    const acceptedQueryParams = queryParams.filter(
        (p) => !ignoredQueryParams.includes(p)
    ) as (
        | 'id'
        | 'firstname'
        | 'surname'
        | 'born'
        | 'died'
        | 'bornCountry'
        | 'bornCountryCode'
        | 'bornCity'
        | 'diedCountry'
        | 'diedCountryCode'
        | 'diedCity'
        | 'gender'
    )[];

    if (!acceptedQueryParams.length) {
        const message =
            'No or no valid query param to identify your colleague by! Check the list of valid query params';
        res.send(400, { message, validQueryParams });
    } else {
        const hits = FakeDb.laureates.filter((l) =>
            acceptedQueryParams.every((p) => {
                if (typeof l[p] === 'string') {
                    return (
                        (l[p] as string)?.toLowerCase() ===
                        req.query[p].toLowerCase()
                    );
                } else if (l[p] instanceof Date) {
                    return (
                        new Date(req.query[p]).getTime() ===
                        (l[p] as Date).getTime()
                    );
                } else if (l[p] === undefined) return !req.query[p];
                else {
                    return l[p] === +req.query[p];
                }
            })
        );
        res.send({ ignoredQueryParams, hits });
    }
};
