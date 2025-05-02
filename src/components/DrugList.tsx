import React, { useEffect, useState } from 'react';
import { fetchDrugData } from '../services/api'; // Adjust the import path as necessary
import './DrugList.css'; // Import the CSS file

interface Drug {
    application_number: string;
    sponsor_name: string;
    openfda?: {
        brand_name?: string[];
        generic_name?: string[];
        manufacturer_name?: string[];
        product_ndc?: string[];
        route?: string[];
        substance_name?: string[];
        pharm_class_epc?: string[];
    };
}

const DrugList: React.FC = () => {
    const [drugs, setDrugs] = useState<Drug[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDrugData();
                setDrugs(data.results); // Adjust based on the API response structure
            } catch (err) {
                setError('Failed to fetch drug data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="layout">
            <header className="header">Pharma Track</header>
            <div className="main">
                <aside className="left-panel">Drug List</aside>
                <section className="content">
                    <h1>Drug List</h1>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search by Application Number or Sponsor Name"
                    />
                    <div className="drug-list-container">
                        <ul>
                            {drugs.map((drug, index) => (
                                <li key={index} className="drug-item">
                                    <h3>Application Number: {drug.application_number}</h3>
                                    <p>Sponsor Name: {drug.sponsor_name}</p>
                                    {drug.openfda && (
                                        <>
                                            <p>Brand Names: {drug.openfda.brand_name?.join(', ') || 'N/A'}</p>
                                            <p>Generic Names: {drug.openfda.generic_name?.join(', ') || 'N/A'}</p>
                                            <p>Manufacturer: {drug.openfda.manufacturer_name?.join(', ') || 'N/A'}</p>
                                            <p>Route: {drug.openfda.route?.join(', ') || 'N/A'}</p>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
            <footer className="footer">Footer Content</footer>
        </div>
    );
};

export default DrugList;