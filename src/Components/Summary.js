import React, { useState } from 'react';

const Summary = ({ formData, onEdit, billNumber }) => {
    const [editing, setEditing] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    };

    return (
        <div>
            <h2>Summary</h2>
            <p>Bill Number: {billNumber}</p>
            <p>Patient Name: {formData.patientName}</p>
            {/* Display other form fields */}

            {editing ? (
                <button onClick={onEdit}>Save</button>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
};

export default Summary;
