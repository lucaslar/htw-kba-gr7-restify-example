import { Request, Response } from 'restify';

export const getColleagueData = (req: Request, res: Response): void => {
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

    const queryParams = Object.keys(req.query);
    const ignoredQueryParams = queryParams.filter(
        (p) => !validQueryParams.includes(p)
    );

    if (
        !queryParams.length ||
        ignoredQueryParams.length === queryParams.length
    ) {
        const message =
            'No or no valid query param to identify your colleague by! Check the list of valid query params';
        res.send(400, { message, validQueryParams });
    } else res.send({ ignoredQueryParams }); // TODO: Add data
};

export const getOwnData = (req: Request, res: Response): void => {}; // TODO implement
