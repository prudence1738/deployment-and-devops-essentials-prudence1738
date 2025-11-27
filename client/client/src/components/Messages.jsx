import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || '';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/messages`);
      if (!res.ok) throw new Error('Could not fetch messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('Post failed');
      setText('');
      fetchMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={submit} style={{ marginBottom: 20 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message" style={{ width: '80%' }} />
        <button type="submit">Submit</button>
      </form>

      {loading ? <div>Loading...</div> : (
        <div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {messages.map(m => (
            <div key={m._id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
              <div>{m.text}</div>
              <small>{new Date(m.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
