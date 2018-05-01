import { Observable } from 'rxjs/Observable';

export interface BusyService {
    isBusy$: Observable<boolean>;

    setBusy(isBusy: boolean): void;
}
