import { LaureateDetail } from '../model/laureate-detail';
import FakeDb from './fake-db';

const joinChars = '$$$$$';

export const getToken = (laureate: LaureateDetail): string => {
    return [
        laureate.id,
        laureate.surname,
        laureate.gender,
        laureate.born?.getFullYear(),
    ].join(joinChars);
};

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
