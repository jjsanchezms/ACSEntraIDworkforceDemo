import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ScrollArea } from '../ui/scroll-area';
import { ChevronDown, ChevronRight, User, Key, FileText } from 'lucide-react';
import { AuthResult } from './types';

interface AuthResultDisplayProps {
  authResult: AuthResult;
}

export function AuthResultDisplay({ authResult }: AuthResultDisplayProps) {
  const [isTokenCollapsed, setIsTokenCollapsed] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Authentication Result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User ID */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <label>User ID</label>
          </div>
          <div className="font-mono text-sm bg-muted p-3 rounded-md">
            {authResult.userId}
          </div>
        </div>

        {/* ACS Access Token */}
        <div className="space-y-2">
          <Collapsible open={!isTokenCollapsed} onOpenChange={setIsTokenCollapsed}>
            <CollapsibleTrigger className="flex items-center gap-2 hover:text-primary">
              {isTokenCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <Key className="h-4 w-4" />
              <label>ACS Access Token</label>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <ScrollArea className="h-32 w-full border rounded-md">
                <div className="font-mono text-xs p-3 break-all">
                  {authResult.accessToken}
                </div>
              </ScrollArea>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Full JSON Payload */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <label>Full JSON Payload</label>
          </div>
          <ScrollArea className="h-64 w-full border rounded-md">
            <pre className="text-xs p-4 bg-muted/50">
              {JSON.stringify(authResult.fullPayload, null, 2)}
            </pre>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}