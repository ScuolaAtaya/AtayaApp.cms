import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Work } from './work';
import { ApiService } from '../common/api.service';

export abstract class WorkService extends ApiService {
    target: string;

    getAll<T extends Work>(): Observable<T[]> {
        return this.requestService.get(this.createUrlFromBaseUrl(this.target)).map(response => response as T[]);
    }

    getOne<T extends Work>(id: string): Observable<T> {
        return this.requestService.get(this.createUrlFromBaseUrl(this.target, id)).map(response => response as T);
    }

    getAllBySection<T extends Work>(section: number): Observable<T[]> {
        return this.requestService.get(this.createUrlFromBaseUrl(this.target, 'unit_id', String(section))).map(response => response as T[]);
    }

    update<T extends Work>(work: T, id: string) {
        return this.requestService.put(this.createUrlFromBaseUrl(this.target, id), JSON.stringify(work));
    }

    create<T extends Work>(work: T) {
        return this.requestService.post(this.createUrlFromBaseUrl(this.target), JSON.stringify(work));
    }

    delete(id: string) {
        return this.requestService.delete(this.createUrlFromBaseUrl(this.target, id));
    }
}
