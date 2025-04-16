import React from "react";

const Insurance = () => {
    return (
        <section className="px-[30px] md:px-[30px] mt-4 mb-6">
            {/* Title */}
            <h1 className="text-[3em] text-white text-center pb-4">Insurance</h1>

            {/* Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vietjet Travel Safe Insurance */}
                <div className="bg-white border rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-bold text-[#00008B] mb-4">
                        TRAVEL INSURANCE - QAIRLINE TRAVEL SAFE
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Comprehensive travel insurance coverage up to 2 billion VND</li>
                        <li>
                            Attractive insurance benefits: accidents, medical expenses, flight delays/cancellations, lost/damaged luggage, etc.
                        </li>
                        <li>Applicable to all domestic and international routes</li>
                        <li>Applicable to all ticket classes</li>
                        <li>
                            Add Vietjet Travel Safe Insurance for as low as <strong>58,000 VND/one-way</strong>
                        </li>
                        <li>
                            See more details <a href="#" className="text-blue-600 hover:underline">here</a>
                        </li>
                    </ul>
                </div>

                {/* Sky Care */}
                <div className="bg-white border rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-bold text-[#00008B] mb-4">
                        SKY CARE - FREE TRAVEL INSURANCE WITH QAIRLINE AIR TICKETS
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Travel with peace of mind with Vietjet's Sky Care on all domestic and international flights! All passengers are entitled to insurance benefits in the following cases (*):
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Flights departing 120 minutes or more late</li>
                        <li>
                            Delayed arrival of luggage, damage, or loss of items inside checked luggage accompanying the same flight
                        </li>
                        <li>
                            Incurring medical treatment costs due to illness or accidents during and after the flight
                        </li>
                        <li>And much more...</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        Submit your compensation claim online, conveniently and easily at
                        <a
                            href="https://skycare.baoviet.com.vn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://skycare.baoviet.com.vn
                        </a>
                    </p>
                    <p className="text-gray-700">
                        Detailed benefits and applicable conditions of Sky Care
                        <a href="#" className="text-blue-600 hover:underline">
                            here
                        </a>
                    </p>
                    <p className="text-sm italic mt-2">
                        (*) According to specific terms and conditions
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Insurance;
