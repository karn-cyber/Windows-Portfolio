'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ margin: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Segoe UI, Tahoma, sans-serif' }}>
        <div style={{ width: 360, background: '#ece9d8', border: '3px solid #0a246a', borderRadius: 8, overflow: 'hidden', boxShadow: '6px 6px 24px rgba(0,0,0,0.65)' }}>
          <div style={{ background: 'linear-gradient(180deg,#2a7ce8 0%,#0a3aa8 100%)', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>⚠️  Portfolio — Unexpected Error</span>
          </div>
          <div style={{ padding: '20px 22px' }}>
            <p style={{ fontSize: 12, color: '#333', marginBottom: 16 }}>Something went wrong. You can try to recover or reload the page.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={reset} style={{ padding: '5px 18px', fontSize: 12, background: 'linear-gradient(180deg,#f8f4f0 0%,#d0ccc8 100%)', border: '2px outset #a0a0a0', borderRadius: 3, cursor: 'pointer' }}>Try Again</button>
              <button onClick={() => window.location.href = '/'} style={{ padding: '5px 18px', fontSize: 12, background: 'linear-gradient(180deg,#f8f4f0 0%,#d0ccc8 100%)', border: '2px outset #a0a0a0', borderRadius: 3, cursor: 'pointer' }}>Reload</button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
