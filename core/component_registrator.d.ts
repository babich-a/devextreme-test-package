/**
* DevExtreme (core/component_registrator.d.ts)
* Version: 20.2.7 (build 21147-0311)
* Build date: Thu May 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Registers a new component in the DevExpress.ui namespace.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default function registerComponent(name: string, componentClass: any): void;

/**
 * Registers a new component in the specified namespace.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default function registerComponent(name: string, namespace: any, componentClass: any): void;