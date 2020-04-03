import { createAction, props } from '@ngrx/store';
import { Conversation } from './models/conversation';
import { Message } from './models/message';

export const setConversations = createAction('[Task 6] set conversations', props<{ conversations: Conversation[] }>());
export const setSelectedConversation = createAction('[Task 6] set selected conversation', props<{ selectedConversation?: Conversation }>());
export const setSelectedMessage = createAction('[Task 6] set selected message', props<{ selectedMessage?: Message }>());
