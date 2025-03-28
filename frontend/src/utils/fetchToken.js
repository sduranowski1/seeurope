// src/utils/fetchToken.js

export const fetchToken = async () => {
    try {
        const response = await fetch('https://seequipment.pl/api/fetch-enova-token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error in token request: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Token Response:', data);
        return data.token; // Adjust as needed based on the response structure
    } catch (error) {
        console.error('Failed to fetch token:', error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
