export interface AuthResult {
  userId: string;
  accessToken: string;
  fullPayload: any;
}

export interface DebugLog {
  timestamp: string;
  message: string;
  status: 'info' | 'success' | 'warning';
}

export type AuthProvider = 'Fabrikam' | 'Contoso';

export type AppView = 'auth' | 'navigation' | 'call' | 'chat';

export type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnected';

export interface CallParticipant {
  id: string;
  displayName: string;
  isLocal: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

export interface CallState {
  status: CallStatus;
  participants: CallParticipant[];
  localVideoEnabled: boolean;
  localAudioEnabled: boolean;
}

// Chat-related types
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isLocal: boolean;
}

export interface ChatThread {
  id: string;
  topic: string;
  participants: string[];
  createdAt: string;
  messages: ChatMessage[];
}

export interface ChatState {
  threads: ChatThread[];
  activeThreadId: string | null;
  isConnected: boolean;
}

export interface ChatParticipant {
  id: string;
  displayName: string;
  provider: AuthProvider;
}