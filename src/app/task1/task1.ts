import { BehaviorSubject, from, Observable, of, Subscription, timer } from 'rxjs';
import { catchError, delay, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class ServerMock {
    isEnabled: boolean = true;

    longPollingConnection(timeout: number): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.isEnabled) {
                return reject('Server shutdown');
            }
            let timerId: any = 0;
            const checkInteval = setInterval(() => {
                if (!this.isEnabled) {
                    reject('Server shutdown');
                    clearTimeout(timerId);
                }
            }, 500)
            const messageResponseTime = Math.random() * 2 * timeout;
            if (messageResponseTime > timeout) {
                timerId = setTimeout(() => {
                    clearInterval(checkInteval);
                    reject(`Connection timeout! [${timeout} ms]`);
                }, timeout);
            } else {
                timerId = setTimeout(() => {
                    clearInterval(checkInteval);
                    resolve(`You have got a message! [${messageResponseTime} ms]`);
                }, messageResponseTime);
            }
        });
    }
}
export class ConnectionService {
    private static readonly SUCCESSFULLY_CONNECTED_TIMEOUT = 1000;
    private static readonly POLLING_TIMEOUT = 5000;
    private static readonly POLLING_DELAY = 500;
    private readonly _status$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _longPollingConnectionSubscription: Subscription | null = null;
    constructor(private server: ServerMock) {
    }

    /**
     * Returns false when server is shut down, otherwise recreates connection
     */
    private createConnection(): Observable<boolean> {
        return from(this.server.longPollingConnection(ConnectionService.POLLING_TIMEOUT)) // or httpclient.get()
            .pipe(
                delay(ConnectionService.POLLING_DELAY),
                switchMap((message) => {
                    console.log(`[Message] ${message}`); // there we can extract the message
                    return this.createConnection() // recreate connection
                }),
                catchError(error => {
                    if (error === 'Server shutdown') {
                        console.log(`[Error] ${error}`); // if server is shut down then complete the sequence
                        return of(false)
                    }
                    console.log(`[Reconnect] ${error}`); // on timeout restore connection
                    return this.createConnection()
                }),
            );
    }

    connectToServer() {
        if (this._longPollingConnectionSubscription) {
            return;
        }
        const connectionFailures = this.createConnection();
        // there could be something like ping http request instead of timer
        timer(ConnectionService.SUCCESSFULLY_CONNECTED_TIMEOUT).pipe(
            takeUntil(connectionFailures)
        ).subscribe(() => {
            this._status$.next(true);
        })
        this._longPollingConnectionSubscription = connectionFailures.subscribe(failed => {
            this._status$.next(failed);
            this._longPollingConnectionSubscription = null;
        });
    }

    getOnlineStatus(): Observable<boolean> {
        return this._status$;
    }
}

export class Task1 {
    test() {
        const server = new ServerMock()
        const client = new ConnectionService(server);
        client.getOnlineStatus().subscribe((status) => {
            console.log(status)
        });
        client.getOnlineStatus()
            .pipe(filter(v => !v), take(5), delay(5000)) // tries to reconnect 5 times when goes offline
            .subscribe(() => client.connectToServer())
        setTimeout(() => {
            server.isEnabled = false; // disables server, pooling connection should be aborted
        }, 15000);

        setTimeout(() => {
            server.isEnabled = true;
        }, 30000);

        setTimeout(() => {
            server.isEnabled = false;
        }, 45000);
    }
}
