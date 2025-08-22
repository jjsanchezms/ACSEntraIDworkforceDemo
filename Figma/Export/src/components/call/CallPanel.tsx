import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { VideoFeed } from './VideoFeed';
import { CallState, CallStatus } from '../auth/types';

interface CallPanelProps {
  callState: CallState;
  onStartCall: () => void;
  onEndCall: () => void;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
}

const getStatusColor = (status: CallStatus) => {
  switch (status) {
    case 'connecting':
      return 'secondary';
    case 'connected':
      return 'default';
    case 'disconnected':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getStatusText = (status: CallStatus) => {
  switch (status) {
    case 'connecting':
      return 'Connecting...';
    case 'connected':
      return 'In Call';
    case 'disconnected':
      return 'Disconnected';
    default:
      return 'Ready';
  }
};

export function CallPanel({ callState, onStartCall, onEndCall, onToggleAudio, onToggleVideo }: CallPanelProps) {
  const localParticipant = callState.participants.find(p => p.isLocal);
  const remoteParticipants = callState.participants.filter(p => !p.isLocal);
  const isCallActive = callState.status === 'connected' || callState.status === 'connecting';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Azure Communication Services Call
          </CardTitle>
          <Badge variant={getStatusColor(callState.status)}>
            {getStatusText(callState.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Feeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Local Video */}
          {localParticipant && (
            <VideoFeed participant={localParticipant} />
          )}
          
          {/* Remote Video */}
          {remoteParticipants.map((participant) => (
            <VideoFeed key={participant.id} participant={participant} />
          ))}
          
          {/* Placeholder for remote participant when not connected */}
          {callState.status === 'idle' && (
            <Card className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Phone className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Remote participant will appear here</p>
              </div>
            </Card>
          )}
        </div>

        {/* Call Controls */}
        <div className="flex justify-center gap-2">
          {!isCallActive ? (
            <Button onClick={onStartCall} className="min-w-[120px]">
              <Phone className="h-4 w-4 mr-2" />
              Start Call
            </Button>
          ) : (
            <>
              <Button
                variant={callState.localAudioEnabled ? "secondary" : "destructive"}
                size="sm"
                onClick={onToggleAudio}
              >
                {callState.localAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                variant={callState.localVideoEnabled ? "secondary" : "destructive"}
                size="sm"
                onClick={onToggleVideo}
              >
                {callState.localVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              <Button variant="destructive" onClick={onEndCall}>
                <PhoneOff className="h-4 w-4 mr-2" />
                End Call
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}