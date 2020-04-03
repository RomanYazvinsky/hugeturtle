import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectConversations, selectSelectedConversation, selectSelectedMessage } from './selectors';
import { setSelectedConversation, setSelectedMessage, setConversations } from './actions';
import { Conversation } from './models/conversation';
import { withLatestFrom, filter } from 'rxjs/operators';

@Injectable()
export class Task6 {
    private readonly conversations: Conversation[] = [{
        messages: [
            { text: 'M1' },
            { text: 'M2' },
            { text: 'M3' },
        ]
    }, {
        messages: [
            { text: 'M4' },
            { text: 'M5' },
            { text: 'M6' },
        ]
    }
    ]

    constructor(private store: Store) {
    }

    test() {
        this.store.pipe(select(selectConversations)).subscribe(conversations => {
            this.store.dispatch(setSelectedConversation({ selectedConversation: conversations[0] }))
        });
        this.store.pipe(select(selectSelectedConversation)).subscribe(() => {
            this.store.dispatch(setSelectedMessage({ selectedMessage: undefined }))
        });
        this.store.pipe(
            select(selectSelectedMessage),
            filter(message => !!message),
            withLatestFrom(this.store.pipe(select(selectSelectedConversation)))
        ).subscribe(([message, conversation]) => {
            if (!conversation.messages.includes(message)) {
                console.error('Message does not belong to selected conversation!')
            }
        });
        this.store.dispatch(setConversations({ conversations: this.conversations }))
        this.store.dispatch(setSelectedMessage({ selectedMessage: this.conversations[1].messages[0] }))
    }
}
