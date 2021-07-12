import { NobelPrize } from '../model/nobel-prize';
import { LaureateDetail } from '../model/laureate-detail';
import { Affiliation } from '../model/affiliation';

class FakeDb {
    private _prizes!: NobelPrize[];
    private _laureates!: LaureateDetail[];
    private _categories!: string[];

    get prizes(): NobelPrize[] {
        return this._prizes;
    }

    get laureates(): LaureateDetail[] {
        return this._laureates;
    }

    get categories(): string[] {
        return this._categories;
    }

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

export default module.exports = new FakeDb();
