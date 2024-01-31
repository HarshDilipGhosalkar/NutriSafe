import React, { useState, useEffect } from 'react';

const AlertComponent = () => {
    const [alerts, setAlerts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAlert, setNewAlert] = useState({ image: null, dishName: '', effect: '' });

    // Function to handle API request for creating a report
    const handleAddAlert = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "mobile_number": "9137357003",
            "food_image": newAlert.image,
            "food_name": newAlert.dishName,
            "allergies_detected": newAlert.effect
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://tsec-hacks.onrender.com/report", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                // After successful submission, you might want to refresh the reports
                fetchReports();
                showModal();
              })
            .catch(error => console.log('error', error));
    };

    // Function to handle API request for fetching all reports
    const fetchReports = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://tsec-hacks.onrender.com/report", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data);
                // Assuming result.data contains an array of reports
                setAlerts(result.data);
            })
            .catch(error => console.log('error', error));
    };

    // Fetch reports when the component mounts
    useEffect(() => {
        fetchReports();
    }, []);

    // Function to handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setNewAlert({ ...newAlert, image: file });
        }
    };

    return (
        <div className="flex flex-col items-center h-screen  overflow-y-scroll px-[40px]">
            {/* Displaying Reports */}
            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className="w-full p-4 bg-light-red border-dark-red mb-8 bg-[#f8c2c2] rounded-md"
                >
                    {/* Displaying image from blob */}
                    {alert.food_image instanceof Blob && (
                        <img
                            src={URL.createObjectURL(alert.food_image)}
                            alt={alert.allergies_detected}
                            className="w-full h-60 object-cover mb-4 rounded-md"
                        />
                    )}
                    <p className="text-[#9a2e2e] text-lg">{alert.allergies_detected}</p>
                    <p className="text-[#9a2e2e] text-lg">{alert.food_name}</p>
                </div>
            ))}


            {/* Plus Button to Open Modal */}
            <div
                className="fixed bottom-16 right-6 bg-blue-500 text-white px-4 py-3 rounded-[50%] cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <span className="font-bold text-2xl">+</span>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-90 bg-gray-800 px-[20px]">
                    <div className="bg-white p-8 rounded-md w-96 relative">
                        {/* Close Modal Button */}
                        <div className="flex justify-end absolute top-1 right-1">
                            <span
                                className="cursor-pointer text-gray-500 text-xl"
                                onClick={() => setShowModal(false)}
                            >
                                &#10005;
                            </span>
                        </div>

                        {/* Image Input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                        />

                        {/* Dish Name Input */}
                        <input
                            type="text"
                            placeholder="Dish Name"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                            value={newAlert.dishName}
                            onChange={(e) => setNewAlert({ ...newAlert, dishName: e.target.value })}
                        />

                        {/* Effect Input */}
                        <input
                            type="text"
                            placeholder="Effect"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                            value={newAlert.effect}
                            onChange={(e) => setNewAlert({ ...newAlert, effect: e.target.value })}
                        />

                        {/* Submit Button */}
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md mt-4"
                            onClick={handleAddAlert}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertComponent;
