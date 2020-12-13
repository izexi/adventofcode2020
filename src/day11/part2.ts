import { parseInput } from '../util';
import { DIRECTIONS } from './part1';

const input = parseInput({ split: { mapper: (seats) => [...seats] } });

let seats = input;
let occupiedSeats = 0;
let stablized = false;

while (!stablized) {
  occupiedSeats = 0;
  stablized = true;

  seats = seats.map((rowOfSeats, column) =>
    rowOfSeats.map((seat, row) => {
      if (seat === '.') return seat;

      const adjOccSeats = DIRECTIONS.reduce((total, [colOffset, rowOffset]) => {
        let seat;
        let [_row, _column] = [row, column];

        while ((seat = seats[(_column += colOffset)]?.[(_row += rowOffset)])) {
          if (seat === 'L') return total;
          if (seat === '#') return total + 1;
        }

        return total;
      }, 0);

      const isEmpty = seat === 'L';

      if (isEmpty ? !adjOccSeats : adjOccSeats >= 5) {
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
