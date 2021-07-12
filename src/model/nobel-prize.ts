import { LaureateMeta } from './laureate-meta';
import { NobelPrizeCore } from './nobel-prize-core';

export class NobelPrize extends NobelPrizeCore {
    laureates?: LaureateMeta[];
}
