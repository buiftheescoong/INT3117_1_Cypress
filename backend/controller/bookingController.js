
import Booking from "../models/bookingSchema.js";
import User from "../models/userSchema.js";
import Flight from "../models/flightsDetailsModel/flightSchema.js";
import Ticket from "../models/ticketSchema.js";


export const getCheckoutSession = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const flight = await Flight.findById(req.params.flightId).populate(
      "airline"
    );

    if (!flight) {
      return res
        .status(404)
        .json({ success: false, message: "Flight not found" });
    }


    const { bookingUsersData, selectedSeats, price, classType } = req.body;

    console.log("check selected seats : " + JSON.stringify(selectedSeats));

    console.log("check class type : " + classType);

    const url = process.env.CLIENT_SITE_URL + "checkout-page";    

    let savedBookingIds = await saveNewBookingIntoDataBase(bookingUsersData, 
      selectedSeats, flight, user, price, classType);

    // await Promise.all(
    //   savedBookingIds.map(async (savedBookingId) => {
    //     await createTicketForUser(savedBookingId, user);
    //   })
    // );

    for (const savedBookingId of savedBookingIds) {
      await createTicketForUser(savedBookingId, user);
    }
    

    await updateSeats(flight, selectedSeats, classType);
    


    return res.status(200).json({
      success: true,
      message: "Payment is Successful",
      url: url
    });


  } catch (error) {
    console.error("Error:", error);
    return  res.status(500).json({ success: false, message: error.message });
  }
};

async function createTicketForUser(savedBookingId, user){
  
  let ticketId = await getUniqueUID();
  let userTicket = new Ticket({
      uid: ticketId,
      bookingId: savedBookingId
  })

  user.bookings.push(userTicket._id);

  await Promise.all([userTicket.save(), user.save()]);
}

async function updateSeats(flight, selectedSeats, classType){

  let selectedClassType =  flight.seatDetails
  .find(assessedClassType => assessedClassType.classType == classType);

  selectedSeats[classType].map(currentSeatNumber => {
      let currentSelectedSeat = selectedClassType.seats.find(seat => seat.seatNumber == currentSeatNumber);
      if(currentSelectedSeat != null){
        currentSelectedSeat.status = "booked";
      }
  })

   console.log("new seat details : " + JSON.stringify(flight.seatDetails));
    
    await flight.save();
}

async function saveNewBookingIntoDataBase(bookingUsersData, selectedSeats, flight, user, price, classType){
  const numPassengers = Object.keys(bookingUsersData).length;


  let savedBookingsId = [];  
  for (let i = 1; i <= numPassengers; i++) {
    const userData = bookingUsersData[`passenger${i}`];
    const seat = selectedSeats[classType][i - 1];

    const booking = new Booking({
      flight: flight._id,
      user: user._id,
      seatNumber: seat,
      firstName: userData.firstName,
      lastName: userData.lastName,
      classType: classType,
      price: price,
      dob: userData.dob,
      passportNumber: userData.passportNumber,
      state: userData.state,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      passportSizePhoto: userData.passportSizePhoto,
    });

    let savedBooking = await booking.save();
    console.log("check saved book : " + savedBooking);
    savedBookingsId.push(savedBooking._id);
    
  }

  return savedBookingsId;
}

async function getUniqueUID(){
  let ticketUID;
  let isExisted = false;

  do{

    ticketUID = generateUID();

    let ticket = await Ticket.findOne({ uid: ticketUID });

    if (ticket != null) {
      isExisted = true;
    } else{
      isExisted = false;
    }
  } while(isExisted)
 
  return ticketUID;
}

function generateUID() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "MCH";
  for (let i = 0; i < 15; i++) {
    uid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uid;
}


export const getAllBookings = async (req, res) => {
  try {
    const allBookings = await Booking
      .find()
      .populate({
        path: "flight",
        select: "flightNumber from to departDate arriveDate airline",
        populate: [
          {
            path: "from", select: "nameLocation"
          },
          {
            path: "to", select: "nameLocation"
          },
          {
            path: "airline", select: "airlineCode"
          }
        ]

      }) 
      .populate("user","name");

    res.status(200).json(allBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

