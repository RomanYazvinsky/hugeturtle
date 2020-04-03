import { Action, createReducer, on } from '@ngrx/store';

import { setConversations, setSelectedConversation, setSelectedMessage } from './actions';
import { State } from './state';

const task6Reducer = createReducer({
    conversations: []
} as State,
    on(setConversations, (state, { conversations }) => ({ ...state, conversations })),
    on(setSelectedConversation, (state, { selectedConversation }) => ({ ...state, selectedConversation })),
    on(setSelectedMessage, (state, { selectedMessage }) => ({ ...state, selectedMessage })),
)

export function reducer(state: State | undefined, action: Action) {
    return task6Reducer(state, action);
}
