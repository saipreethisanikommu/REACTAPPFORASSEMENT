import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, initialData }) => {
    const [patientName, setPatientName] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [dateOfAppointment, setDateOfAppointment] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [billImage, setBillImage] = useState(null); // New state for bill image

    useEffect(() => {
        if (initialData) {
            const {
                patientName,
                hospitalName,
                billAmount,
                dateOfService,
                patientAddress,
                billImage
            } = initialData;

            setPatientName(patientName || '');
            setHospitalName(hospitalName || '');
            setBillAmount(String(billAmount) || '');
            setDateOfAppointment(dateOfService || '');

            if (patientAddress) {
                const addressParts = patientAddress.split(', ');
                setStreet(addressParts[0] || '');
                setCity(addressParts[1] || '');
                setState(addressParts[2] || '');
                setPostalCode(addressParts[3] || '');
            }

            setBillImage(billImage || null);
        }
    }, [initialData]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Check for blank fields
        if (
            !patientName ||
            !hospitalName ||
            !billAmount ||
            !dateOfAppointment ||
            !street ||
            !city ||
            !state ||
            !postalCode ||
            !billImage // Check if bill image is provided
        ) {
            alert('Please fill in all fields and upload the bill image.');
            return;
        }

        // Check for integers in patient name
        if (/\d/.test(patientName)) {
            alert('Patient name should not contain numbers.');
            return;
        }

        // Validate bill amount
        const parsedBillAmount = parseFloat(billAmount);
        if (isNaN(parsedBillAmount) || parsedBillAmount <= 0) {
            alert('Please enter a valid bill amount.');
            return;
        }

        const patientAddress = `${street}, ${city}, ${state}, ${postalCode}`;
        const formData = {
            patientName,
            patientAddress,
            hospitalName,
            billAmount: parsedBillAmount, // Store the parsed bill amount
            dateOfService: dateOfAppointment, // Updated to dateOfService
            billImage, // Include bill image in the form data
        };
        onSubmit(formData);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setBillImage(file);
    };

    const validatePostalCode = (value) => {
        // Check if the entered value is a number
        if (/^\d*$/.test(value)) {
            setPostalCode(value);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Upload Medical Bill</h2>
            <form onSubmit={handleFormSubmit} className="form">
                <label className="form-label">Patient Name:</label>
                <input
                    type="text"
                    value={patientName}
                    onChange={(event) => setPatientName(event.target.value)}
                    className="form-input"
                />

                <label className="form-label">Hospital Name:</label>
                <input
                    type="text"
                    value={hospitalName}
                    onChange={(event) => setHospitalName(event.target.value)}
                    className="form-input"
                />

                <label className="form-label">Bill Amount:</label>
                <input
                    type="text"
                    value={billAmount}
                    onChange={(event) => setBillAmount(event.target.value)}
                    className="form-input"
                />

                <label className="form-label">Date of Service:</label>
                <input
                    type="date"
                    value={dateOfAppointment}
                    onChange={(event) => setDateOfAppointment(event.target.value)}
                    className="form-input"
                />

                <label className="form-label">Address:</label>
                <div className="address-inputs">
                    <input
                        type="text"
                        value={street}
                        onChange={(event) => setStreet(event.target.value)}
                        placeholder="Street"
                        className="address-input"
                    />

                    <input
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        placeholder="City"
                        className="address-input"
                    />

                    <input
                        type="text"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        placeholder="State"
                        className="address-input"
                    />

                    <input
                        type="text"
                        value={postalCode}
                        onChange={(event) => validatePostalCode(event.target.value)}
                        placeholder="Postal Code"
                        className="address-input"
                    />
                </div>

                <label className="form-label">Bill Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-input"
                />

                <button type="submit" className="form-submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default Form;
