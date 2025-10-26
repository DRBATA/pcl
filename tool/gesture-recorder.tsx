'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface GestureEvent {
  type: string
  details: string
  timestamp: number
}

interface GestureRecorderProps {
  onGestureRecorded: (gesture: GestureEvent) => void
}

export function GestureRecorder({ onGestureRecorded }: GestureRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [gesture, setGesture] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.strokeStyle = 'blue'
        context.lineWidth = 2
        contextRef.current = context
      }
    }
  }, [])

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isRecording) return
    const { offsetX, offsetY } = event.nativeEvent
    contextRef.current?.beginPath()
    contextRef.current?.moveTo(offsetX, offsetY)
    setIsDrawing(true)
    setStartPoint({ x: offsetX, y: offsetY })
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isRecording) return
    const { offsetX, offsetY } = event.nativeEvent
    contextRef.current?.lineTo(offsetX, offsetY)
    contextRef.current?.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing || !startPoint) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return

    const endPoint = { x: canvas.width / 2, y: canvas.height / 2 }
    const gesture = interpretGesture(startPoint, endPoint)
    setGesture(gesture.type)
    onGestureRecorded({ ...gesture, timestamp: Date.now() })

    setTimeout(() => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
      setGesture(null)
    }, 1000)
  }

  const interpretGesture = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const dx = end.x - start.x
    const dy = end.y - start.y

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        return { type: 'swipe-right', details: 'Airway patent' }
      } else {
        return { type: 'swipe-left', details: 'Airway obstructed' }
      }
    } else {
      if (dy > 0) {
        return { type: 'swipe-down', details: 'Start chest compressions' }
      } else {
        return { type: 'swipe-up', details: 'Check breathing' }
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Medical Gesture Recorder</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-64 bg-gray-100 rounded-lg mb-4"
        />
        <motion.div
          className="text-center mb-4"
          animate={gesture ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {gesture && <p className="text-blue-500 font-bold">{gesture}</p>}
        </motion.div>
        <Button 
          onClick={() => setIsRecording(!isRecording)}
          className="w-full"
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </CardContent>
    </Card>
  )
}

