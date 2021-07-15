import { LaureateDetail } from '../model/laureate-detail';
import FakeDb from './fake-db';

/**
 * Characters to separate the super secret token components by.
 */
const joinChars = '$$$$$';

/**
 * Key for getting the super secret token in requests.
 */
export const tokenKey = 'supersecrettoken';

/**
 * Creates a super secret token for a given laureate.
 * Perhaps, it's not that much of a secret:
 * <id>$$$$$<surname>$$$$$<gender>$$$$$<Birth year ? >
 *
 * @param laureate Laureate the token is to be generated for.
 */
export const getToken = (laureate: LaureateDetail): string => {
    return [
        laureate.id,
        laureate.surname,
        laureate.gender,
        laureate.born?.getFullYear(),
    ].join(joinChars);
};

/**
 * @param token Token to be checked.
 * @return True if the token matches a laureate, false if not.
 */
export const isValidToken = (token: string): boolean => {
    const [id, surname, gender, born] = token.split(joinChars);
    return !!FakeDb.laureates.find(
        (l) =>
            l.id === +id &&
            l.surname === surname &&
            l.gender === gender &&
            l.born?.getFullYear() === +born
    );
};

/**
 * @param token Token the laureate's id is to be returned for.
 * @return A laureate's id parsed from a token.
 */
export const idFromToken = (token: string): string => {
    return token.split(joinChars)[0];
};
