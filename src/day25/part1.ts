/* eslint-disable */ 
import { parseInput } from '../util';

const input = parseInput(/*🎅*/);
const [card, door] = input;

const encryptionKey =//   ⭐ 
                           (
                         loop
                       =0,value
                     =1,loopSize =
                   ((value=1,loopSize
                =1)=>{ while((value =(
               value*7)%20201227)!==card
            &&++loopSize);return loopSize;}
          )()) => {while (loop++ !== loopSize)
        value=(value*door)%20201227;return value;
      /*  🎁 🎁    🎁*/   }; // 🎁  🎁🎁🎁  🎁 *\
    


export default encryptionKey(/*⛄*/);

/* 

const encryptionKey = (
  loop = 0,
  value = 1,
  loopSize = ((value = 1, loopSize = 1) => {
    while ((value = (value * 7) % 20201227) !== card && ++loopSize);
    return loopSize;
  })()
) => {
  while (loop++ !== loopSize) value = (value * door) % 20201227;
  return value;
};

*/

