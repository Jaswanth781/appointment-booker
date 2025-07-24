import React, { useState } from "react";
import { format, addMinutes, isEqual } from "date-fns";

const generateSlots = (startHour, endHour) => {
  const slots = [];
  let current = new Date();
  current.setHours(startHour, 0, 0, 0);
  const end = new Date(current);
  end.setHours(endHour, 0, 0, 0);

  while (current < end) {
    slots.push(new Date(current));
    current = addMinutes(current, 30);
  }
  return slots;
};

function App() {
  const [selectedDate, setSelectedDate] = useState("2025-07-24");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [confirmation, setConfirmation] = useState("");
  const workingHours = { start: 9, end: 17 };
  const slots = generateSlots(workingHours.start, workingHours.end);

  const handleBook = (slot) => {
    if (bookedSlots.find((s) => isEqual(s, slot))) return;
    setBookedSlots([...bookedSlots, slot]);
    setConfirmation(`Appointment booked for ${format(slot, "hh:mm a")}!`);
  };

  const isBooked = (slot) => bookedSlots.some((s) => isEqual(s, slot));

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setBookedSlots([]);
    setConfirmation("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Select Date</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="mt-2 border p-2 rounded w-full"
      />
      <h2 className="text-xl font-semibold mt-4 mb-2">
        Available from 9:00 AM to 5:00 PM
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot, idx) => (
          <button
            key={idx}
            onClick={() => handleBook(slot)}
            disabled={isBooked(slot)}
            className={`p-2 rounded text-white ${
              isBooked(slot)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {format(slot, "hh:mm a")}
          </button>
        ))}
      </div>
      {confirmation && (
        <div className="mt-4 text-blue-600 font-medium">{confirmation}</div>
      )}
    </div>
  );
}

export default App;
