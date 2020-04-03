import { Conversation } from './models/conversation';
import { Message } from './models/message';

export interface State {
    conversations: Conversation[];
    selectedConversation?: Conversation;
    selectedMessage?: Message;
}
