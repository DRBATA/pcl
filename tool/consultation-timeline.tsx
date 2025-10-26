'use client'

import React from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TimelineEvent {
  type: string
  details: string
  timestamp: number
}

interface ConsultationTimelineProps {
  events: TimelineEvent[]
}

export function ConsultationTimeline({ events }: ConsultationTimelineProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Consultation Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {events.map((event, index) => (
            <div key={index} className="mb-4 border-l-2 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">
                {format(event.timestamp, 'HH:mm:ss')}
              </p>
              <p className="font-medium">{event.details}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

