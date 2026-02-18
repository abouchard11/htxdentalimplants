"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Loader2 } from "lucide-react";
import { trackEvent } from "./Analytics";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/phone";

interface Message {
  role: "user" | "assistant";
  content: string;
  leadSubmitted?: boolean;
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much do implants cost?",
    a: "Single tooth implants start around $1,500–$3,000. All-on-4 runs $15,000–$25,000 per arch. Most Houston specialists offer financing from $89/month. Want me to get you 3 free quotes?",
  },
  {
    q: "Am I a candidate?",
    a: "Most people qualify — even if you've been told you have bone loss. Same-day implants and bone grafting can help. The only way to know for sure is a free consultation with a specialist.",
  },
  {
    q: "Does it hurt?",
    a: "Implant placement is done under local anesthesia — most patients say it's less painful than a tooth extraction. Sedation options are available for anxious patients.",
  },
  {
    q: "How long does it take?",
    a: "Same-day implants can be placed in one visit. Traditional implants take 3–6 months total (healing time included). All-on-4 can often be completed in 1–2 visits.",
  },
  {
    q: "What's All-on-4?",
    a: "All-on-4 uses just 4 implants to support a full arch of teeth — upper or lower. It's a permanent, fixed solution. No adhesives, no removing at night. Most patients love the life change.",
  },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the HTX Dental Implants assistant. I can answer questions about implant costs, procedures, and match you with a top Houston specialist — totally free. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function handleOpen() {
    setOpen(true);
    trackEvent("chatbot_open");
  }

  function handleFaq(faq: { q: string; a: string }) {
    const userMsg: Message = { role: "user", content: faq.q };
    const botMsg: Message = { role: "assistant", content: faq.a };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    trackEvent("chatbot_faq_click", { question: faq.q });
  }

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    trackEvent("chatbot_message_sent");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      if (data.leadSubmitted) {
        setLeadDone(true);
        trackEvent("chatbot_lead_submitted");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I had a hiccup. Call us directly at ${PHONE_DISPLAY} and we'll get you sorted out right away.`,
        },
      ]);
    }

    setLoading(false);
  }

  const showFaqs = messages.length <= 1;

  return (
    <>
      {/* Chat bubble */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-xl hover:bg-primary-dark transition-all hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-semibold hidden sm:block">Chat with us</span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col w-[340px] sm:w-[380px] max-h-[560px] rounded-2xl border border-border bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-secondary px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-sm font-bold text-white">HTX Dental Implants</p>
                <p className="text-xs text-white/70">AI Assistant · Usually instant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${PHONE_E164}`}
                onClick={() => trackEvent("chatbot_call_click")}
                className="flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
              >
                <Phone className="h-3 w-3" />
                Call
              </a>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white border border-border text-gray-800 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* FAQ quick-replies — show after first bot message only */}
            {showFaqs && (
              <div className="space-y-1.5 pt-1">
                <p className="text-xs text-gray-400 font-medium">Common questions:</p>
                {FAQS.map((faq) => (
                  <button
                    key={faq.q}
                    onClick={() => handleFaq(faq)}
                    className="w-full text-left rounded-xl border border-border bg-white px-3 py-2 text-xs text-gray-700 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </div>
            )}

            {/* Callback CTA after lead submitted */}
            {leadDone && (
              <div className="rounded-xl bg-success/10 border border-success/20 px-3.5 py-3 text-xs text-gray-700">
                ✅ You&apos;re matched! Expect a call within 24 hours. Want to skip the wait?{" "}
                <a href={`tel:${PHONE_E164}`} className="font-semibold text-primary underline">
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border bg-white px-3 py-2.5">
            {/* Callback shortcut */}
            {!leadDone && (
              <button
                onClick={() => sendMessage("I'd prefer a callback instead of filling a form")}
                className="w-full mb-2 rounded-lg bg-accent/10 border border-accent/20 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors text-left"
              >
                📞 Prefer a callback? We&apos;ll call you — no forms needed
              </button>
            )}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about dental implants..."
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-secondary placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex-shrink-0 rounded-lg bg-primary p-2 text-white hover:bg-primary-dark transition-colors disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
