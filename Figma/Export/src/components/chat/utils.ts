import { ChatThread, ChatMessage, ChatParticipant, AuthProvider } from '../auth/types';

export const createChatThread = (topic: string, localParticipant: ChatParticipant): ChatThread => ({
  id: `thread_${Math.random().toString(36).substr(2, 9)}`,
  topic,
  participants: [localParticipant.id],
  createdAt: new Date().toISOString(),
  messages: []
});

export const createChatMessage = (
  senderId: string,
  senderName: string,
  content: string,
  isLocal: boolean = false
): ChatMessage => ({
  id: `msg_${Math.random().toString(36).substr(2, 9)}`,
  senderId,
  senderName,
  content,
  timestamp: new Date().toISOString(),
  isLocal
});

export const createChatParticipant = (provider: AuthProvider): ChatParticipant => ({
  id: `participant_${provider.toLowerCase()}_${Math.random().toString(36).substr(2, 9)}`,
  displayName: `${provider} User`,
  provider
});

export const createRemoteChatParticipant = (provider: AuthProvider): ChatParticipant => {
  const otherProvider = provider === 'Fabrikam' ? 'Contoso' : 'Fabrikam';
  return {
    id: `participant_${otherProvider.toLowerCase()}_${Math.random().toString(36).substr(2, 9)}`,
    displayName: `${otherProvider} User`,
    provider: otherProvider
  };
};

export const formatMessageTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const generateAutoReply = (originalMessage: string, senderName: string): string => {
  const replies = [
    `Thanks for the message, ${senderName}!`,
    `I received your message: "${originalMessage}". Let me get back to you on that.`,
    `Great point! I'll consider that.`,
    `Absolutely, I agree with that approach.`,
    `That's interesting. Can you tell me more?`,
    `Thanks for sharing. I'll review this and respond shortly.`
  ];
  
  return replies[Math.floor(Math.random() * replies.length)];
};