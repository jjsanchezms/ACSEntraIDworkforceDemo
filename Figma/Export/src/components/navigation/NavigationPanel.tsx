import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Phone, MessageCircle, LogOut, Shield } from 'lucide-react';
import { AuthResult } from '../auth/types';

interface NavigationPanelProps {
  authResult: AuthResult;
  onStartCall: () => void;
  onOpenChat: () => void;
  onLogout: () => void;
}

export function NavigationPanel({ authResult, onStartCall, onOpenChat, onLogout }: NavigationPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header with Logout */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h2>Welcome to Azure Communication Services</h2>
            <p className="text-muted-foreground">
              Authenticated as {authResult.fullPayload.provider} user
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onStartCall}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              Start a Call
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Experience high-quality voice and video calling with Azure Communication Services.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Real-time video and audio</li>
              <li>• Screen sharing capabilities</li>
              <li>• Cross-platform compatibility</li>
              <li>• Enterprise-grade security</li>
            </ul>
            <Button className="w-full mt-4">
              <Phone className="h-4 w-4 mr-2" />
              Launch Call Interface
            </Button>
          </CardContent>
        </Card>

        {/* Chat Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onOpenChat}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              Open Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect through real-time messaging with rich features and thread management.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Thread-based conversations</li>
              <li>• Real-time message delivery</li>
              <li>• Multi-participant support</li>
              <li>• Rich message formatting</li>
            </ul>
            <Button className="w-full mt-4">
              <MessageCircle className="h-4 w-4 mr-2" />
              Launch Chat Interface
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Information */}
      <Card>
        <CardHeader>
          <CardTitle>Azure Communication Services Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mb-2">Voice & Video Calling</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• HD audio and video quality</li>
                <li>• Group calling support</li>
                <li>• Call recording capabilities</li>
                <li>• PSTN integration</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2">Chat & Messaging</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Thread management</li>
                <li>• File sharing support</li>
                <li>• Typing indicators</li>
                <li>• Message history</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}