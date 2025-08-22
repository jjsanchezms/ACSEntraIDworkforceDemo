import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { DebugLog } from './types';

interface DebugPanelProps {
  debugLogs: DebugLog[];
  onClearLogs: () => void;
}

export function DebugPanel({ debugLogs, onClearLogs }: DebugPanelProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Debug Logs</CardTitle>
        <Button variant="outline" size="sm" onClick={onClearLogs}>
          Clear Logs
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 w-full">
          <div className="space-y-2">
            {debugLogs.length === 0 ? (
              <p className="text-muted-foreground text-sm">No logs yet. Start authentication to see debug information.</p>
            ) : (
              debugLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground font-mono text-xs">
                    {log.timestamp}
                  </span>
                  <Badge 
                    variant={log.status === 'success' ? 'default' : log.status === 'warning' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {log.status.toUpperCase()}
                  </Badge>
                  <span>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}