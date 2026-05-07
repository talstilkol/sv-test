// solution.js
const flights = [
  { id: '1001', airline: 'El Al', passengers: 250 },
  { id: '1002', airline: 'Arkia', passengers: 180 },
  { id: '1003', airline: 'Israir', passengers: 120 }
];

function validateFlightId(id) {
  return typeof id === 'string' && /^\d{1,5}$/.test(id);
}

function validateAirline(airline) {
  return typeof airline === 'string' && airline.length > 0 && /[a-zA-Z]/.test(airline);
}

function validatePassengers(passengers) {
  return Number.isInteger(passengers) && passengers >= 1 && passengers <= 450;
}

function solve(input) {
  const { action, flightId, airline, passengers } = input;

  switch (action) {
    case 'getTotalPassengers':
      return flights.reduce((sum, f) => sum + f.passengers, 0);

    case 'isFlightExists':
      if (!validateFlightId(flightId)) {
        return false;
      }
      return flights.some(f => f.id === flightId);

    case 'addFlight':
      if (!validateFlightId(flightId)) {
        return { success: false, error: 'Invalid flight ID' };
      }
      if (flights.some(f => f.id === flightId)) {
        return { success: false, error: 'Flight ID already exists' };
      }
      if (!validateAirline(airline)) {
        return { success: false, error: 'Invalid airline name' };
      }
      if (!validatePassengers(passengers)) {
        return { success: false, error: 'Passengers must be integer between 1 and 450' };
      }
      flights.push({ id: flightId, airline, passengers });
      return { success: true, message: 'Flight added' };

    case 'deleteFlight':
      if (!validateFlightId(flightId)) {
        return { success: false, error: 'Invalid flight ID' };
      }
      const index = flights.findIndex(f => f.id === flightId);
      if (index === -1) {
        return { success: false, error: 'Flight not found' };
      }
      flights.splice(index, 1);
      return {
        success: true,
        message: `Total flights: ${flights.length}, total passengers: ${flights.reduce((sum, f) => sum + f.passengers, 0)}`
      };

    default:
      return { success: false, error: 'Unknown action' };
  }
}

module.exports = { solve };