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
    <div className="cb-typing">
      <span /><span /><span />
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
  const chatRef = useRef(null);
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


      if (res.action === "go_to_report_lost") {
        router.push("/report-lost");
      }

      if (res.action === "go_to_report_found") {
        router.push("/report-found");
      }

      // if (res.action === "status") {
      //   router.push("/my-claims"); 
      // }

      if (res.intent) {
        setIntent(res.intent);
      }
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

        /* ── Widget shell ── */
        .cb-shell {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── FAB trigger ── */
        .cb-fab {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: #C0001A;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 4px 20px rgba(192,0,26,0.32), 0 1px 4px rgba(0,0,0,0.12);
          transition: box-shadow 0.2s, transform 0.15s;
          position: relative;
          flex-shrink: 0;
        }
        .cb-fab:hover {
          box-shadow: 0 6px 28px rgba(192,0,26,0.42), 0 2px 6px rgba(0,0,0,0.14);
          transform: translateY(-1px);
        }
        .cb-fab:active { transform: translateY(0); }

        /* Unread dot */
        .cb-unread {
          position: absolute;
          top: -3px; right: -3px;
          width: 10px; height: 10px;
          background: #111;
          border: 2px solid #fff;
          border-radius: 50%;
        }

        /* ── Chat panel ── */
        .cb-panel {
          width: 340px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          /* Smooth open/close */
          transform-origin: bottom right;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .cb-panel.hidden {
          opacity: 0;
          transform: scale(0.94) translateY(8px);
          pointer-events: none;
        }
        .cb-panel.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
        }

        /* ── Header ── */
        .cb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px 14px;
          background: #C0001A;
          flex-shrink: 0;
        }
        .cb-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cb-avatar {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .cb-header-text {}
        .cb-header-name {
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .cb-header-status {
          display: flex; align-items: center; gap: 5px;
          margin-top: 1px;
        }
        .cb-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
        }
        .cb-header-sub {
          font-size: 10.5px;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .cb-close-btn {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.16);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.85);
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .cb-close-btn:hover { background: rgba(255,255,255,0.2); }

        /* ── Messages ── */
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 0;
          height: 300px;
          background: #fafafa;
        }
        .cb-messages::-webkit-scrollbar { width: 3px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 3px; }

        /* Message row */
        .cb-row {
          display: flex;
          gap: 8px;
        }
        .cb-row.user { flex-direction: row-reverse; }

        /* Bot avatar dot */
        .cb-bot-mark {
          width: 24px; height: 24px;
          border-radius: 8px;
          background: #fff1f2;
          border: 1px solid rgba(192,0,26,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #C0001A;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Bubble */
        .cb-bubble {
          max-width: 230px;
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.55;
          font-weight: 400;
          word-break: break-word;
        }
        .cb-bubble.bot {
          background: #ffffff;
          color: #111;
          border: 1px solid rgba(0,0,0,0.08);
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .cb-bubble.user {
          background: #C0001A;
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        /* Typing dots */
        .cb-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 14px;
        }
        .cb-typing span {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(0,0,0,0.2);
          display: inline-block;
        }
        .cb-typing span:nth-child(1) { animation: cbDot 1.1s ease-in-out 0s infinite; }
        .cb-typing span:nth-child(2) { animation: cbDot 1.1s ease-in-out 0.18s infinite; }
        .cb-typing span:nth-child(3) { animation: cbDot 1.1s ease-in-out 0.36s infinite; }
        @keyframes cbDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }

        /* Typing bubble wrapper */
        .cb-typing-wrap {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        /* ── Divider line above input ── */
        .cb-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          flex-shrink: 0;
        }

        /* ── Input row ── */
        .cb-input-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 12px 14px;
          background: #fff;
          flex-shrink: 0;
        }
        .cb-textarea-wrap {
          flex: 1;
          background: #f5f5f5;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          transition: border-color 0.15s;
          overflow: hidden;
        }
        .cb-textarea-wrap:focus-within {
          border-color: rgba(192,0,26,0.3);
          background: #fff;
        }
        .cb-textarea {
          flex: 1;
          resize: none;
          border: none;
          outline: none;
          background: transparent;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          color: #111;
          padding: 9px 12px;
          line-height: 1.45;
          min-height: 36px;
          max-height: 90px;
        }
        .cb-textarea::placeholder { color: rgba(0,0,0,0.3); }
        .cb-send {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: #C0001A;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          flex-shrink: 0;
          transition: background 0.15s, box-shadow 0.15s;
          box-shadow: 0 2px 8px rgba(192,0,26,0.25);
        }
        .cb-send:hover:not(:disabled) {
          background: #a0001a;
          box-shadow: 0 3px 12px rgba(192,0,26,0.35);
        }
        .cb-send:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* ── Footer branding ── */
        .cb-footer {
          padding: 6px 14px 10px;
          text-align: center;
          background: #fff;
        }
        .cb-footer-text {
          font-size: 10.5px;
          color: rgba(0,0,0,0.22);
          letter-spacing: 0.04em;
        }
        .cb-footer-text span {
          color: #C0001A;
          font-weight: 600;
        }

        @media (max-width: 400px) {
          .cb-panel { width: calc(100vw - 32px); }
          .cb-shell { bottom: 16px; right: 16px; }
        }
      `}</style>

      <div className="cb-shell">

        {/* ── Chat panel ── */}
        <div className={`cb-panel ${open ? "visible" : "hidden"}`} ref={chatRef}>

          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-left">
              <div className="cb-avatar">
                <BotIcon />
              </div>
              <div className="cb-header-text">
                <p className="cb-header-name">FindIt Assistant</p>
                <div className="cb-header-status">
                  <div className="cb-status-dot" />
                  <span className="cb-header-sub">Online · here to help</span>
                </div>
              </div>
            </div>
            <button className="cb-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <ChevronDownIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="cb-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`cb-row ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="cb-bot-mark">
                    <BotIcon />
                  </div>
                )}
                <div className={`cb-bubble ${msg.sender}`}>
                  <div>{msg.text}</div>

                  {msg.type === "list" && msg.items?.length > 0 && (
                    <ul style={{ marginTop: "6px", paddingLeft: "16px" }}>
                      {msg.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "4px" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {msg.sender === "bot" && msg.type === "action" && msg.action === "none" && (
                    <button
                      onClick={() => {
                        const isReport = msg.intent === "report";
                        const isFoundReport = msg.intent === "found_report";

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
                      style={{
                        marginTop: "8px", background: "#C0001A", color: "#fff",
                        border: "none", padding: "6px 10px", borderRadius: "8px",
                        cursor: "pointer", fontSize: "12px"
                      }}
                    >
                      Yes, take me there
                    </button>
                  )}
                </div>
              </div>

            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="cb-row bot">
                <div className="cb-bot-mark"><BotIcon /></div>
                <div className="cb-typing-wrap">
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Divider */}
          <div className="cb-divider" />

          {/* Input */}
          <div className="cb-input-row">
            <div className="cb-textarea-wrap">
              <textarea
                ref={inputRef}
                className="cb-textarea"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask something…"
              />
            </div>
            <button
              className="cb-send"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>

          {/* Footer */}
          <div className="cb-footer">
            <p className="cb-footer-text">Powered by <span>FindIt</span></p>
          </div>
        </div>

        {/* ── FAB ── */}
        <button
          className="cb-fab"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? <CloseIcon /> : <BotIcon />}
          {unread && <span className="cb-unread" />}
        </button>

      </div >
    </>
  );
}