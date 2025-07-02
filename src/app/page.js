'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
      type: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const fullPrompt = pdfText
      ? `${trimmed}\n\nHere is some context from the uploaded PDF:\n${pdfText}`
      : trimmed;

    await handleBotReply(fullPrompt);
  };

  const handleBotReply = async (userInput) => {
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const fullText = data.response || '🤖 Gemini returned an empty response.';

      // Typing animation
      let index = 0;
      let tempText = '';
      const id = Date.now();

      const interval = setInterval(() => {
        tempText += fullText[index++];
        const animatedMsg = {
          id,
          role: 'bot',
          content: tempText,
          type: 'text',
        };
        setMessages((prev) => [...prev.filter((m) => m.id !== id), animatedMsg]);

        if (index >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20);
    } catch (err) {
      console.error('Gemini error:', err);
      const errorMessage = {
        id: Date.now(),
        role: 'bot',
        content: '❌ Failed to fetch response from Gemini.',
        type: 'text',
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileMessage = {
      id: Date.now(),
      role: 'user',
      content: `📄 PDF uploaded: ${file.name}`,
      type: 'pdf',
    };

    setMessages((prev) => [...prev, fileMessage]);

    const reader = new FileReader();
    reader.onload = async function () {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await window.pdfjsLib.getDocument({ data: typedArray }).promise;

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        fullText += strings.join(' ') + '\n';
      }

      setPdfText(fullText);
      console.log('📄 Parsed PDF Content:\n', fullText);
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`${darkMode ? 'dark bg-[#0d0d0d] text-white' : 'bg-[#f9fafb] text-black'} min-h-screen`}>
      <div className="flex justify-between items-center px-6 py-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">🤖 PDF Chatbot</h1>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="text-sm border px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg border rounded-xl overflow-hidden">
        <CardContent className="h-full p-4">
          <ScrollArea className="h-[70vh] pr-2">
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-end ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-sm text-white mr-2">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                        : 'bg-gray-100 text-gray-900 dark:bg-[#1f1f1f] dark:text-gray-200 rounded-bl-none shadow'
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-500 ml-2"
                >
                  Typing...
                </motion.div>
              )}

              <div ref={scrollRef} className="h-4" />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <form
        onSubmit={handleSend}
        className="mt-4 mb-6 max-w-4xl mx-auto w-full px-4 flex gap-2 items-center"
      >
        <Input
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Send
        </Button>
        <label className="text-sm cursor-pointer hover:underline text-blue-600">
          📎 Upload PDF
          <input
            type="file"
            accept=".pdf"
            onChange={handlePDFUpload}
            className="hidden"
          />
        </label>
      </form>
    </div>
  );
}
