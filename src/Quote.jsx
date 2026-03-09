import { useState, useEffect } from "react";
import "./Quote.css";

function GetQuote() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function showQuote() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("https://dummyjson.com/quotes/random");
            if (!response.ok) throw new Error("Network error");
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError("Could not load a quote. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        showQuote();
    }, []);

    const tweetUrl = data
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${data.quote}" — ${data.author}`)}`
        : "#";

    return (
        <div className="page">
            <div className="card">
                <div className="card-header">
                    <span className="label">Quote of the Day</span>
                    <span className="quote-mark">&#8220;</span>
                </div>

                <div className="card-body">
                    {loading && (
                        <div className="loading">
                            <div className="spinner" />
                        </div>
                    )}
                    {error && !loading && (
                        <p className="error-msg">{error}</p>
                    )}
                    {data && !loading && (
                        <div key={data.id} className="quote-content">
                            <blockquote className="quote">{data.quote}</blockquote>
                            <div className="divider" />
                            <p className="author">&#8212; {data.author}</p>
                        </div>
                    )}
                </div>

                <div className="card-footer">
                    <button
                        className="btn-new"
                        onClick={showQuote}
                        disabled={loading}
                    >
                        {loading ? "Loading\u2026" : "New Quote"}
                    </button>
                    {data && !loading && (
                        <a
                            href={tweetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tweet"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.258 5.628 5.906-5.628zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Share
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GetQuote;