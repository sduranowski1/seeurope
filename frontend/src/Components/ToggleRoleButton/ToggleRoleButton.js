import React, { useState } from "react";

const ToggleRoleButton = ({ userId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const toggleRole = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(
                `https://se-europe-test.pl/api/user_enovas/${userId}/toggle-role`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({}), // Send an empty object as the body
                }
            );

            if (response.ok) {
                setSuccess(true);
            } else {
                throw new Error("Error toggling role");
            }
        } catch (err) {
            setError(err.message || "Error toggling role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={toggleRole} disabled={loading}>
                {loading ? "Toggling..." : "Toggle Role"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Role toggled successfully!</p>}
        </div>
    );
};

export default ToggleRoleButton;
