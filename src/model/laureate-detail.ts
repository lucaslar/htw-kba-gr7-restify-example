import { PersonifiedNobelPrize } from './personified-nobel-prize';

export class LaureateDetail {
    id!: number;
    firstname!: string;
    surname?: string;
    born?: Date;
    died?: Date;
    bornCountry?: string;
    bornCountryCode?: string;
    bornCity?: string;
    diedCountry?: string;
    diedCountryCode?: string;
    diedCity?: string;
    gender!: 'male' | 'female' | 'org';
    prizes!: PersonifiedNobelPrize[];
}
