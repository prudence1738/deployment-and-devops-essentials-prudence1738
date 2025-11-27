import React, { useEffect, useState, Suspense, lazy } from 'react'

const Messages = lazy(() => import('./components/Messages'))

export default function App() {
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h1>Message Board</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Messages />
      </Suspense>
    </div>
  )
}
