// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const baseEnvironment = {
  firebase: {
    apiKey: "AIzaSyC0t2gakzQUsOnvLnL6RM1FwEfjVNgWY4w",
    authDomain: "my-gun-locker.firebaseapp.com",
    databaseURL: "https://my-gun-locker.firebaseio.com",
    projectId: "my-gun-locker",
    storageBucket: "my-gun-locker.appspot.com",
    messagingSenderId: "42273997774"
  },
  version: "0.1.1"
};

export const environment = {
  production: false,
  ...baseEnvironment
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.