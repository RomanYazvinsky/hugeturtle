import { createSelector } from '@ngrx/store';
import { State } from './state';

const selectState = ({ task6 }: { task6: State }) => task6;

export const selectConversations = createSelector(selectState, task6 => task6.conversations);
export const selectSelectedConversation = createSelector(selectState, task6 => task6.selectedConversation);
export const selectSelectedMessage = createSelector(selectState, task6 => task6.selectedMessage);
