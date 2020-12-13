import { parseInput } from '../util';

const input = parseInput({ split: { mapper: (seats) => [...seats] } });

export const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];
let seats = input;
let occupiedSeats = 0;
let stablized = false;

while (!stablized) {
  occupiedSeats = 0;
  stablized = true;

  seats = seats.map((rowOfSeats, column) =>
    rowOfSeats.map((seat, row) => {
      if (seat === '.') return seat;

      const adjOccSeats = DIRECTIONS.reduce(
        (total, [colOffset, rowOffset]) =>
          total + Number(seats[column + colOffset]?.[row + rowOffset] === '#'),
        0
      );
      const isEmpty = seat === 'L';

      if (isEmpty ? !adjOccSeats : adjOccSeats >= 4) {
        stablized = false;
        if (isEmpty) {
          occupiedSeats++;
          return '#';
        }
        return 'L';
      }

      occupiedSeats += Number(!isEmpty);
      return seat;
    })
  );
}

export default occupiedSeats;
