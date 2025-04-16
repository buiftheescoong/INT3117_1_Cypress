import React from "react";

const DichVuTaxi = () => {
    return (
        <section className="px-[30px] md:px-[30px] mt-4 mb-6">
            {/* Title */}
            <h1 className="text-[3em] text-white text-center pb-4">Taxi Service</h1>

            <div className="bg-white border rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold text-[#00008B] mb-4">
                    GUIDE TO BOOKING AND USING AIRPORT PICK-UP TAXI SERVICE PROVIDED BY GREEN TAXI SM
                </h2>     
                <p><strong>I. Guide to booking the service:</strong></p>
                <ul>
                    <li>Step 1: Book a flight ticket on the Vietjet Air website or app</li>
                    <li>Step 2: Select the "Airport Pick-Up Taxi" service with your flight</li>
                    <li>Step 3: Choose airport pick-up packages suitable for your journey or return trip</li>
                    <li>Step 4: Proceed to pay for the entire transaction, including the flight ticket and additional services</li>
                    <li>Step 5: Receive an email with flight details and a voucher code to use the service</li>
                </ul>        
                <p>
                <strong>II. Guide to using the service:</strong>
                <br />
                The E-Voucher will be sent to you by Green Taxi SM via the email registered when purchasing the ticket.
                </p>   
                <ul>
                    <li>Step 1: Find a Green Taxi SM driver at the pick-up points as per the guide below</li>
                    <li>Step 2: Provide the voucher code received via email to the driver to confirm the valid trip</li>
                    <li>Step 3: Board the taxi and begin the journey</li>
                    <li>Step 4: Complete the trip and pay for any additional fees (if applicable)</li>
                </ul>
                <p>
                <strong>III. Instructions for customers to reach the Green Taxi SM airport pick-up points:</strong>
                </p>
                <p>&nbsp;</p>
                <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          {/* Header */}
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="p-4 text-left border">Airport</th>
              <th className="p-4 text-left border">Terminal</th>
              <th className="p-4 text-left border">Instructions</th>
            </tr>
          </thead>
          {/* Content */}
          <tbody className="text-gray-800">
            {/* Noi Bai Airport */}
            <tr className="bg-red-50">
              <td className="p-4 border" rowSpan="2">
                Noi Bai Airport <br />
                (Hanoi)
              </td>
              <td className="p-4 border">Domestic Terminal (T1)</td>
              <td className="p-4 border">
                - From Hall A-B, exit through doors 1-5 and head towards the pedestrian lane. Proceed straight to the taxi pick-up lane across the street. Find Green Taxi SM and board the car.
                <br />
                - Or from Hall E, exit through doors E1-E5, proceed straight through the priority lane to the taxi pick-up lane. Find Green Taxi SM and board the car.
              </td>
            </tr>
            <tr className="bg-red-50">
              <td className="p-4 border">International Terminal (T2)</td>
              <td className="p-4 border">
                - From Hall A1, exit the door and turn left. Find Green Taxi SM at Column 5 and board the car.
              </td>
            </tr>

            {/* Tan Son Nhat Airport */}
            <tr>
              <td className="p-4 border" rowSpan="2">
                Tan Son Nhat Airport <br />
                (Ho Chi Minh City)
              </td>
              <td className="p-4 border">Domestic Terminal</td>
              <td className="p-4 border">
                - From doors A1 and A2, go straight to Lane C and turn right. Find Green Taxi SM at Columns C03-C20 and board the car.
              </td>
            </tr>
            <tr>
              <td className="p-4 border">International Terminal</td>
              <td className="p-4 border">
                - From doors A1 and A2, go straight to Lane A and turn left. Find Green Taxi SM at Columns A04-A01 and board the car.
              </td>
            </tr>

            {/* Phu Bai Airport */}
            <tr className="bg-red-50">
              <td className="p-4 border" rowSpan="2">
                Phu Bai Airport <br />
                (Hue)
              </td>
              <td className="p-4 border">Domestic Terminal</td>
              <td className="p-4 border">
                - Exit straight from doors A2 and A3. Find Green Taxi SM at Columns A05-A01 and board the car.
              </td>
            </tr>
            <tr className="bg-red-50">
              <td className="p-4 border">International Terminal</td>
              <td className="p-4 border">
                - Exit straight from door A1. Find Green Taxi SM at Columns A01-A03 and board the car.
              </td>
            </tr>

            <tr className="bg-red-50">
              <td className="p-4 border" rowSpan="2">Da Nang Airport</td>
              <td className="p-4 border">Domestic Terminal</td>
              <td className="p-4 border">
                - Turn left upon exiting the terminal, then turn right at Columns 8, 9. Find Green Taxi SM at Slot 9 and board the car.
              </td>
            </tr>
            <tr className="bg-red-50">
              <td className="p-4 border">International Terminal</td>
              <td className="p-4 border">
                - Go straight from the exit. Find Green Taxi SM at Slots 1, 2, 3 and board the car.
              </td>
            </tr>

            {/* Cam Ranh Airport */}
            <tr>
              <td className="p-4 border">Cam Ranh Airport <br />(Nha Trang)</td>
              <td className="p-4 border">Domestic Terminal</td>
              <td className="p-4 border">
                - Go straight from the exit, head towards the left. Find Green Taxi SM and board the car.
              </td>
            </tr>

            {/* Phu Quoc Airport */}
            <tr className="bg-red-50">
              <td className="p-4 border">Phu Quoc Airport</td>
              <td className="p-4 border">All Terminals</td>
              <td className="p-4 border">
                - From the exit, walk 30-50m to the center between the Domestic and International Terminals. Find Green Taxi SM and board the car.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
                <p className="pt-4 pb-4">
                **In case you cannot find the car at the airport, please visit the Green Taxi SM support desk in the hall or call the hotline for assistance.
                </p>
                <p><strong>
                     IV. Terms and Conditions:
                    </strong>
                </p>

      {/* List of terms and conditions */}
        <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>
            Applicable to domestic flights operated by Vietjet on the Vietjet website or app, at airports where the service is available: Noi Bai Airport (Hanoi), Tan Son Nhat Airport (Ho Chi Minh City), Phu Bai Airport (Hue), Da Nang Airport, Cam Ranh Airport (Nha Trang), Phu Quoc Airport.
        </li>
        <li>
            Applicable for trips booked up to 2 years in advance and at least 3 hours before the flight.
        </li>
        <li>
            Customers can purchase additional services after completing the payment for the flight ticket booking (similar to purchasing additional baggage).
        </li>
        <li>
            Each customer can purchase a maximum of 03 airport transfer vouchers for each successful booking.
        </li>
        <li>Service price includes VAT.</li>

        <li>
            Actual trip costs depend on the actual kilometers traveled, toll fees (if any), and other additional charges (if any) incurred during the trip.
        </li>
        <li>
            If the actual travel distance is shorter than the specified kilometers, the fare will be calculated based on the VJA x Xanh SM airport transfer package purchased by the customer. If the actual travel distance exceeds the specified kilometers, the customer will pay the additional fees directly to the driver.
        </li>
        <li>
            The service cannot be exchanged for cash under any circumstances.
        </li>
        <li>
            The service is valid for use within 07 days from the flight date.
        </li>
        <li>
            For customers requesting refunds/cancellations, the policy will follow the refund, cancellation, and service return policy as per Vietjet's regulations.
        </li>
        </ul>

        {/* Contact Information */}
        <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Contact Information for XANH SM:</h3>
        <p className="text-gray-800 mb-1">
            <strong>Customer Service Hotline:</strong> 1900 2097
        </p>
        <p className="text-gray-800">
            <strong>Email:</strong>{" "}
            <a
            href="mailto:cskh@xanhsm.com"
            className="text-blue-600 hover:underline"
            >
            cskh@xanhsm.com
            </a>
        </p>
        </div>
        </div>
        </section>
        );
};
export default DichVuTaxi;
