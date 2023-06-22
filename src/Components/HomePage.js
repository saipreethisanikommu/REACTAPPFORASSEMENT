import React, { useState } from 'react';
import Form from './Form';

const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const [billList, setBillList] = useState([]);
    const [editBillIndex, setEditBillIndex] = useState(null);

    const handleFormSubmit = (formData) => {
        const billNumber = editBillIndex !== null ? billList[editBillIndex].billNumber : billList.length + 1;
        const billData = { ...formData, billNumber };

        if (editBillIndex !== null) {
            setBillList((prevBillList) => {
                const updatedBillList = [...prevBillList];
                updatedBillList[editBillIndex] = billData;
                return updatedBillList;
            });
            setEditBillIndex(null);
        } else {
            setBillList((prevBillList) => [...prevBillList, billData]);
        }

        setShowForm(false);
    };

    const handleAddBill = () => {
        setShowForm(true);
        setEditBillIndex(null);
    };

    const handleEditBill = (index) => {
        setShowForm(true);
        setEditBillIndex(index);
    };

    const handleDeleteBill = (index) => {
        setBillList((prevBillList) => {
            const updatedBillList = [...prevBillList];
            updatedBillList.splice(index, 1);
            return updatedBillList;
        });
    };

    return (
        <div>
            <h2>Home Page</h2>
            {showForm ? (
                <Form onSubmit={handleFormSubmit} initialData={editBillIndex !== null ? billList[editBillIndex] : null} />
            ) : (
                <>
                    <button onClick={handleAddBill}>Add Bill</button>
                    <ul>
                        {billList.map((bill, index) => (
                            <li key={bill.billNumber}>
                                <h3>Bill {bill.billNumber}</h3>
                                <p>Patient Name: {bill.patientName}</p>
                                <p>Patient Address: {bill.patientAddress}</p>
                                <p>Hospital Name: {bill.hospitalName}</p>
                                <p>Date of Appointment: {bill.dateOfAppointment}</p>
                                <p>Bill Amount: {bill.billAmount}</p>
                                {/* Removed policy number */}
                                {bill.billImage && (
                                    <div>
                                        <h4>Bill Image:</h4>
                                        <img src={bill.billImage} alt="Bill" />
                                    </div>
                                )}
                                <button onClick={() => handleEditBill(index)}>Edit</button>
                                <button onClick={() => handleDeleteBill(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default HomePage;
