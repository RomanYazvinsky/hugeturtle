import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ConnectionService, ServerMock } from '../task1/task1';

class Auth {
    private _isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

    get isUserLoggedIn$(): Observable<boolean> {
        return this._isUserLoggedIn$;
    }

    login() {
        this._isUserLoggedIn$.next(true)
    }

    logout() {
        this._isUserLoggedIn$.next(false)
    }
}

export class Task2 {
    test() {
        const server = new ServerMock();
        const client = new ConnectionService(server);
        const auth = new Auth();
        client.connectToServer();
        combineLatest([client.getOnlineStatus(), auth.isUserLoggedIn$]).pipe(take(5)).subscribe(([online, logged]) => {
            console.log(`User is ${online ? 'online' : 'offline'} and ${logged ? 'logged in' : 'logged out'}`);
        })
        setTimeout(() => {
            auth.login()
        }, 7000);
        setTimeout(() => {
            server.isEnabled = false;
        }, 10000);
        setTimeout(() => {
            auth.logout()
        }, 15000);
    }
}
