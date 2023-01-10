// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    versionNo: '1.3.0',
    versionType: '-DEV',
  };

  /** Production Local */
  // export const apiURL ="http://eng-app:8016/api/v1/";

  /** local */
  export const apiURL ="http://tortoisesvn-srv:1616/api/api/v1/";
  export const apiImage ="http://tortoisesvn-srv:1616/api";

  /** API Monitoring */
  // export const apiURL ="http://eng-app:2022/API.Monetaring/api/v1/";

  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

