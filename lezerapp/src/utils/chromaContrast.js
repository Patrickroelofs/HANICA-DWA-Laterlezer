import { contrast } from 'chroma-js';

export default (color) => ((color) && (contrast(color, 'white') > 2) ? 'white' : 'black');
