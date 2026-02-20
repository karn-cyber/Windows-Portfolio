'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const API_URL = 'https://ubot-chat.vercel.app/api/chat/neelkarn'

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm Neel's AI assistant. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMessage = { role: 'user', content: input.trim(), timestamp }
    const history = [...messages, userMessage]

    setMessages(history)
    setInput('')
    setIsLoading(true)

    // Add streaming bot placeholder
    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true
      }
    ])

    try {
      const apiMessages = history.map(({ role, content }) => ({ role, content }))

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // Always read as stream
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        // Keep the last (potentially incomplete) line in the buffer
        buffer = lines.pop()

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === 'data: [DONE]') continue

          if (trimmed.startsWith('data: ')) {
            try {
              const json = JSON.parse(trimmed.slice(6))

              // Vercel AI SDK stream format: {"type":"text-delta","delta":"..."}
              if (json.type === 'text-delta' && json.delta) {
                accumulated += json.delta
              }
              // OpenAI-compatible streaming format
              else if (json.choices?.[0]?.delta?.content) {
                accumulated += json.choices[0].delta.content
              }
              // Plain text delta
              else if (typeof json.delta === 'string') {
                accumulated += json.delta
              }

              if (accumulated) {
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: accumulated
                  }
                  return updated
                })
              }
            } catch {
              // Not JSON — treat raw text after "data: " as a delta
              const plain = trimmed.slice(6)
              if (plain && plain !== '[DONE]') {
                accumulated += plain
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: accumulated
                  }
                  return updated
                })
              }
            }
          }
        }
      }

      // Finalize — remove streaming cursor
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          isStreaming: false
        }
        return updated
      })
    } catch (err) {
      console.error('ChatBot error:', err)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: '⚠️ Could not reach the server. Please try again.',
          isStreaming: false,
          isError: true
        }
        return updated
      })
    } finally {
      setIsLoading(false)
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Simple markdown → JSX renderer
  const renderMarkdown = (text) => {
    if (!text) return null
    return text.split('\n').map((line, i) => {
      // ### Heading
      const h3 = line.match(/^###\s+(.+)/)
      if (h3) return <div key={i} className="font-bold text-blue-800 mt-2 mb-0.5">{h3[1]}</div>
      // ## Heading
      const h2 = line.match(/^##\s+(.+)/)
      if (h2) return <div key={i} className="font-bold text-blue-900 text-sm mt-2 mb-0.5">{h2[1]}</div>
      // --- separator
      if (line.trim() === '---') return <hr key={i} className="border-gray-300 my-1" />
      // Empty line
      if (!line.trim()) return <div key={i} className="h-1" />
      // Inline: bold, italic, links, inline code
      const parts = []
      let remaining = line
      let idx = 0
      const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((https?:\/\/.+?)\))/g
      let match
      let last = 0
      regex.lastIndex = 0
      while ((match = regex.exec(remaining)) !== null) {
        if (match.index > last) parts.push(<span key={`t${i}-${last}`}>{remaining.slice(last, match.index)}</span>)
        if (match[2]) parts.push(<strong key={`b${i}-${match.index}`}>{match[2]}</strong>)
        else if (match[3]) parts.push(<em key={`e${i}-${match.index}`}>{match[3]}</em>)
        else if (match[4]) parts.push(<code key={`c${i}-${match.index}`} className="bg-gray-100 px-1 rounded text-xs font-mono">{match[4]}</code>)
        else if (match[5]) parts.push(<a key={`l${i}-${match.index}`} href={match[6]} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">{match[5]}</a>)
        last = match.index + match[0].length
        idx++
      }
      if (last < remaining.length) parts.push(<span key={`t${i}-end`}>{remaining.slice(last)}</span>)
      // Bullet point
      const bullet = line.match(/^[-*]\s+(.+)/)
      if (bullet) return <div key={i} className="flex gap-1.5 leading-snug"><span className="text-gray-500 mt-0.5 flex-shrink-0">•</span><span>{parts.length ? parts : bullet[1]}</span></div>
      // Numbered list
      const numbered = line.match(/^(\d+)\.\s+(.+)/)
      if (numbered) return <div key={i} className="flex gap-1.5 leading-snug"><span className="text-gray-500 flex-shrink-0 w-4">{numbered[1]}.</span><span>{parts.length ? parts : numbered[2]}</span></div>
      return <div key={i} className="leading-snug">{parts.length ? parts : line}</div>
    })
  }

  return (
    <div
      className="h-full flex flex-col bg-white overflow-hidden"
      style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
    >
      {/* ── MSN Messenger-style Contact Header ── */}
      <div
        className="flex items-center gap-3 px-3 py-2 flex-shrink-0"
        style={{ background: 'linear-gradient(180deg, #1a6be8 0%, #003cb3 100%)' }}
      >
        <div className="relative flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow"
            style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)' }}
          >
            N
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-bold leading-tight">Neel&apos;s Bot</div>
          <div className="text-blue-200 text-xs leading-tight truncate">
            ● Online – Ask me anything!
          </div>
        </div>

        {/* MSN logo badge */}
        <Image
          src="/xp-icons/MSN Messenger.png"
          alt="MSN Messenger"
          width={32}
          height={32}
          unoptimized
          className="opacity-90 flex-shrink-0"
        />
      </div>

      {/* ── Menu Bar ── */}
      <div className="flex items-center px-1 py-0.5 bg-gray-100 border-b border-gray-300 flex-shrink-0">
        {['File', 'Edit', 'View', 'Actions', 'Help'].map(m => (
          <button
            key={m}
            className="px-2 py-0.5 text-xs hover:bg-blue-100 hover:text-blue-800 rounded-sm"
          >
            {m}
          </button>
        ))}
      </div>

      {/* ── Messages Area ── */}
      <div
        className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3"
        style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #f8f9ff 40%, #ffffff 100%)' }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow mb-0.5"
              style={{
                background:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg, #6b7280, #374151)'
                    : 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
              }}
            >
              {msg.role === 'user' ? 'U' : 'N'}
            </div>

            <div
              className={`max-w-[72%] flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {/* Name + timestamp – MSN style */}
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className="text-xs font-bold"
                  style={{ color: msg.role === 'user' ? '#1d4ed8' : '#b91c1c' }}
                >
                  {msg.role === 'user' ? 'You' : 'NBot'}
                </span>
                <span className="text-xs text-gray-400">says ({msg.timestamp}):</span>
              </div>

              {/* Bubble */}
              <div
                className={`text-sm leading-relaxed px-3 py-2 border rounded-sm ${
                  msg.isError
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-white border-gray-200 text-gray-800'
                }`}
                style={{ wordBreak: 'break-word', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}
              >
                {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}

                {/* Typing dots when empty + streaming */}
                {msg.isStreaming && !msg.content && (
                  <span className="flex items-center gap-1 py-0.5">
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </span>
                )}

                {/* Streaming cursor */}
                {msg.isStreaming && msg.content && (
                  <span className="opacity-60 animate-pulse">▌</span>
                )}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Divider ── */}
      <div className="border-t-2 border-gray-300 flex-shrink-0" />

      {/* ── Input Area ── */}
      <div className="bg-gray-50 flex-shrink-0">
        {/* Formatting toolbar */}
        <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200">
          <button className="px-1.5 py-0.5 text-xs font-bold border border-gray-300 bg-white hover:bg-gray-100 leading-none">
            B
          </button>
          <button className="px-1.5 py-0.5 text-xs italic border border-gray-300 bg-white hover:bg-gray-100 leading-none">
            I
          </button>
          <button className="px-1.5 py-0.5 text-xs underline border border-gray-300 bg-white hover:bg-gray-100 leading-none">
            U
          </button>
          <div className="w-px h-3 bg-gray-300 mx-1" />
          <span className="text-sm select-none cursor-default">😊</span>
          <span className="text-sm select-none cursor-default">😎</span>
          <div className="flex-1" />
          <span className="text-xs text-gray-400 italic">Enter to send · Shift+Enter for new line</span>
        </div>

        {/* Textarea + Send button */}
        <div className="flex gap-2 p-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isLoading}
            rows={2}
            className="flex-1 border border-gray-300 p-2 text-sm resize-none outline-none focus:border-blue-500 bg-white"
            style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              minHeight: '52px',
              maxHeight: '52px'
            }}
          />

          <div className="flex flex-col justify-end">
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 text-xs font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              style={{
                background: 'linear-gradient(180deg, #5588ff 0%, #0039b3 100%)',
                border: '1px solid #003399',
                borderTopColor: '#99bbff',
                borderLeftColor: '#99bbff',
                minWidth: '60px'
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
