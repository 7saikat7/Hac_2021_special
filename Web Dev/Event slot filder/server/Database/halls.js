const halls = require("../Schema/HallData");

const createHalls = async (data) => {
  console.log(`Creating a new hall: ${data.UID}`);
  try {
    let response = await halls.updateOne(
      { UID: data.UID },
      { $set: data },
      { upsert: true, new: true }
    );
    console.log("Returning the new hall: ", response);
    return { status: "Hall created Successfully", error: null };
  } catch (err) {
    console.log("Error in creating Halls: ", err);
    return { status: "hall could not be created", error: err };
  }
};

const getHalls = async () => {
  try {
    let halls_instances = await halls.find({}).select({ _id: 0, __v: 0 });
    console.log("Returning all the halls:", halls_instances);
    return { status: "User found", hall: halls_instances, error: null };
  } catch (e) {
    console.error(`Could not return all the halls`, "\nerror: ", e);
    return { status: "User not found", hall: null, error: e };
  }
};
const createHallBooking = async (uid, booking) => {
  try {
    let response = await halls.updateOne(
      { UID: uid },
      { $addToSet: { Bookings: booking } },
      { upsert: false, new: true }
    );
    console.log("Returning the new hall booking: ", response);
    return { status: "Booking created successfully", error: null };
  } catch (err) {
    return { status: "Booking could not be created", error: err };
  }
};
const deleteBooking = async (uid, booking) => {
  try {
    let response = await halls.updateOne(
      { UID: uid },
      { $pull: { Bookings: booking } },
      { upsert: false, new: true }
    );
    console.log("Returning the new hall booking: ", response);
    return { status: "Booking deleted successfully", error: null };
  } catch (err) {
    return { status: "Booking could not be deleted", error: err };
  }
};
module.exports = {
  CreateHall: createHalls,
  FindHalls: getHalls,
  CreateBooking: createHallBooking,
  DeleteBooking: deleteBooking,
};
