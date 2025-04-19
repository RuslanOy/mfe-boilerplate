// if its host app use this imports, if not just delete

// export const initializeRemotes = async () => {
//   try {
//     await Promise.all([
//       loadScript(
//         'header',
//         'https://remoteURL/mfe-header/remoteEntry.js'
//       ),
//       loadScript(
//         'footer',
//         'https://remoteURL/mfe-footer/remoteEntry.js'
//       ),
//     ]);
//     console.log('All remotes loaded successfully');
//   } catch (error) {
//     console.error('Remote loading failed:', error);
//   }
// };

// const loadScript = (name: string, url: string) =>
//   new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${url}"]`))
//       return resolve('success');

//     const script = document.createElement('script');
//     script.src = url;
//     script.onload = resolve;
//     script.onerror = () => reject(new Error(`Failed to load ${name}`));
//     document.head.appendChild(script);
//   });
