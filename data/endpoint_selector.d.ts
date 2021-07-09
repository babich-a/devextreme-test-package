/**
* DevExtreme (data/endpoint_selector.d.ts)
* Version: 20.2.7 (build 21147-0311)
* Build date: Thu May 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * The EndpointSelector is an object for managing OData endpoints in your application.
 */
export default class EndpointSelector {
    constructor(options: any);
    /**
     * Gets an endpoint with a specific key.
     */
    urlFor(key: string): string;
}
