import axios from 'axios';

export const fetchDrugData = async () => {
    try {
        const response = await axios.get('https://api.fda.gov/drug/drugsfda.json?limit=100'); // Replace with your API endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching drug data:', error);
        throw error;
    }
};