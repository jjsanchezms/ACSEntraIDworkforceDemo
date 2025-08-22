import React, { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { RefreshCw, ChevronDown, Home } from 'lucide-react';
import { LoginButtons } from './auth/LoginButtons';
import { AuthResultDisplay } from './auth/AuthResultDisplay';
import { DebugPanel } from './auth/DebugPanel';
import { NavigationPanel } from './navigation/NavigationPanel';
import { CallInterface } from './call/CallInterface';
import { ChatInterface } from './chat/ChatInterface';
import { AuthResult, DebugLog, AuthProvider, AppView } from './auth/types';
import { generateMockAuthResult, createTimestamp } from './auth/utils';

export function AuthDemo() {
  const [currentView, setCurrentView] = useState<AppView>('auth');
  const [authResult, setAuthResult] = useState<AuthResult | null>(null);
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>([]);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const addDebugLog = (message: string, status: 'info' | 'success' | 'warning' = 'info') => {
    const timestamp = createTimestamp();
    setDebugLogs(prev => [...prev, { timestamp, message, status }]);
  };

  const simulateAuth = async (provider: AuthProvider) => {
    setIsLoading(provider);
    setAuthResult(null);
    
    // Simulate authentication flow
    addDebugLog('Config loaded', 'success');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addDebugLog(`Redirect started for ${provider}`, 'info');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addDebugLog('Token requested', 'info');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addDebugLog('Token received', 'success');
    
    const mockResult = generateMockAuthResult(provider);
    setAuthResult(mockResult);
    setIsLoading(null);
    setCurrentView('navigation');
  };

  const handleLogout = () => {
    addDebugLog('User logged out', 'info');
    setAuthResult(null);
    setCurrentView('auth');
    // Keep debug logs for reference unless user explicitly clears them
  };

  const handleRefresh = () => {
    addDebugLog('Page refreshed', 'info');
    setAuthResult(null);
    setDebugLogs([]);
    setCurrentView('auth');
    setIsLoading(null);
  };

  const clearLogs = () => {
    setDebugLogs([]);
    setAuthResult(null);
    setCurrentView('auth');
  };

  const handleStartCall = () => {
    setCurrentView('call');
  };

  const handleOpenChat = () => {
    setCurrentView('chat');
  };

  const handleBackToNavigation = () => {
    setCurrentView('navigation');
  };

  const handleBackToHome = () => {
    setCurrentView('auth');
    setAuthResult(null);
  };

  // Render different views based on current state
  if (currentView === 'call' && authResult) {
    return (
      <CallInterface 
        authResult={authResult} 
        onBack={handleBackToNavigation}
        onBackToHome={handleBackToHome}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === 'chat' && authResult) {
    return (
      <ChatInterface 
        authResult={authResult} 
        onBack={handleBackToNavigation}
        onBackToHome={handleBackToHome}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header - Show on all views */}
      <div className="flex items-center gap-4">
        {currentView === 'auth' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Home
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handleRefresh} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <div className="flex-1 text-center">
          <h1>Azure Communication Services Demo</h1>
          <p className="text-muted-foreground">
            {currentView === 'auth' 
              ? 'Authenticate with your identity provider to begin'
              : 'Choose your Azure Communication Services experience'
            }
          </p>
        </div>

        {/* Spacer for visual balance when showing dropdown */}
        {currentView === 'auth' && <div className="w-[88px]" />}
      </div>

      {/* Authentication Flow */}
      {currentView === 'auth' && (
        <LoginButtons onLogin={simulateAuth} isLoading={isLoading} />
      )}
      
      {/* Post-Login Navigation */}
      {currentView === 'navigation' && authResult && (
        <NavigationPanel 
          authResult={authResult}
          onStartCall={handleStartCall}
          onOpenChat={handleOpenChat}
          onLogout={handleLogout}
        />
      )}
      
      {/* Authentication Result (shown in both auth and navigation views after login) */}
      {authResult && currentView !== 'call' && currentView !== 'chat' && (
        <AuthResultDisplay authResult={authResult} />
      )}
      
      {/* Debug Panel (shown in auth and navigation views) */}
      {currentView !== 'call' && currentView !== 'chat' && (
        <DebugPanel debugLogs={debugLogs} onClearLogs={clearLogs} />
      )}
    </div>
  );
}