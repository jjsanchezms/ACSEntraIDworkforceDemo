import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Mic, MicOff, Video, VideoOff, User } from 'lucide-react';
import { CallParticipant } from '../auth/types';

interface VideoFeedProps {
  participant: CallParticipant;
  className?: string;
}

export function VideoFeed({ participant, className = '' }: VideoFeedProps) {
  return (
    <Card className={`relative overflow-hidden bg-muted ${className}`}>
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex items-center justify-center">
        {participant.isVideoEnabled ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <User className="h-16 w-16 text-muted-foreground" />
            <div className="absolute inset-0 bg-black/10 animate-pulse" />
          </div>
        ) : (
          <div className="text-center">
            <VideoOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Video disabled</p>
          </div>
        )}
      </div>
      
      {/* Participant Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">{participant.displayName}</span>
            {participant.isLocal && (
              <Badge variant="secondary" className="text-xs">
                You
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {participant.isAudioEnabled ? (
              <Mic className="h-3 w-3" />
            ) : (
              <MicOff className="h-3 w-3 text-red-400" />
            )}
            {participant.isVideoEnabled ? (
              <Video className="h-3 w-3" />
            ) : (
              <VideoOff className="h-3 w-3 text-red-400" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}