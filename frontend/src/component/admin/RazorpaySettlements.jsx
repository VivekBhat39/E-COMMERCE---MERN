import React, { useEffect, useState } from "react";

const RazorpaySettlements = () => {
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSettlements = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BASEURL + "/api/settlements");
            const data = await response.json();

            console.log("API Response:", data); // Debugging

            if (data.items) {
                setSettlements(data.items);
            } else {
                setSettlements([]); // Set empty array to avoid map error
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettlements();
    }, []);

    return (
        <div>
            <h2>Razorpay Settlements</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>UTR</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {settlements.map((settlement) => (
                        <tr key={settlement.id}>
                            <td>{settlement.id}</td>
                            <td>₹{settlement.amount / 100}</td>
                            <td>{settlement.status}</td>
                            <td>{settlement.utr || "N/A"}</td>
                            <td>{new Date(settlement.created_at * 1000).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RazorpaySettlements;
