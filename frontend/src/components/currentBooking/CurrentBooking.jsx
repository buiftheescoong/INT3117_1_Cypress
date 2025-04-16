import React, { useEffect, useState } from "react";
import BookedTicket from "./BookedTicket";
import getBookedTicketsRequest from "../../clientRequest/BookedTicketsRequest.jsx";
import "../currentBooking/CurrentBooking.css";
import axios from "axios";
import Swal from "sweetalert2";
import WattingProcess from "../Loading/WattingProcess.jsx";

const CurrentBooking = () => {
  const [bookedTickets, setBookedTickets] = useState([]);
  const [isVisiable, setIsVisiable] = useState(false);

  // Function to validate cancellation based on departure date
  const isCancelationValidate = (index) => {
    const currentTimestamp = Date.now();
    const departDateStr = bookedTickets[index].departDate.split(" ")[1]; // Extract date part
    const departTimestamp = new Date(departDateStr).getTime(); // Convert departDate to timestamp
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const cancelationDeadline = departTimestamp - oneDayInMilliseconds;
    return currentTimestamp < cancelationDeadline;
  };

  useEffect(() => {
    getBookedTicketsRequest(setBookedTickets);
  }, []);

  const handleCancel = async (ticketId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (!result.isConfirmed) {
        return;
      }

      const token = localStorage.getItem("token");
      setIsVisiable(true);

      const response = await axios.delete(
        `http://localhost:5000/api/tickets/delete-ticket/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setBookedTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.ticketId !== ticketId)
        );
      }

      setIsVisiable(false);
    } catch (error) {
      console.error("Failed to cancel ticket:", error);
      setIsVisiable(false);
      alert("Failed to cancel ticket. Please try again.");
    }
  };

  useEffect(() => {
    console.log("check bookedTickets:", JSON.stringify(bookedTickets));
  }, [bookedTickets]);

  return (
    <>
      <WattingProcess isVisible={isVisiable} />
      <div className="overflow-x-auto">
        <div className="max-w-[1400px] pb-[30px] mx-auto">
          <h1 className="text-[2.7em] font-bold text-white mb-[30px] mt-[20px] text-center">
            Current Booking
          </h1>
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="py-4 px-6 text-center">Flight No.</th>
                <th className="py-4 px-6 text-center">Aircraft</th>
                <th className="py-4 px-6 text-center">Departure</th>
                <th className="py-4 px-6 text-center">Arrival</th>
                <th className="py-4 px-6 text-center">Seat Class</th>
                <th className="py-4 px-6 text-center">Seat Number</th>
                <th className="py-4 px-6 text-center">Total Price</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookedTickets.length > 0 ? (
                bookedTickets.map((bookedTicket, index) => (
                  <BookedTicket
                    key={index}
                    bookedTicketInfors={bookedTicket}
                    order={index}
                    handleCancel={handleCancel}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-4 text-center">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CurrentBooking;
