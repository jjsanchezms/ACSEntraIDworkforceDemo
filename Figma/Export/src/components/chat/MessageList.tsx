import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ChatMessage } from '../auth/types';
import { formatMessageTime } from './utils';

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-sm mb-1">No messages yet</p>
          <p className="text-xs">Start the conversation by sending a message</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
      <div className="space-y-4 py-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isLocal ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="text-xs">
                {message.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className={`flex-1 max-w-xs ${message.isLocal ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-2 mb-1">
                {message.isLocal && <Badge variant="secondary" className="text-xs">You</Badge>}
                <span className="text-xs text-muted-foreground">{message.senderName}</span>
                <span className="text-xs text-muted-foreground">
                  {formatMessageTime(message.timestamp)}
                </span>
                {!message.isLocal && <Badge variant="outline" className="text-xs">Remote</Badge>}
              </div>
              <div
                className={`inline-block p-3 rounded-lg text-sm ${
                  message.isLocal
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}