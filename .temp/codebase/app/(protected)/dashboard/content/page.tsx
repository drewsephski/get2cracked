"use client";

import { useEffect, useState } from "react";
export default function ContentPage() {
  const [content, setContent] = useState<any[]>([]);
  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
    slug: "",
  });

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then(setContent);
  }, []);

  const handleCreate = async () => {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContent),
    });
    if (res.ok) {
      const createdContent = await res.json();
      setContent([...content, createdContent]);
      setNewContent({ title: "", content: "", slug: "" });
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
    if (res.ok) {
      setContent(content.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <h1>Content Management</h1>
      <div>
        <h2>Create New Content</h2>
        <input
          type="text"
          placeholder="Title"
          value={newContent.title}
          onChange={(e) =>
            setNewContent({ ...newContent, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Slug"
          value={newContent.slug}
          onChange={(e) =>
            setNewContent({ ...newContent, slug: e.target.value })
          }
        />
        <textarea
          placeholder="Content"
          value={newContent.content}
          onChange={(e) =>
            setNewContent({ ...newContent, content: e.target.value })
          }
        ></textarea>
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <h2>Existing Content</h2>
        <ul>
          {content.map((c) => (
            <li key={c.id}>
              <h3>{c.title}</h3>
              <p>{c.content}</p>
              <button>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}