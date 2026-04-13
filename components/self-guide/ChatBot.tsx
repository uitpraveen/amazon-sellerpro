"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  selfGuideTree,
  getQuestionNumber,
  getTotalQuestions,
  type BotNode,
} from "@/lib/selfGuideTree";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
  endState?: BotNode["endState"];
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<BotNode | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with intro message
    addBotMessage(selfGuideTree.start.message, "start-intro");
    setTimeout(() => {
      showQuestion("q1");
    }, 1500);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function addBotMessage(text: string, id: string) {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id, type: "bot", text }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  }

  function showQuestion(nodeId: string) {
    const node = selfGuideTree[nodeId];
    if (!node) return;

    setIsTyping(true);
    const qNum = getQuestionNumber(nodeId);
    setQuestionNum(qNum);

    setTimeout(() => {
      setMessages((prev) => [...prev, { id: nodeId, type: "bot", text: node.message }]);
      setCurrentNode(node);
      setIsTyping(false);
    }, 1000);
  }

  function handleChoice(label: string, nextId: string) {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, type: "user", text: label },
    ]);
    setCurrentNode(null);

    const nextNode = selfGuideTree[nextId];
    if (!nextNode) return;

    if (nextNode.endState) {
      // Show end state
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId,
            type: "bot",
            text: "",
            endState: nextNode.endState,
          },
        ]);
        setIsTyping(false);
        setQuestionNum(getTotalQuestions());
      }, 1200);
    } else {
      showQuestion(nextId);
    }
  }

  const progress =
    questionNum > 0 ? (questionNum / getTotalQuestions()) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto bg-[#0a0e17] rounded-2xl border border-[#1a1f2e] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1a1f2e] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#3fb950] flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <div className="font-bold text-white text-sm">Safety Pro Guide</div>
          <div className="text-[#3fb950] text-xs">Online</div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[450px] overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.endState ? (
                <EndStateCard endState={msg.endState} />
              ) : msg.type === "bot" ? (
                <BotMessageBubble text={msg.text} />
              ) : (
                <UserMessageBubble text={msg.text} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Choice buttons */}
        <AnimatePresence>
          {currentNode?.options && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="ml-10 flex flex-col gap-2"
            >
              {currentNode.options.map((opt, i) => (
                <motion.button
                  key={opt.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleChoice(opt.label, opt.nextId)}
                  className="text-left border border-[#4fc3f7] text-[#4fc3f7] rounded-xl px-4 py-3 text-sm hover:bg-[#4fc3f7] hover:text-black transition-all duration-200"
                >
                  {opt.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Progress bar */}
      <div className="px-6 py-3 border-t border-[#1a1f2e]">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 text-xs">
            {questionNum > 0
              ? `Question ${Math.min(questionNum, getTotalQuestions())} of ${getTotalQuestions()}`
              : "Getting started..."}
          </span>
          <span className="text-[#4fc3f7] text-xs">{Math.round(progress)}%</span>
        </div>
        <div className="bg-[#1a1f2e] h-1 rounded-full overflow-hidden">
          <motion.div
            className="bg-[#4fc3f7] h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

function BotMessageBubble({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <div className="w-7 h-7 rounded-full bg-[#1a2535] flex items-center justify-center text-xs shrink-0">
        🤖
      </div>
      <div className="bg-[#1a2535] rounded-r-xl rounded-bl-xl px-4 py-3 max-w-[80%]">
        <p className="text-gray-200 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UserMessageBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-[#4fc3f7] text-black rounded-l-xl rounded-br-xl px-4 py-3 max-w-[80%]">
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-2"
    >
      <div className="w-7 h-7 rounded-full bg-[#1a2535] flex items-center justify-center text-xs shrink-0">
        🤖
      </div>
      <div className="bg-[#1a2535] rounded-r-xl rounded-bl-xl px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#4fc3f7]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EndStateCard({ endState }: { endState: NonNullable<BotNode["endState"]> }) {
  const colors = {
    can_help: { border: "border-[#3fb950]", bg: "bg-[#3fb950]/10", text: "text-[#3fb950]" },
    book_consultation: { border: "border-[#f0883e]", bg: "bg-[#f0883e]/10", text: "text-[#f0883e]" },
    cannot_reinstate: { border: "border-[#e53935]", bg: "bg-[#e53935]/10", text: "text-[#e53935]" },
  };
  const c = colors[endState.type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${c.border} ${c.bg} border-2 rounded-xl p-6 ml-10`}
    >
      <h3 className={`${c.text} font-bold text-lg mb-2`}>{endState.title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{endState.message}</p>
      <Link
        href={endState.cta.href}
        className="inline-block bg-[#4fc3f7] text-black font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-[#81d4fa] transition-colors"
      >
        {endState.cta.label}
      </Link>
    </motion.div>
  );
}
