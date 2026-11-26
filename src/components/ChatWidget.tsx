"use client";

import { useState, useRef, useEffect } from "react";
import { site } from "@/data/site";

type Msg = {
  role: "user" | "assistant";
  content: string;
  time?: string;
};

const QUICK_REPLIES = [
  "Como funciona uma sessão?",
  "Quais são os preços?",
  "Atende em qual região?",
];

const PROACTIVE = "Oi! 📸 Fotografamos o prato certo pro seu negócio. Quer um orçamento sem compromisso?";

const AUTO_RESPONSES: Record<string, string> = {
  sessão:
    "Começa com um briefing rápido sobre o seu cardápio e onde as fotos serão usadas. Depois combinamos a data, realizamos a sessão e você recebe as imagens tratadas em 5–7 dias úteis 🎯",
  preço:
    "Temos pacotes a partir de R$ 700 (2h) até R$ 1.300 (dia completo). Orçamento final é personalizado pelo projeto — quer que eu detalhe os pacotes?",
  preços:
    "Temos pacotes a partir de R$ 700 (2h) até R$ 1.300 (dia completo). Orçamento final é personalizado pelo projeto — quer que eu detalhe os pacotes?",
  região:
    "Atendo Ribeirão Preto e toda a região, com disponibilidade para viagens quando o projeto pede ✈️",
  default:
    "Obrigado pela mensagem! Para agilizar o orçamento, fale diretamente comigo pelo WhatsApp — te respondo em até 24h 👇",
};

function getTime() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--color-acc)",
            display: "inline-block",
            animation: `p3DotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, val] of Object.entries(AUTO_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return val;
  }
  return AUTO_RESPONSES.default;
}

const INITIAL: Msg[] = [
  {
    role: "assistant",
    content: "Olá! Sou o Gustavo, fotógrafo gastronômico em Ribeirão Preto 📷 Como posso ajudar?",
    time: getTime(),
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const [unread, setUnread] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const proactiveFired = useRef(false);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Botão aparece após 3s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3200);
    return () => clearTimeout(t);
  }, []);

  // Mensagem proativa após 14s
  useEffect(() => {
    const t = setTimeout(() => {
      if (proactiveFired.current) return;
      proactiveFired.current = true;
      setMessages((prev) => [...prev, { role: "assistant", content: PROACTIVE, time: getTime() }]);
      setUnread((u) => u + 1);
      setBubble(PROACTIVE);
      bubbleTimer.current = setTimeout(() => setBubble(null), 8000);
    }, 14000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setBubble(null);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  function autoResize() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }

  function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    const userMsg: Msg = { role: "user", content: msg, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    const reply = getAutoReply(msg);
    const speed = Math.max(10, Math.min(20, Math.round(2200 / reply.length)));
    let i = 0;

    const placeholder: Msg = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, placeholder]);

    const tick = () => {
      i++;
      const done = i >= reply.length;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: reply.slice(0, i),
          ...(done ? { time: getTime() } : {}),
        };
        return updated;
      });
      if (!done) setTimeout(tick, speed);
      else setTyping(false);
    };

    setTimeout(tick, 700);
  }

  const waLink = `https://api.whatsapp.com/send?phone=55${site.whatsapp}&text=Ol%C3%A1%20Gustavo%2C%20vim%20pelo%20site%20e%20quero%20um%20or%C3%A7amento%20de%20fotografia%20gastron%C3%B4mica.`;
  const showQuickReplies = messages.filter((m) => m.role === "user").length === 0 && !typing;

  return (
    <>
      <style>{`
        @keyframes p3DotBounce {
          0%,80%,100% { transform:translateY(0); opacity:.5 }
          40%          { transform:translateY(-5px); opacity:1 }
        }
        @keyframes p3BubbleIn {
          from { opacity:0; transform:translateY(8px) scale(.95) }
          to   { opacity:1; transform:translateY(0) scale(1) }
        }
        @keyframes p3ChatIn {
          from { opacity:0; transform:translateY(16px) scale(.96) }
          to   { opacity:1; transform:translateY(0) scale(1) }
        }
        @keyframes p3BtnShake {
          0%,100% { transform:scale(1) rotate(0deg) }
          20%     { transform:scale(1.1) rotate(-8deg) }
          40%     { transform:scale(1.1) rotate(8deg) }
          60%     { transform:scale(1.1) rotate(-5deg) }
          80%     { transform:scale(1.1) rotate(5deg) }
        }
        .p3-chat-shake { animation: p3BtnShake 0.6s ease 15.2s 1 }
        .p3-qr:hover { background: rgba(200,169,110,0.1) !important; border-color: rgba(200,169,110,0.6) !important; }
      `}</style>

      {/* Bubble proativa */}
      {bubble && !open && (
        <div
          onClick={() => { setBubble(null); setOpen(true); }}
          style={{
            position: "fixed",
            bottom: isMobile ? 90 : 90,
            left: isMobile ? 16 : 88,
            maxWidth: isMobile ? "calc(100vw - 100px)" : 240,
            background: "var(--color-card)",
            border: "1px solid rgba(200,169,110,0.3)",
            borderRadius: "12px 12px 4px 12px",
            padding: "10px 14px",
            color: "var(--color-cream)",
            fontSize: 12,
            lineHeight: 1.55,
            fontFamily: "var(--font-sora)",
            cursor: "pointer",
            zIndex: 9984,
            boxShadow: "0 8px 32px rgba(0,0,0,.55)",
            animation: "p3BubbleIn 0.3s ease",
          }}
        >
          {bubble}
          <span
            style={{
              position: "absolute",
              bottom: -5,
              right: 18,
              width: 9,
              height: 9,
              background: "var(--color-card)",
              borderRight: "1px solid rgba(200,169,110,0.3)",
              borderBottom: "1px solid rgba(200,169,110,0.3)",
              transform: "rotate(45deg)",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Janela de chat — abre à esquerda do botão */}
      {open && (
        <div
          style={
            isMobile
              ? {
                  position: "fixed",
                  inset: 0,
                  background: "var(--color-bg)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 9990,
                  overflow: "hidden",
                  animation: "p3ChatIn 0.3s ease",
                }
              : {
                  position: "fixed",
                  bottom: 92,
                  left: 24,
                  width: 340,
                  maxHeight: 520,
                  background: "var(--color-card)",
                  borderRadius: 16,
                  boxShadow: "0 24px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(200,169,110,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 9990,
                  overflow: "hidden",
                  animation: "p3ChatIn 0.35s cubic-bezier(.34,1.56,.64,1)",
                }
          }
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              flexShrink: 0,
              background: "var(--color-bg2)",
              borderBottom: "1px solid rgba(200,169,110,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                flexShrink: 0,
                background: "linear-gradient(135deg, var(--color-brand), var(--color-acc))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              📷
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "var(--color-cream)",
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "var(--font-sora)",
                }}
              >
                Gustavo · P3ro
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    color: "var(--color-acc)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  Online agora
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-mut)",
                cursor: "pointer",
                fontSize: 22,
                lineHeight: 1,
                padding: "0 4px",
              }}
            >
              ×
            </button>
          </div>

          {/* Mensagens */}
          <div
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              overflowY: "auto",
              overscrollBehavior: "contain",
              padding: "14px 14px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              scrollbarWidth: "thin",
              scrollbarColor: "var(--color-line) transparent",
            }}
          >
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 14px",
                      fontSize: 13,
                      lineHeight: 1.55,
                      fontFamily: "var(--font-sora)",
                      wordBreak: "break-word",
                      borderRadius:
                        m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background:
                        m.role === "user"
                          ? "linear-gradient(135deg, var(--color-brand), var(--color-acc))"
                          : "var(--color-bg)",
                      color:
                        m.role === "user" ? "#130A06" : "var(--color-cream)",
                      fontWeight: m.role === "user" ? 500 : 400,
                      border:
                        m.role === "assistant"
                          ? "1px solid rgba(200,169,110,0.1)"
                          : "none",
                    }}
                  >
                    {m.role === "assistant" && i === messages.length - 1 && typing && !m.content ? (
                      <TypingDots />
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
                {m.time && (
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--color-line)",
                      marginTop: 3,
                      fontFamily: "var(--font-sora)",
                      textAlign: m.role === "user" ? "right" : "left",
                      paddingLeft: m.role === "assistant" ? 4 : 0,
                      paddingRight: m.role === "user" ? 4 : 0,
                    }}
                  >
                    {m.time}
                  </div>
                )}
              </div>
            ))}

            {/* Botão WhatsApp aparece após 1ª resposta */}
            {messages.length > 1 && !typing && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 14px",
                  borderRadius: 20,
                  textDecoration: "none",
                  background: "rgba(37,211,102,0.08)",
                  border: "1px solid rgba(37,211,102,0.3)",
                  color: "#25D366",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fontFamily: "var(--font-sora)",
                  alignSelf: "flex-start",
                  marginTop: 2,
                  transition: "background 0.2s ease",
                }}
              >
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Continuar no WhatsApp
              </a>
            )}

            {/* Quick replies */}
            {showQuickReplies && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    className="p3-qr"
                    onClick={() => sendMessage(qr)}
                    style={{
                      background: "none",
                      border: "1px solid rgba(200,169,110,0.25)",
                      borderRadius: 20,
                      padding: "7px 14px",
                      color: "var(--color-acc)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--font-sora)",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px 12px",
              flexShrink: 0,
              borderTop: "1px solid rgba(200,169,110,0.1)",
              background: "var(--color-bg2)",
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              rows={1}
              onChange={(e) => { setInput(e.target.value); autoResize(); }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder="Fale sobre seu projeto..."
              disabled={typing}
              style={{
                flex: 1,
                background: "var(--color-bg)",
                border: "1px solid rgba(200,169,110,0.15)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "var(--color-cream)",
                fontSize: 13,
                outline: "none",
                fontFamily: "var(--font-sora)",
                opacity: typing ? 0.6 : 1,
                resize: "none",
                lineHeight: 1.5,
                overflowY: "hidden",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={typing || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "none",
                flexShrink: 0,
                background:
                  input.trim() && !typing
                    ? "linear-gradient(135deg, var(--color-brand), var(--color-acc))"
                    : "var(--color-line)",
                cursor: input.trim() && !typing ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={input.trim() && !typing ? "#130A06" : "var(--color-mut)"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Botão flutuante — canto inferior esquerdo */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 9985,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.8)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <button
          className="p3-chat-shake"
          onClick={() => setOpen((o) => !o)}
          aria-label="Chat com o fotógrafo"
          style={{
            position: "relative",
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: "none",
            background: open
              ? "var(--color-card)"
              : "linear-gradient(135deg, var(--color-brand), var(--color-acc))",
            outline: open ? "2px solid rgba(200,169,110,0.5)" : "none",
            boxShadow: open
              ? "0 4px 20px rgba(200,169,110,0.15)"
              : "0 4px 24px rgba(200,169,110,0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
        >
          {unread > 0 && !open && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                background: "#ef4444",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "var(--font-sora)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--color-bg)",
                padding: "0 4px",
              }}
            >
              {unread}
            </span>
          )}
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-acc)" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#130A06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
