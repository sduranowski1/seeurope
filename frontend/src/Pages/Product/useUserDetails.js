import {useState, useEffect, useContext} from 'react';
import AuthContext from "../../AuthContext";
import {jwtDecode} from "jwt-decode";

const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState([]);
    const { token } = useContext(AuthContext); // Get token from AuthContext

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (token) {
                    // Decode the JWT token to get the email
                    const decodedToken = jwtDecode(token);
                    const email = decodedToken?.username;

                    if (email) {
                        // Fetch additional user details using the email
                        const response = await fetch(
                            `https://seequipment.pl/api/user_enovas?email=${encodeURIComponent(email)}`,
                            {
                                method: 'GET',
                                headers: {
                                    Accept: 'application/json',
                                },
                            }
                        );

                        if (response.ok) {
                            const data = await response.json();
                            setUserDetails(data[0]); // Assuming API returns an array
                        } else {
                            console.error('Failed to fetch additional user details:', response.status);
                        }
                    } else {
                        console.error('Email not found in the token');
                    }
                } else {
                    console.error('Token is missing');
                }
            } catch (error) {
                console.error('Error decoding token or fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, [token]);

    return userDetails;
};

export default useUserDetails;
