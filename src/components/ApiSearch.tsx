import React, { useState } from 'react';
import './DrugList.css'; // Reuse the same CSS for consistent styling

const ApiSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.example.com/search?query=${query}`);
            const data = await response.json();
            setResults(data.results || []);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="layout">
            <header className="header">Pharma Tracker</header>
            <div className="main">
                <aside className="left-panel">
                    <a href="/drug-list" className="tab-link">Drug Search</a>
                    <a href="/api-search" className="tab-link">API Search</a>
                </aside>
                <section className="content">
                    <h1>API Search</h1>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Enter search query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-button">
                        Search
                    </button>
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{JSON.stringify(result)}</li>
                        ))}
                    </ul>
                </section>
            </div>
            <footer className="footer">© 2025 Pharma Track. All Rights Registered @2025</footer>
        </div>
    );
};

export default ApiSearch;