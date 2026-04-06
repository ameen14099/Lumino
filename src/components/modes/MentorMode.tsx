'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import type { Book, MentorMessage } from '@/types';

interface MentorModeProps {
  book: Book;
}

const initialMessages: Record<string, MentorMessage[]> = {
  'atomic-habits': [
    {
      id: '1',
      role: 'assistant',
      content: "Hey there! I'm here to discuss the concepts from Atomic Habits with you — as if you were having a conversation with the author. I'll help you understand how to build better habits using the frameworks from the book.\n\nWhat habit are you trying to build or break? Tell me about your situation and I'll help you apply these principles to your specific life.",
      timestamp: new Date().toISOString(),
    },
  ],
  'default': [
    {
      id: '1',
      role: 'assistant',
      content: "Welcome! I'm here to discuss the key concepts from this book with you in a conversational way. Think of me as a knowledgeable guide who can explain the ideas, challenge your thinking, and help you apply the frameworks to your own life.\n\nWhat would you like to explore? Ask me anything about the book's concepts.",
      timestamp: new Date().toISOString(),
    },
  ],
};

export default function MentorMode({ book }: MentorModeProps) {
  const [messages, setMessages] = useState<MentorMessage[]>(
    initialMessages[book.id] || initialMessages['default']
  );
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;

    const userMsg: MentorMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (will be replaced with Claude API)
    setTimeout(() => {
      const responses = [
        `Great question! Let me think about that in the context of ${book.title}.\n\nThe key insight here is that lasting change comes from shifting your identity rather than just setting goals. Instead of saying "I want to read more," try "I am a reader." Every action becomes a vote for the type of person you want to become.\n\nHow does this resonate with your situation? What identity shift would support the change you're trying to make?`,
        `That's something many people struggle with. Here's how I'd think about it using the frameworks from ${book.title}:\n\nFirst, make it tiny. The Two-Minute Rule says you should scale any new habit down to just two minutes. Want to read more? Start with "read one page." Want to exercise? Start with "put on your running shoes."\n\nThe point isn't to do less — it's to master the art of showing up. Once you've started, you'll often continue. What's the smallest version of the habit you're trying to build?`,
        `Interesting perspective! Let me push back a little here, because I think there's a nuance worth exploring.\n\nThe book argues that we don't rise to the level of our goals — we fall to the level of our systems. So the real question isn't "What's my goal?" but "What system would make that goal inevitable?"\n\nThink about your environment: What one change could you make to your space, schedule, or routines that would make the right behavior the path of least resistance?`,
      ];

      const aiMsg: MentorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  }

  const suggestedQuestions = [
    `How do I start building a ${book.concepts[0]?.name.toLowerCase()} habit?`,
    `What's the most important concept from ${book.title}?`,
    `I keep failing at my habits. What am I doing wrong?`,
    `How do I stay motivated when I don't see results?`,
  ];

  return (
    <div className="flex flex-col h-[600px] rounded-2xl border border-border bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
          >
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">{book.author} AI Mentor</h3>
            <p className="text-xs text-muted">Discuss concepts from {book.title}</p>
          </div>
        </div>
        <button
          onClick={() => setMessages(initialMessages[book.id] || initialMessages['default'])}
          className="p-2 rounded-lg hover:bg-primary-light transition-colors"
          title="Reset conversation"
        >
          <RotateCcw className="h-4 w-4 text-muted" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-primary-light'
                  : ''
              }`}
              style={msg.role === 'assistant' ? {
                background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})`
              } : undefined}
            >
              {msg.role === 'user'
                ? <User className="h-4 w-4 text-primary" />
                : <Bot className="h-4 w-4 text-white" />
              }
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-primary/5 border border-border rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
            >
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-primary/5 border border-border rounded-2xl rounded-bl-md px-5 py-3.5">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggested questions (only show at start) */}
        {messages.length <= 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold text-muted flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Try asking:
            </p>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                }}
                className="block w-full text-left text-sm px-4 py-2.5 rounded-xl border border-border hover:border-primary hover:bg-primary-light transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-border bg-surface">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask about ${book.title}...`}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-xl bg-primary text-white hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
