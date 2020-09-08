import getDateArray from './getDateArrayInterval';

// USAGE =  dateFilter(residents, date);

export default function filterDate (residents, date) {
 let newResidents = residents;
 let dateInterval = getDateArray(new Date(date.start), new Date(date.end))
  for (let [i, resident] of newResidents.entries()) {
    let rooms = resident.rooms;
    for (let [j, room] of rooms.entries()) {
      let collisions = 0;
      for (let occupiedDate of room.occupiedDates) {
          let start = occupiedDate.start;
          let end = occupiedDate.end;
          let occupiedInterval = getDateArray(new Date(start), new Date(end))
          for (let occDate of occupiedInterval) {
            for (let userDate of dateInterval) {
              if (userDate.getDate() === occDate.getDate() && userDate.getMonth() === occDate.getMonth()) {
                collisions++;
              }
            }
          }
      }

      if (collisions > 0) {
        newResidents[i].rooms.splice(j, 1);
      }
    }
  }

  return newResidents;
}
