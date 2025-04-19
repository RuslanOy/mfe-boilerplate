import('./index')
  .then(() => console.log('App mounted successfully!'))
  .catch((err) => console.error('Failed to mount app:', err));


// if its host app use this config, if not just delete
// import { initializeRemotes } from './remotes';

// initializeRemotes()
//   .then(() => import('./index'))
//   .catch((err) => console.error('Remote loading failed:', err));