import { CallParticipant, CallState, AuthProvider } from '../auth/types';

export const createLocalParticipant = (provider: AuthProvider): CallParticipant => ({
  id: `local_${provider.toLowerCase()}_${Math.random().toString(36).substr(2, 9)}`,
  displayName: `${provider} User`,
  isLocal: true,
  isVideoEnabled: true,
  isAudioEnabled: true,
});

export const createRemoteParticipant = (provider: AuthProvider): CallParticipant => {
  const otherProvider = provider === 'Fabrikam' ? 'Contoso' : 'Fabrikam';
  return {
    id: `remote_${otherProvider.toLowerCase()}_${Math.random().toString(36).substr(2, 9)}`,
    displayName: `${otherProvider} User`,
    isLocal: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
  };
};

export const createInitialCallState = (): CallState => ({
  status: 'idle',
  participants: [],
  localVideoEnabled: true,
  localAudioEnabled: true,
});