import { interval, Observable } from 'rxjs';
import { bufferTime, map, take } from 'rxjs/operators';

function getNumber(): Observable<number> {
    return interval(500).pipe(map(() => Math.random() * 100));
}

export class Task3 {
    test() {
        getNumber().pipe(bufferTime(2000), take(10)).subscribe(values => {
            console.log(values)
        })
    }
}
