import React, { useEffect, useState } from 'react';

export default function PostList({ token, setNotice }){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function headers(){
    return token ? { 'Content-Type':'application/json', 'Authorization':'Bearer '+token } : { 'Content-Type':'application/json' };
  }

  useEffect(()=>{ loadPosts(); },[]);

  function loadPosts(){
    setLoading(true);
    fetch('/api/posts').then(r=>r.json()).then(d=>{ setPosts(d); setLoading(false); }).catch(()=>setLoading(false));
  }

  function createPost(){
    if(!token){ setNotice('Token required to create post'); return; }
    if(!title||!content) return;
    fetch('/api/posts',{ method:'POST', headers: headers(), body: JSON.stringify({ title, content }) })
      .then(r=>r.json()).then(()=>{ setTitle(''); setContent(''); loadPosts(); }).catch(()=>{});
  }

  function like(id){
    if(!token){ setNotice('Token required to like'); return; }
    fetch('/api/posts/'+id+'/like',{ method:'POST', headers: headers() }).then(r=>r.json()).then(()=>loadPosts()).catch(()=>{});
  }

  function viewPost(id){
    fetch('/api/posts/'+id).then(r=>r.json()).then(d=>alert(JSON.stringify(d, null, 2))).catch(()=>{});
  }

  return (
    <div style={{marginTop:16}}>
      <h3>Create Post (manual token required)</h3>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)}></textarea>
      <div><button onClick={createPost}>Post</button></div>

      <h3 style={{marginTop:20}}>Posts</h3>
      { loading ? <div>Loading...</div> : posts.map(p=>(
        <div key={p.id} className="post">
          <div><span className="avatar"></span><strong> {p.title}</strong></div>
          <div className="meta">by {p.authorName} · {new Date(p.createdAt).toLocaleString()}</div>
          <div style={{marginTop:8}}>Likes: {p.likes} · Comments: {p.commentsCount}</div>
          <div className="actions">
            <button onClick={()=>viewPost(p.id)}>View</button>
            <button onClick={()=>like(p.id)}>Like</button>
          </div>
        </div>
      )) }
    </div>
  );
}
