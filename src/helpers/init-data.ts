import https from 'https';
import FakeDb from './fake-db';

const prizeApi = 'https://api.nobelprize.org/v1/prize.json';
const laureatesApi = 'https://api.nobelprize.org/v1/laureate.json';

const requestJsonData = (api: string): Promise<any> => {
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
