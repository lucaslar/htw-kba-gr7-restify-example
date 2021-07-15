import https from 'https';
import FakeDb from './fake-db';

/**
 * Endpoint for getting Nobel Prize data.
 */
const prizeApi = 'https://api.nobelprize.org/v1/prize.json';

/**
 * Endpoint for getting laureate data.
 */
const laureatesApi = 'https://api.nobelprize.org/v1/laureate.json';

/**
 * Requests data from a given API and returns it (async).
 *
 * @param api API URL to be requested.
 * @return Data as returned from the requested API.
 */
const requestJsonData = async (api: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let data: string = '';
        https
            .get(api, (response) => {
                response.on('data', (d) => (data += d));
                response.on('end', () => resolve(JSON.parse(data)));
            })
            .on('error', (error) => reject(error));
    });
};

/**
 * Initializes Nobel Prize and laureate data and stores it in the faked database.
 */
export const initData = async (): Promise<void> => {
    try {
        FakeDb.prizesJson = await requestJsonData(prizeApi);
        console.log('Nobel prize data has been initialized successfully!');
        FakeDb.laureatesJson = await requestJsonData(laureatesApi);
        console.log('Laureate data has been initialized successfully!');
    } catch (e) {
        console.error(e);
    }
};
