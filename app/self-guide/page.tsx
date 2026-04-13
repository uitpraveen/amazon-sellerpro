"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  selfGuideTree,
  getQuestionNumber,
  getTotalQuestions,
  type BotNode,
} from "@/lib/selfGuideTree";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
  endState?: BotNode["endState"];
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function BotAvatar({ size = "sm" }: { size?: "sm" | "md" }) {
  const dim = size === "md" ? "w-10 h-10" : "w-8 h-8";
  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shrink-0 shadow-md`}
    >
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    </div>
  );
}

function BotMessageBubble({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <BotAvatar />
      <div className="bg-[#EFF6FF] rounded-2xl rounded-tl-md px-5 py-3.5 max-w-[80%] shadow-sm">
        <p className="text-[#1E293B] text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UserMessageBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-[#2563EB] rounded-2xl rounded-tr-md px-5 py-3.5 max-w-[80%] shadow-sm">
        <p className="text-white text-sm font-medium leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-3 items-start"
    >
      <BotAvatar />
      <div className="bg-[#EFF6FF] rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#2563EB]"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EndStateCard({
  endState,
}: {
  endState: NonNullable<BotNode["endState"]>;
}) {
  const isSupportable = endState.type === "can_help";
  const isUnsupportable = endState.type === "cannot_reinstate";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`ml-11 rounded-2xl p-6 border-2 shadow-lg ${
        isSupportable
          ? "border-[#22C55E] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]"
          : isUnsupportable
          ? "border-[#EF4444] bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2]"
          : "border-[#F97316] bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5]"
      }`}
    >
      {/* Icon */}
      <div className="mb-3">
        {isSupportable ? (
          <div className="w-10 h-10 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#16A34A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        ) : isUnsupportable ? (
          <div className="w-10 h-10 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#EF4444]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#F97316]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </div>
        )}
      </div>

      <h3
        className={`font-bold text-lg mb-2 ${
          isSupportable
            ? "text-[#16A34A]"
            : isUnsupportable
            ? "text-[#DC2626]"
            : "text-[#EA580C]"
        }`}
      >
        {endState.title}
      </h3>
      <p className="text-[#475569] text-sm leading-relaxed mb-5">
        {endState.message}
      </p>
      <Link
        href={endState.cta.href}
        className={`inline-block font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
          isSupportable
            ? "bg-[#F97316] text-white hover:bg-[#EA580C]"
            : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
        }`}
      >
        {endState.cta.label}
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function SelfGuidePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<BotNode | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const addBotMessage = useCallback((text: string, id: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id, type: "bot", text }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  }, []);

  const showQuestion = useCallback((nodeId: string) => {
    const node = selfGuideTree[nodeId];
    if (!node) return;

    setIsTyping(true);
    const qNum = getQuestionNumber(nodeId);
    setQuestionNum(qNum);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nodeId, type: "bot", text: node.message },
      ]);
      setCurrentNode(node);
      setIsTyping(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    addBotMessage(selfGuideTree.start.message, "start-intro");
    setTimeout(() => {
      showQuestion("q1");
    }, 1500);
  }, [addBotMessage, showQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleChoice(label: string, nextId: string) {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, type: "user", text: label },
    ]);
    setCurrentNode(null);

    const nextNode = selfGuideTree[nextId];
    if (!nextNode) return;

    if (nextNode.endState) {
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

  function handleRestart() {
    setIsRestarting(true);
    setTimeout(() => setIsRestarting(false), 600);

    setMessages([]);
    setCurrentNode(null);
    setIsTyping(false);
    setQuestionNum(0);

    setTimeout(() => {
      addBotMessage(selfGuideTree.start.message, "start-intro");
      setTimeout(() => {
        showQuestion("q1");
      }, 1500);
    }, 100);
  }

  const progress =
    questionNum > 0 ? (questionNum / getTotalQuestions()) * 100 : 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 px-4">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
            Product Reinstatement Self-Guide
          </h1>
          <p className="text-[#64748B] max-w-lg mx-auto text-base leading-relaxed">
            Answer a few quick questions and we&apos;ll help you understand your
            options for getting your product back on Amazon.
          </p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <BotAvatar size="md" />
              <div>
                <div className="font-bold text-[#0F172A] text-sm">
                  Safety Pro Guide
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            {/* Restart button */}
            {messages.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleRestart}
                className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#2563EB] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#EFF6FF]"
              >
                <motion.svg
                  animate={isRestarting ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                  />
                </motion.svg>
                Start Over
              </motion.button>
            )}
          </div>

          {/* Messages area */}
          <div className="h-[460px] overflow-y-auto p-6 space-y-4 bg-[#FAFBFC]">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={
                    msg.type === "bot"
                      ? { opacity: 0, x: -24, y: 8 }
                      : { opacity: 0, x: 24, y: 8 }
                  }
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
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
                  transition={{ duration: 0.3 }}
                  className="ml-11 flex flex-col gap-2"
                >
                  {currentNode.options.map((opt, i) => (
                    <motion.button
                      key={opt.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: "#2563EB",
                        backgroundColor: "#EFF6FF",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice(opt.label, opt.nextId)}
                      className="text-left bg-white border-2 border-[#E2E8F0] text-[#1E293B] rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Progress bar */}
          <div className="px-6 py-3 border-t border-[#E2E8F0] bg-white">
            <div className="flex justify-between mb-2">
              <span className="text-[#94A3B8] text-xs font-medium">
                {questionNum > 0
                  ? `Question ${Math.min(
                      questionNum,
                      getTotalQuestions()
                    )} of ${getTotalQuestions()}`
                  : "Getting started..."}
              </span>
              <span className="text-[#2563EB] text-xs font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
