import { AuthResult, AuthProvider } from './types';

export const generateMockAuthResult = (provider: AuthProvider): AuthResult => {
  const randomId = Math.random().toString(36).substr(2, 9);
  const tokenSuffix = Math.random().toString(36).substr(2, 40);
  
  return {
    userId: `user_${provider.toLowerCase()}_${randomId}`,
    accessToken: `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1uQ19WWmNBVGZNNXBP...${tokenSuffix}`,
    fullPayload: {
      "token_type": "Bearer",
      "scope": "https://communication.azure.com/VoIP",
      "expires_in": 3600,
      "access_token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1uQ19WWmNBVGZNNXBP...${tokenSuffix}`,
      "user_id": `user_${provider.toLowerCase()}_${randomId}`,
      "tenant_id": `${provider.toLowerCase()}-tenant-${Math.random().toString(36).substr(2, 8)}`,
      "issued_at": new Date().toISOString(),
      "provider": provider,
      "communication_user_id": `8:acs:${Math.random().toString(36).substr(2, 16)}`
    }
  };
};

export const createTimestamp = (): string => {
  return new Date().toLocaleTimeString();
};