/**
* DevExtreme (ui/dialog.d.ts)
* Version: 20.2.7 (build 21146-1035)
* Build date: Wed May 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxButtonOptions
} from './button';

/**
 * Displays an alert dialog with a message and OK button.
 */
export function alert(messageHtml: string, title: string): Promise<void> & JQueryPromise<void>;

/**
 * Creates a confirmation dialog with a message and Yes and No buttons.
 */
export function confirm(messageHtml: string, title: string): Promise<boolean> & JQueryPromise<boolean>;

/**
 * Creates a dialog with custom buttons.
 */
export function custom(options: { title?: string, messageHtml?: string, buttons?: Array<dxButtonOptions>, showTitle?: boolean, message?: string, dragEnabled?: boolean }): any;


