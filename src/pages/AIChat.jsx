import { useEffect, useRef, useState } from 'react';
import { askSupport } from '../data/tasks.js';
import styles from './AIChat.module.css';

const WELCOME = {
  role: 'ai',
  text: 'Hi! Ask me an IT or office question, e.g. "How do I install Microsoft Word?"',
};

export default function AIChat() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || sending) return;

    setMessages((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setSending(true);
    try {
      const answer = await askSupport(question);
      setMessages((m) => [...m, { role: 'ai', text: answer }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'ai', text: `⚠️ ${err.message}`, isError: true }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>AI Support</h1>
      </div>

      <div className={`card ${styles.chat}`}>
        <div className={styles.messages}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.bubble} ${m.role === 'user' ? styles.user : styles.ai} ${
                m.isError ? styles.error : ''
              }`}
            >
              {m.text}
            </div>
          ))}
          {sending && <div className={`${styles.bubble} ${styles.ai}`}>Thinking…</div>}
          <div ref={bottomRef} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your support question…"
            disabled={sending}
          />
          <button type="submit" className="btn btn-primary" disabled={sending || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}
