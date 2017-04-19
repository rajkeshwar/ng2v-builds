# NG2V

Angular2 based Material Design components, directives and services are Accordion, Autocomplete, Chips(Tags), Collapse, Colorpicker, Data Table, Datepicker, Dialog(Modal), Menu, Multiselect, Select, Tabs, Tags(Chips), Toast and Tooltip.

[![npm version](https://badge.fury.io/js/ng2v.svg)](https://www.npmjs.com/package/ng2v)
[![Build Status](https://travis-ci.org/rajkeshwar/ng2v.svg?branch=master)](https://travis-ci.org/rajkeshwar/ng2v)

### Installation

The latest release of NG2V can be installed from npm

`npm install --save ng2v`

Playing with the latest changes from [master](https://github.com/rajkeshwar/ng2v/tree/master) is also possible

`npm install --save https://github.com/rajkeshwar/ng2v.git`

### Getting started

Setup `NG2V` in your project

```ts
// system.config.js
// ================
{
  map: {
    'ng2v': 'node_modules/ng2v/bundles/ng2v.umd.js'
  }
}


// app.module.ts
// =============

import { Ng2vModule }  from 'ng2v';
@NgModule({
  imports: [
    ...,
    Ng2vModule.forRoot(),
  ],
  ...
})
export class AppModule { }

```

### Demo

[demo](https://rajkeshwar.github.io/ng2v) and [demo sources](https://github.com/rajkeshwar/ng2v/tree/master/src/demo-app).


### Components:

- [ng2v-accordion](https://github.com/rajkeshwar/ng2v/tree/master/src/lib/accordion)
- [ng2v-autocomplete](https://github.com/rajkeshwar/ng2v/tree/master/src/lib/autocomplete)
