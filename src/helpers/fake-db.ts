import { NobelPrize } from '../model/nobel-prize';
import { LaureateDetail } from '../model/laureate-detail';
import { Affiliation } from '../model/affiliation';

/**
 * Class used for faking a database, i.e. for storing required application data.
 */
class FakeDb {

    /**
     * Stored Nobel Prize data.
     * @private
     */
    private _prizes!: NobelPrize[];

    /**
     * Stored laureate information.
     * @private
     */
    private _laureates!: LaureateDetail[];

    /**
     * List of existing Nobel Price categories.
     * @private
     */
    private _categories!: string[];

    /**
     * @return List of Nobel Prizes.
     */
    get prizes(): NobelPrize[] {
        return this._prizes;
    }

    /**
     * @return List of laureates (detailed)
     */
    get laureates(): LaureateDetail[] {
        return this._laureates;
    }

    /**
     * @return List of existing Nobel Price categories.
     */
    get categories(): string[] {
        return this._categories;
    }

    /**
     * Sets the Nobel Prize data returned from the (external) Nobel Prize API
     * in a way matching the defined model. Also, the list of unique categories
     * is set.
     *
     * @param data Nobel Prize data to be stored.
     */
    set prizesJson(data: any) {
        this._prizes = data.prizes.map((p: any) => ({
            ...p,
            year: +p.year,
            laureates: p.laureates?.map((l: any) => ({
                ...l,
                id: +l.id,
                share: +l.share,
            })),
        }));

        this._categories = [...new Set(this.prizes.map((p) => p.category))];
    }

    /**
     * Sets the laureate data returned from the (external) Nobel Prize API
     * in a way matching the defined model.
     *
     * @param data Laureate data to be stored.
     */
    set laureatesJson(data: any) {
        this._laureates = data.laureates.map((l: any) => ({
            ...l,
            id: +l.id,
            born: l.born ? new Date(l.born) : undefined,
            died:
                l.died && l.died !== '0000-00-00'
                    ? new Date(l.died)
                    : undefined,
            prizes: l.prizes.map((p: any) => ({
                ...p,
                year: +p.year,
                share: +p.share,
                affiliations: p.affiliations
                    .map((a: any) => (a.length === 0 ? undefined : a))
                    .filter((a: Affiliation) => !!a),
            })),
        }));
    }
}

/**
 * Default exports of this module (Singleton).
 */
export default module.exports = new FakeDb();
