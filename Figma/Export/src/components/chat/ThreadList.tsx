import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, MessageCircle, Users } from 'lucide-react';
import { ChatThread } from '../auth/types';

interface ThreadListProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onCreateThread: () => void;
}

export function ThreadList({ threads, activeThreadId, onSelectThread, onCreateThread }: ThreadListProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageCircle className="h-4 w-4" />
          Chat Threads
        </CardTitle>
        <Button size="sm" onClick={onCreateThread}>
          <Plus className="h-3 w-3 mr-1" />
          New
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 p-3">
        {threads.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No chat threads yet</p>
            <p className="text-xs">Create your first thread to start chatting</p>
          </div>
        ) : (
          threads.map((thread) => (
            <div
              key={thread.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                activeThreadId === thread.id
                  ? 'bg-primary/5 border-primary'
                  : 'bg-muted/30 border-border hover:bg-muted/50'
              }`}
              onClick={() => onSelectThread(thread.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{thread.topic}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {thread.participants.length}
                    </div>
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      {thread.messages.length} msgs
                    </Badge>
                  </div>
                </div>
              </div>
              {thread.messages.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2 truncate">
                  {thread.messages[thread.messages.length - 1].content}
                </p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}