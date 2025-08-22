import React, { useState } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { ArrowLeft, Home, Navigation, ChevronDown, LogOut } from 'lucide-react';
import { CallPanel } from './CallPanel';
import { CallDebugPanel } from './CallDebugPanel';
import { AuthResult, DebugLog, CallState } from '../auth/types';
import { createLocalParticipant, createRemoteParticipant, createInitialCallState } from './utils';
import { createTimestamp } from '../auth/utils';

interface CallInterfaceProps {
  authResult: AuthResult;
  onBack: () => void;
  onBackToHome?: () => void;
  onLogout?: () => void;
}

export function CallInterface({ authResult, onBack, onBackToHome, onLogout }: CallInterfaceProps) {
  const [callState, setCallState] = useState<CallState>(createInitialCallState());
  const [callDebugLogs, setCallDebugLogs] = useState<DebugLog[]>([]);

  const addCallDebugLog = (message: string, status: 'info' | 'success' | 'warning' = 'info') => {
    const timestamp = createTimestamp();
    setCallDebugLogs(prev => [...prev, { timestamp, message, status }]);
  };

  const simulateCall = async () => {
    const provider = authResult.fullPayload.provider;
    
    // Create local participant
    const localParticipant = createLocalParticipant(provider);
    setCallState(prev => ({
      ...prev,
      status: 'connecting',
      participants: [{ ...localParticipant, isVideoEnabled: prev.localVideoEnabled, isAudioEnabled: prev.localAudioEnabled }]
    }));
    
    addCallDebugLog('Call initiated', 'info');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addCallDebugLog('User joined', 'success');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add remote participant
    const remoteParticipant = createRemoteParticipant(provider);
    setCallState(prev => ({
      ...prev,
      status: 'connected',
      participants: [...prev.participants, remoteParticipant]
    }));
    
    addCallDebugLog('Remote participant joined', 'success');
  };

  const endCall = () => {
    setCallState(createInitialCallState());
    addCallDebugLog('Call ended', 'info');
  };

  const toggleAudio = () => {
    setCallState(prev => {
      const newAudioState = !prev.localAudioEnabled;
      const updatedParticipants = prev.participants.map(p => 
        p.isLocal ? { ...p, isAudioEnabled: newAudioState } : p
      );
      
      addCallDebugLog(`Audio ${newAudioState ? 'enabled' : 'disabled'}`, 'info');
      
      return {
        ...prev,
        localAudioEnabled: newAudioState,
        participants: updatedParticipants
      };
    });
  };

  const toggleVideo = () => {
    setCallState(prev => {
      const newVideoState = !prev.localVideoEnabled;
      const updatedParticipants = prev.participants.map(p => 
        p.isLocal ? { ...p, isVideoEnabled: newVideoState } : p
      );
      
      addCallDebugLog(`Video ${newVideoState ? 'enabled' : 'disabled'}`, 'info');
      
      return {
        ...prev,
        localVideoEnabled: newVideoState,
        participants: updatedParticipants
      };
    });
  };

  const clearCallLogs = () => {
    setCallDebugLogs([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Back Dropdown */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={onBack} className="gap-2">
              <Navigation className="h-4 w-4" />
              Back to Navigation
            </DropdownMenuItem>
            {onBackToHome && (
              <DropdownMenuItem onClick={onBackToHome} className="gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </DropdownMenuItem>
            )}
            {onLogout && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <h1>Azure Communication Services Call</h1>
          <p className="text-muted-foreground">
            Experience real-time calling with {authResult.fullPayload.provider} identity
          </p>
        </div>
      </div>

      {/* Call Panel */}
      <CallPanel
        callState={callState}
        onStartCall={simulateCall}
        onEndCall={endCall}
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
      />

      {/* Call Debug Panel */}
      <CallDebugPanel
        debugLogs={callDebugLogs}
        onClearLogs={clearCallLogs}
      />
    </div>
  );
}