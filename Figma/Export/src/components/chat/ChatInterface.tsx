import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { ArrowLeft, MessageCircle, Users, Home, Navigation, ChevronDown, LogOut } from 'lucide-react';
import { ThreadList } from './ThreadList';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ThreadCreationDialog } from './ThreadCreationDialog';
import { ChatDebugPanel } from './ChatDebugPanel';
import { AuthResult, DebugLog, ChatState, ChatThread } from '../auth/types';
import { 
  createChatThread, 
  createChatMessage, 
  createChatParticipant, 
  createRemoteChatParticipant,
  generateAutoReply
} from './utils';
import { createTimestamp } from '../auth/utils';

interface ChatInterfaceProps {
  authResult: AuthResult;
  onBack: () => void;
  onBackToHome?: () => void;
  onLogout?: () => void;
}

export function ChatInterface({ authResult, onBack, onBackToHome, onLogout }: ChatInterfaceProps) {
  const [chatState, setChatState] = useState<ChatState>({
    threads: [],
    activeThreadId: null,
    isConnected: true
  });
  const [chatDebugLogs, setChatDebugLogs] = useState<DebugLog[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const localParticipant = createChatParticipant(authResult.fullPayload.provider);

  const addChatDebugLog = (message: string, status: 'info' | 'success' | 'warning' = 'info') => {
    const timestamp = createTimestamp();
    setChatDebugLogs(prev => [...prev, { timestamp, message, status }]);
  };

  const handleCreateThread = (topic: string) => {
    const newThread = createChatThread(topic, localParticipant);
    setChatState(prev => ({
      ...prev,
      threads: [...prev.threads, newThread],
      activeThreadId: newThread.id
    }));
    addChatDebugLog(`Thread created: "${topic}"`, 'success');
  };

  const handleSelectThread = (threadId: string) => {
    setChatState(prev => ({ ...prev, activeThreadId: threadId }));
    const thread = chatState.threads.find(t => t.id === threadId);
    if (thread) {
      addChatDebugLog(`Switched to thread: "${thread.topic}"`, 'info');
    }
  };

  const simulateRemoteResponse = async (originalMessage: string, threadId: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const remoteParticipant = createRemoteChatParticipant(authResult.fullPayload.provider);
    const autoReply = generateAutoReply(originalMessage, localParticipant.displayName);
    const remoteMessage = createChatMessage(
      remoteParticipant.id,
      remoteParticipant.displayName,
      autoReply,
      false
    );

    setChatState(prev => ({
      ...prev,
      threads: prev.threads.map(thread =>
        thread.id === threadId
          ? { 
              ...thread, 
              messages: [...thread.messages, remoteMessage],
              participants: thread.participants.includes(remoteParticipant.id) 
                ? thread.participants 
                : [...thread.participants, remoteParticipant.id]
            }
          : thread
      )
    }));

    addChatDebugLog('Remote message received', 'success');
  };

  const handleSendMessage = (content: string) => {
    if (!chatState.activeThreadId) return;

    const message = createChatMessage(
      localParticipant.id,
      localParticipant.displayName,
      content,
      true
    );

    setChatState(prev => ({
      ...prev,
      threads: prev.threads.map(thread =>
        thread.id === chatState.activeThreadId
          ? { ...thread, messages: [...thread.messages, message] }
          : thread
      )
    }));

    addChatDebugLog('Message sent', 'info');
    
    // Simulate remote response
    simulateRemoteResponse(content, chatState.activeThreadId);
  };

  const clearChatLogs = () => {
    setChatDebugLogs([]);
  };

  const activeThread = chatState.threads.find(t => t.id === chatState.activeThreadId);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
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
        <div className="flex-1">
          <h1>Azure Communication Services Chat</h1>
          <p className="text-muted-foreground">
            Experience real-time chat with {authResult.fullPayload.provider} identity
          </p>
        </div>
        <Badge variant={chatState.isConnected ? 'default' : 'destructive'}>
          {chatState.isConnected ? 'Connected' : 'Disconnected'}
        </Badge>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Thread List */}
        <div className="lg:col-span-1">
          <ThreadList
            threads={chatState.threads}
            activeThreadId={chatState.activeThreadId}
            onSelectThread={handleSelectThread}
            onCreateThread={() => setShowCreateDialog(true)}
          />
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {activeThread ? activeThread.topic : 'Select a thread to start chatting'}
                {activeThread && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                    <Users className="h-4 w-4" />
                    {activeThread.participants.length} participants
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            
            {activeThread ? (
              <>
                <CardContent className="flex-1 flex flex-col p-0">
                  <MessageList messages={activeThread.messages} />
                </CardContent>
                <MessageInput
                  onSendMessage={handleSendMessage}
                  disabled={!chatState.isConnected}
                />
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="mb-2">No thread selected</h3>
                  <p className="text-sm mb-4">
                    Create a new thread or select an existing one to start chatting
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    Create Your First Thread
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Debug Panel */}
      <ChatDebugPanel
        debugLogs={chatDebugLogs}
        onClearLogs={clearChatLogs}
      />

      {/* Thread Creation Dialog */}
      <ThreadCreationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateThread={handleCreateThread}
      />
    </div>
  );
}