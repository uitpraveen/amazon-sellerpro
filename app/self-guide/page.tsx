"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  RotateCcw,
  Check,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

const cardFont = { fontFamily: "var(--font-outfit)" };
const displayFont = { fontFamily: "var(--font-dm-serif)" };

function BotAvatar({ size = "sm" }: { size?: "sm" | "md" }) {
  const dim = size === "md" ? "w-11 h-11" : "w-9 h-9";
  const icon = size === "md" ? 20 : 16;
  return (
    <div
      className={`${dim} rounded-xl bg-gradient-to-br from-[#1B4332] to-[#0a1f15] flex items-center justify-center shrink-0 shadow-md relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(184,134,11,0.3),transparent_60%)]" />
      <Shield
        size={icon}
        strokeWidth={1.8}
        className="text-[#B8860B] relative z-10"
      />
    </div>
  );
}

function BotMessageBubble({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <BotAvatar />
      <div
        className="bg-white border border-[#E8E0D4] rounded-2xl rounded-tl-md px-5 py-3.5 max-w-[80%] shadow-sm"
        style={cardFont}
      >
        <p className="text-[#2D2A26] text-[14.5px] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UserMessageBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div
        className="bg-[#1B4332] rounded-2xl rounded-tr-md px-5 py-3.5 max-w-[80%] shadow-sm"
        style={cardFont}
      >
        <p className="text-[#FAF7F2] text-[14.5px] font-medium leading-relaxed">
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
      <div className="bg-white border border-[#E8E0D4] rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#B8860B]"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.9,
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

  const palette = isSupportable
    ? {
        border: "#B8860B",
        bg: "linear-gradient(180deg, #ffffff 0%, #FBF7EC 100%)",
        accent: "#B8860B",
        iconBg: "rgba(184,134,11,0.12)",
        ctaBg: "#B8860B",
        ctaHover: "#daa520",
        ctaText: "#1f1c19",
        Icon: Check,
      }
    : isUnsupportable
    ? {
        border: "#9B1C1C",
        bg: "linear-gradient(180deg, #ffffff 0%, #FEF2F2 100%)",
        accent: "#9B1C1C",
        iconBg: "rgba(155,28,28,0.10)",
        ctaBg: "#2D2A26",
        ctaHover: "#1f1c19",
        ctaText: "#FAF7F2",
        Icon: AlertTriangle,
      }
    : {
        border: "#1B4332",
        bg: "linear-gradient(180deg, #ffffff 0%, #F2F8F4 100%)",
        accent: "#1B4332",
        iconBg: "rgba(27,67,50,0.10)",
        ctaBg: "#1B4332",
        ctaHover: "#0a1f15",
        ctaText: "#FAF7F2",
        Icon: HelpCircle,
      };

  const { Icon } = palette;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="ml-12 rounded-2xl shadow-lg shadow-[#1B4332]/8 overflow-hidden border"
      style={{
        borderColor: palette.border + "40",
        background: palette.bg,
      }}
    >
      <div
        className="h-1"
        style={{ background: palette.accent }}
      />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: palette.iconBg, color: palette.accent }}
          >
            <Icon size={20} strokeWidth={2} />
          </div>
          <p
            className="text-[10px] font-semibold tracking-[0.22em] uppercase"
            style={{ ...cardFont, color: palette.accent }}
          >
            {isSupportable
              ? "We can help"
              : isUnsupportable
              ? "Cannot proceed"
              : "Needs more info"}
          </p>
        </div>
        <h3
          className="text-xl text-[#2D2A26] mb-2.5 leading-tight"
          style={displayFont}
        >
          {endState.title}
        </h3>
        <p
          className="text-[#6B6560] text-sm leading-relaxed mb-6"
          style={cardFont}
        >
          {endState.message}
        </p>
        <Link
          href={endState.cta.href}
          className="group inline-flex items-center gap-2 font-semibold text-xs tracking-[0.08em] uppercase px-6 py-3 rounded-lg transition-colors"
          style={{
            ...cardFont,
            background: palette.ctaBg,
            color: palette.ctaText,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = palette.ctaHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = palette.ctaBg)
          }
        >
          {endState.cta.label}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}

export default function SelfGuidePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<BotNode | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
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
    const c = messagesContainerRef.current;
    if (!c) return;
    c.scrollTo({ top: c.scrollHeight, behavior: "smooth" });
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

  const totalQ = getTotalQuestions();
  const progress = questionNum > 0 ? (questionNum / totalQ) * 100 : 0;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#FAF7F2] pt-32 pb-20 px-4 overflow-hidden">
        {/* Background ornament */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,134,11,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute top-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8860B]/20 to-transparent pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#B8860B]/25 bg-[#B8860B]/[0.06] mb-5">
              <Sparkles size={12} className="text-[#B8860B]" strokeWidth={2} />
              <span
                className="text-[10px] tracking-[0.22em] uppercase text-[#B8860B] font-semibold"
                style={cardFont}
              >
                Interactive Guide
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] leading-[1.1] mb-4"
              style={displayFont}
            >
              Find your path to{" "}
              <span className="text-[#B8860B]">reinstatement</span>
            </h1>
            <p
              className="text-[#6B6560] max-w-xl mx-auto text-base leading-relaxed"
              style={cardFont}
            >
              A short, guided conversation. Answer a few questions and
              we&rsquo;ll point you to the right next step.
            </p>
          </motion.div>

          {/* Chat container */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-[#E8E0D4] shadow-2xl shadow-[#1B4332]/8 overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-[#E8E0D4] flex items-center justify-between bg-gradient-to-b from-white to-[#FAF7F2]/40">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8860B]/40 to-transparent" />
              <div className="flex items-center gap-3">
                <BotAvatar size="md" />
                <div>
                  <div
                    className="text-[#2D2A26] text-[15px] leading-tight"
                    style={displayFont}
                  >
                    Safety Pro Guide
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[11px] text-[#6B6560] mt-0.5"
                    style={cardFont}
                  >
                    <span className="relative inline-flex w-2 h-2">
                      <span className="absolute inset-0 rounded-full bg-[#1B4332] opacity-60 animate-ping" />
                      <span className="relative w-2 h-2 rounded-full bg-[#1B4332]" />
                    </span>
                    Online · Ex-Amazon team
                  </div>
                </div>
              </div>

              {messages.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleRestart}
                  className="group flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#6B6560] hover:text-[#B8860B] transition-colors px-3 py-2 rounded-lg hover:bg-[#B8860B]/[0.06] border border-transparent hover:border-[#B8860B]/20"
                  style={cardFont}
                >
                  <motion.span
                    animate={isRestarting ? { rotate: -360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex"
                  >
                    <RotateCcw size={13} strokeWidth={2} />
                  </motion.span>
                  Start over
                </motion.button>
              )}
            </div>

            {/* Messages area */}
            <div
              ref={messagesContainerRef}
              className="h-[500px] overflow-y-auto p-6 space-y-4 bg-[#FAF7F2]/30"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={
                      msg.type === "bot"
                        ? { opacity: 0, x: -16, y: 6 }
                        : { opacity: 0, x: 16, y: 6 }
                    }
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      duration: 0.35,
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="ml-12 flex flex-col gap-2.5"
                  >
                    {currentNode.options.map((opt, i) => (
                      <motion.button
                        key={opt.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.08,
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice(opt.label, opt.nextId)}
                        className="group flex items-center justify-between text-left bg-white border border-[#E8E0D4] hover:border-[#B8860B] hover:bg-[#B8860B]/[0.04] text-[#2D2A26] rounded-xl px-5 py-3.5 text-[14px] font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#1B4332]/5"
                        style={cardFont}
                      >
                        <span>{opt.label}</span>
                        <ArrowRight
                          size={15}
                          className="text-[#B8860B]/40 group-hover:text-[#B8860B] group-hover:translate-x-1 transition-all flex-shrink-0 ml-3"
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="px-6 py-4 border-t border-[#E8E0D4] bg-white">
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-[#6B6560] text-[11px] font-semibold tracking-[0.12em] uppercase"
                  style={cardFont}
                >
                  {questionNum > 0
                    ? `Question ${Math.min(questionNum, totalQ)} of ${totalQ}`
                    : "Getting started"}
                </span>
                <span
                  className="text-[#B8860B] text-[11px] font-bold tracking-wider"
                  style={cardFont}
                >
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="bg-[#E8E0D4] h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#B8860B] to-[#daa520]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Footer micro-note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center text-xs text-[#6B6560]/70 mt-8 max-w-md mx-auto leading-relaxed"
            style={cardFont}
          >
            This is a guided overview. For a precise assessment of your case,
            request a free review with our team.
          </motion.p>
        </div>
      </main>
      <Footer />
    </>
  );
}
