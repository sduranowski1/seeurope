import jwt_decode, {jwtDecode} from 'jwt-decode';

const authProvider = {
    login: async ({ username, password }) => {
        try {
            // Step 1: Make a POST request to the login endpoint to get the token
            const response = await fetch('https://se-europe-test.pl/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Parse the login response to get the token
            const loginData = await response.json();
            const token = loginData.token;

            // Step 2: Decode the JWT token to get the user roles
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);  // Log the decoded token to inspect it

            // Step 3: Check if the user has "ROLE_ADMIN" role in the decoded token
            if (!decodedToken.roles || !decodedToken.roles.includes('ROLE_ADMIN')) {
                throw new Error('Access denied: Admin role required');
            }

            // Step 4: Store the token and username in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);

            return Promise.resolve();
        } catch (error) {
            console.error(error); // Log the error to debug
            return Promise.reject(error);
        }
    },
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        return Promise.resolve();
    },
        checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () =>
        Promise.resolve({
            id: 'user',
            fullName: 'SE-Admin',
        }),
    getPermissions: () => Promise.resolve(''),
};

export default authProvider;