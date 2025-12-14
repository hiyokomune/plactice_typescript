import { Routes, Route, Link } from "react-router-dom";
import Header from './Header'
import ForList from "./ForList"
import Post from "./Post";
import Contact from "./Contact";
import { useState, useEffect } from 'react';
import type { PostType } from './types';

export default function App() {

  // 読み込み中判定用のstate
  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState<PostType[]>([])
  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await res.json()
      setPosts(data.posts)
      setLoading(false);  // 読み込み終了
    }
    fetcher()
  }, [])

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ForList src={posts} />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
