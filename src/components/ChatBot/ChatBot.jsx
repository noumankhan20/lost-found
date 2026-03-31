"use client";
import { useState, useRef, useEffect } from "react";
import { useSendMessageMutation } from "@/redux/slices/chatApiSlice";
import { useRouter } from "next/navigation";

// ── Icons (inline SVG — no extra deps) ───────────────────────────────────────
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BotIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <line x1="12" y1="7" x2="12" y2="11" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3.5 py-3">
      <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-[cbDot_1.1s_ease-in-out_0s_infinite]" />
      <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-[cbDot_1.1s_ease-in-out_0.18s_infinite]" />
      <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-[cbDot_1.1s_ease-in-out_0.36s_infinite]" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! I'm here to help you find lost items or report found ones. What can I assist you with?" }
  ]);
  const [input, setInput] = useState("");
  const [intent, setIntent] = useState(null);
  const [open, setOpen] = useState(false);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isLoading]);

  // Focus input when opening
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    try {
      const updatedMessages = [...messages, { sender: "user", text }];

      const formattedHistory = updatedMessages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));

      const res = await sendMessage({
        message: text,
        history: formattedHistory,
        intent: intent
      }).unwrap();

      if (res.action === "go_to_report_lost") router.push("/report-lost");
      if (res.action === "go_to_report_found") router.push("/report-found");
      if (res.action === "go_to_browse_items") router.push("/browse-items");
      if (res.intent) setIntent(res.intent);

      setMessages((prev) => [...prev, {
        sender: "bot", text: res.reply, type: res.type,
        items: res.items || [], action: res.action
      }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong. Please try again." }]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const unread = !open && messages.filter(m => m.sender === "bot").length > 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Syne:wght@600;700&display=swap');
        .cb-font { font-family: 'DM Sans', sans-serif; }
        .cb-font-syne { font-family: 'Syne', sans-serif; }
        @keyframes cbDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

      <div className="cb-font fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

        {/* ── Chat panel ── */}
        <div
          className={`w-[340px] bg-white rounded-[20px] border border-black/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.06)] flex flex-col origin-bottom-right transition-all duration-200
            ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 translate-y-2 pointer-events-none"}
            max-[400px]:w-[calc(100vw-32px)]`}
        >

          {/* Header */}
          <div className="flex items-center justify-between px-[18px] py-4 bg-[#C0001A] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0">
                <BotIcon />
              </div>
              <div>
                <p className="cb-font-syne text-[13.5px] font-bold text-white tracking-[-0.01em] leading-[1.2]">FindIt Assistant</p>
                <div className="flex items-center gap-1.5 mt-[1px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  <span className="text-[10.5px] text-white/70 font-normal tracking-[0.01em]">Online · here to help</span>
                </div>
              </div>
            </div>
            <button
              className="w-7 h-7 rounded-lg bg-white/[0.12] border border-white/[0.16] cursor-pointer flex items-center justify-center text-white/85 hover:bg-white/20 transition-colors shrink-0"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <ChevronDownIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="overflow-y-auto h-[300px] min-h-[300px] max-h-[300px] p-4 flex flex-col gap-2.5 bg-[#fafafa] [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-lg bg-red-50 border border-[#C0001A]/[0.12] flex items-center justify-center text-[#C0001A] shrink-0 mt-0.5">
                    <BotIcon />
                  </div>
                )}
                <div
                  className={`max-w-[230px] px-[13px] py-2.5 rounded-[14px] text-[13.5px] leading-[1.55] font-normal break-words
                    ${msg.sender === "bot"
                      ? "bg-white text-[#111] border border-black/[0.08] rounded-bl-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                      : "bg-[#C0001A] text-white rounded-br-[4px]"
                    }`}
                >
                  <div>{msg.text}</div>

                  {msg.type === "list" && msg.items?.length > 0 && (
                    <ul className="mt-1.5 pl-4 list-disc">
                      {msg.items.map((item, idx) => (
                        <li key={idx} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  )}

                  {msg.sender === "bot" && msg.type === "action" && msg.action === "none" && (
                    <button
                      onClick={() => {
                        const isReport = msg.intent === "report";
                        const route = isReport ? "/report-lost" : "/report-found";
                        const replyText = isReport
                          ? "Taking you to Report Lost Item page!"
                          : "Taking you to Report Found Item page!";

                        setMessages((prev) => [
                          ...prev,
                          { sender: "user", text: "Yes, take me there" },
                          { sender: "bot", text: replyText, type: "action", items: [], action: "done" }
                        ]);
                        router.push(route);
                      }}
                      className="mt-2 bg-[#C0001A] text-white border-none px-2.5 py-1.5 rounded-lg cursor-pointer text-xs"
                    >
                      Yes, take me there
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-lg bg-red-50 border border-[#C0001A]/[0.12] flex items-center justify-center text-[#C0001A] shrink-0 mt-0.5">
                  <BotIcon />
                </div>
                <div className="bg-white border border-black/[0.08] rounded-[14px] rounded-bl-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Divider */}
          <div className="h-px bg-black/[0.06] shrink-0" />

          {/* Input */}
          <div className="flex items-end gap-2 px-3.5 py-3 bg-white shrink-0">
            <div className="flex-1 bg-[#f5f5f5] border border-black/[0.08] rounded-xl flex items-center overflow-hidden focus-within:border-[#C0001A]/30 focus-within:bg-white transition-all">
              <textarea
                ref={inputRef}
                className="cb-font flex-1 resize-none border-none outline-none bg-transparent text-[13.5px] font-normal text-[#111] px-3 py-[9px] leading-[1.45] min-h-9 max-h-[90px] placeholder:text-black/30"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask something…"
              />
            </div>
            <button
              className="w-9 h-9 rounded-[10px] bg-[#C0001A] border-none cursor-pointer flex items-center justify-center text-white shrink-0 shadow-[0_2px_8px_rgba(192,0,26,0.25)] hover:bg-[#a0001a] hover:shadow-[0_3px_12px_rgba(192,0,26,0.35)] disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none transition-all"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>

          {/* Footer */}
          <div className="px-3.5 pb-2.5 pt-1.5 text-center bg-white">
            <p className="text-[10.5px] text-black/[0.22] tracking-[0.04em]">
              Powered by <span className="text-[#C0001A] font-semibold">FindIt</span>
            </p>
          </div>
        </div>

        {/* ── FAB ── */}
        <button
          className="w-[52px] h-[52px] rounded-2xl bg-[#C0001A] border-none cursor-pointer flex items-center justify-center text-white shadow-[0_4px_20px_rgba(192,0,26,0.32),0_1px_4px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_28px_rgba(192,0,26,0.42),0_2px_6px_rgba(0,0,0,0.14)] hover:-translate-y-px active:translate-y-0 transition-all relative shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? <CloseIcon /> : <BotIcon />}
          {unread && (
            <span className="absolute -top-[3px] -right-[3px] w-2.5 h-2.5 bg-[#111] border-2 border-white rounded-full" />
          )}
        </button>

      </div>
    </>
  );
}