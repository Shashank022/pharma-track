import React, { useEffect, useState } from 'react';
import { fetchDrugData } from '../services/api'; // Adjust the import path as necessary
import './DrugList.css'; // Import the CSS file
import Products from './Products'; // Import the Products component
import { Link } from 'react-router-dom';

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
    const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // Combined search term
    const [selectedRoute, setSelectedRoute] = useState<string>(''); // State for selected route

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDrugData();
                setDrugs(data.results); // Adjust based on the API response structure
                setFilteredDrugs(data.results); // Initialize filtered drugs
            } catch (err) {
                setError('Failed to fetch drug data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = drugs.filter(
            (drug) =>
                drug.application_number.toLowerCase().includes(term) ||
                drug.sponsor_name.toLowerCase().includes(term) ||
                drug.openfda?.substance_name?.some((substance) =>
                    substance.toLowerCase().includes(term)
                )
        );
        setFilteredDrugs(term ? filtered : drugs); // Reset to all drugs if no term is entered
    };

    const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const route = event.target.value;
        setSelectedRoute(route);

        const filtered = drugs.filter((drug) =>
            drug.openfda?.route?.includes(route)
        );
        setFilteredDrugs(route ? filtered : drugs); // Reset to all drugs if no route is selected
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    // Extract unique routes for the dropdown
    const uniqueRoutes = Array.from(
        new Set(drugs.flatMap((drug) => drug.openfda?.route || []))
    );

    return (
        <div className="layout">
            <header className="header">Pharma Tracker</header>
            <div className="main">
                <aside className="left-panel">
                    <Link to="/drug-list" className="tab-link">Drug Search</Link>
                    <Link to="/api-search" className="tab-link">API Search</Link>
                </aside>
                <section className="content">
                    <h1>Drug List</h1>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search by Application Number, Sponsor Name, or Substance Name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select
                        className="route-filter"
                        value={selectedRoute}
                        onChange={handleRouteChange}
                    >
                        <option value="">All Routes</option>
                        {uniqueRoutes.map((route, index) => (
                            <option key={index} value={route}>
                                {route}
                            </option>
                        ))}
                    </select>
                    <ul>
                        {filteredDrugs.map((drug, index) => (
                            <li key={index} className="drug-item">
                                <h3>Application No: {drug.application_number}</h3>
                                <p>Sponsor Name: {drug.sponsor_name}</p>
                                {drug.openfda && (
                                    <>
                                        <p>Brand Names: {drug.openfda.brand_name?.join(', ') || 'N/A'}</p>
                                        <p>Generic Names: {drug.openfda.generic_name?.join(', ') || 'N/A'}</p>
                                        <p>Manufacturer: {drug.openfda.manufacturer_name?.join(', ') || 'N/A'}</p>
                                        <p>Route: {drug.openfda.route?.join(', ') || 'N/A'}</p>
                                        <Products
                                            productNdc={drug.openfda.product_ndc}
                                            substanceName={drug.openfda.substance_name}
                                            pharmClassEpc={drug.openfda.pharm_class_epc}
                                        />
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <footer className="footer">© 2025 Pharma Track. All Rights Registered @2025</footer>
        </div>
    );
};

export default DrugList;