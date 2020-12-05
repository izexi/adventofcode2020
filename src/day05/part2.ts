import { ids } from './part1';

export default ids.find((id) => !ids.includes(id + 1))! + 1;

// probably more efficient: ids.sort().find((id, i) => ids[i + 1] !== id + 1)! + 1;
