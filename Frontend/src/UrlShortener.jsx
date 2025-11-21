import { useState } from "react";
import "./Style.css";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://urlshortener-sm3o.onrender.com/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">URL Shortener</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            className="input"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>

        {shortUrl && <div className="result">{shortUrl}</div>}
      </div>
    </div>
  );
}
