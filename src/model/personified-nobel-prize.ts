import { NobelPrizeCore } from './nobel-prize-core';
import { Affiliation } from './affiliation';

export class PersonifiedNobelPrize extends NobelPrizeCore {
    share!: number;
    motivation!: string;
    affiliations!: Affiliation[];
}
