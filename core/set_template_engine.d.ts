/**
* DevExtreme (core/set_template_engine.d.ts)
* Version: 20.2.7 (build 21146-1035)
* Build date: Wed May 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Sets a supported template engine to use when using jQuery.
 */
declare function setTemplateEngine(templateEngineName: string): void;

/**
 * Sets custom functions that compile and render templates.
 */
declare function setTemplateEngine(templateEngineOptions: { compile?: Function, render?: Function }): void;


/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default setTemplateEngine;
