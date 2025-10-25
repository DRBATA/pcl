"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Minimize2, Maximize2, TrendingUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface CaseChatPanelProps {
  selectedCaseId?: string
  onClose?: () => void
}

/**
 * Case Chat Panel - Bottom sheet chat interface
 * Pattern from freshChatArea.tsx
 */
export function CaseChatPanel({ selectedCaseId, onClose }: CaseChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load conversation history for selected case
  useEffect(() => {
    if (selectedCaseId && isOpen) {
      loadCaseConversation(selectedCaseId)
    }
  }, [selectedCaseId, isOpen])

  const loadCaseConversation = async (caseId: string) => {
    try {
      const { db } = await import('@/lib/dexie-db')
      const conversations = await db.aiConversations
        .where('caseId')
        .equals(caseId)
        .toArray()
      
      if (conversations.length > 0) {
        const latestConv = conversations[conversations.length - 1]
        const loadedMessages: Message[] = latestConv.messages.map((msg: any, idx: number) => ({
          id: `${caseId}-${idx}`,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: msg.timestamp
        }))
        setMessages(loadedMessages)
      }
    } catch (err) {
      console.error('Failed to load conversation:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call your chat API here
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          caseId: selectedCaseId
        })
      })

      if (!response.ok) throw new Error('API request failed')

      const data = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response || data.content,
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, assistantMessage])

      // Save to Dexie
      if (selectedCaseId) {
        const { db } = await import('@/lib/dexie-db')
        await db.aiConversations.add({
          conversationId: crypto.randomUUID(),
          caseId: selectedCaseId,
          stakeholder: 'pclTech', // or determined by context
          messages: [...messages, userMessage, assistantMessage].map(m => ({
            role: m.role,
            content: m.content,
            timestamp: m.timestamp
          })),
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
      }
    } catch (err) {
      console.error('Chat error:', err)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  // Toggle chat
  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Floating Chat Button (bottom right) */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center z-50"
        >
          <MessageCircle className="w-6 h-6" />
          {messages.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 flex items-center justify-center bg-red-500">
              {messages.length}
            </Badge>
          )}
        </motion.button>
      )}

      {/* Chat Panel (bottom sheet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50",
              isExpanded ? "h-[80vh]" : "h-[400px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarFallback className="bg-purple-700">AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Case Assistant</h3>
                  <p className="text-xs text-white/80">
                    {selectedCaseId ? `Case #${selectedCaseId.slice(0, 8)}` : 'General Help'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => {
                    setIsOpen(false)
                    onClose?.()
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Report vs Biopsy Plan Toggle */}
            {selectedCaseId && (
              <div className="border-b bg-gray-50 p-3">
                <Tabs defaultValue="chat" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="report">
                      <FileText className="w-4 h-4 mr-2" />
                      Report
                    </TabsTrigger>
                    <TabsTrigger value="plan">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Biopsy Plan
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="report" className="mt-3">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Radiology Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">PI-RADS:</span>
                            <Badge variant="destructive">4</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gleason:</span>
                            <span className="font-medium">3+4=7</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Volume:</span>
                            <span>45cc</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="plan" className="mt-3">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Fusion Biopsy Plan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Targets:</span>
                            <span className="font-medium">4 lesions</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">MRI Fused:</span>
                            <Badge variant="default">Ready</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expected Duration:</span>
                            <span>45 min</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: isExpanded ? 'calc(80vh - 220px)' : 'calc(400px - 220px)' }}>
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">Start a conversation</p>
                  <p className="text-sm">Ask about case details, scheduling, or workflow status</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3",
                        message.role === 'user' ? "justify-end" : ""
                      )}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="w-8 h-8 border">
                          <AvatarFallback className="bg-purple-100 text-purple-700">AI</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={cn(
                          "max-w-[70%] p-3 rounded-lg text-sm",
                          message.role === 'user'
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-900 border"
                        )}
                      >
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown 
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                              code: ({ children }) => <code className="bg-black/10 px-1 rounded">{children}</code>
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        <div className={cn(
                          "text-xs mt-1",
                          message.role === 'user' ? "text-white/70" : "text-gray-500"
                        )}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t p-4 bg-gray-50">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about this case..."
                  disabled={isLoading}
                  className="resize-none min-h-[60px] flex-1"
                  rows={2}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
