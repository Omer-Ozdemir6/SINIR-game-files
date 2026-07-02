import { introScenes } from './intro.js';
import { escapeAndTownScenes } from './escapeAndTown.js';
import { truthScenes } from './truth.js';

// Sahnelerin tamamen yüklenip yüklenmediğini loglayarak tarayıcı console'unda görebiliriz
const allScenes = {
  ...(introScenes || {}),
  ...(escapeAndTownScenes || {}),
  ...(truthScenes || {})
};

export const story = {
  scenes: allScenes
};