import React, { useEffect, useState } from 'react';
import PostList from './components/PostList';

const api = (path, opts) => fetch('/api' + path, opts).then(r=>r.json());

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token')||'');
  const [notice, setNotice] = useState('');
  useEffect(()=>{ if(token) localStorage.setItem('token', token); else localStorage.removeItem('token'); },[token]);

  return (
    <div className="container">
      <div className="header">
        <h2>Social Mini (Simple)</h2>
        <div>
          { token ? <button onClick={()=>{setToken(''); setNotice('Token removed')}}>Logout</button> :
            <button onClick={()=>setNotice('Paste your token below and press Use')}>How to use</button>
          }
        </div>
      </div>

      <div style={{marginTop:12}} className="token-input">
        <input placeholder="Paste JWT token here" value={token} onChange={e=>setToken(e.target.value)} />
        <div style={{marginTop:6}}>
          <button onClick={()=>{ setNotice('Token saved to localStorage'); localStorage.setItem('token', token); }}>Use token</button>
          <button onClick={()=>{ setToken(''); localStorage.removeItem('token'); setNotice('Token cleared') }}>Clear token</button>
        </div>
      </div>

      { notice && <div className="notice">{notice}</div> }

      <PostList token={token} setNotice={setNotice} />
    </div>
  );
}
