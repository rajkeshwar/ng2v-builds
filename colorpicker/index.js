var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule, PortalModule } from '../core';
import { Md2Colorpicker } from './colorpicker';
import { Md2ColorSpectrum } from './color-spectrum';
import { Md2Slide } from './slide';
import { ColorLocale, DefaultColorLocale } from './color-locale';
import { ColorUtil } from './color-util';
import { StyleModule } from '../core/style/index';
export * from './colorpicker';
export * from './color-locale';
export * from './color-util';
export * from './color-spectrum';
export * from './slide';
var Md2ColorpickerModule = (function () {
    function Md2ColorpickerModule() {
    }
    return Md2ColorpickerModule;
}());
Md2ColorpickerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            OverlayModule,
            PortalModule,
            StyleModule,
        ],
        exports: [
            Md2Colorpicker,
            Md2ColorSpectrum
        ],
        declarations: [
            Md2Colorpicker,
            Md2ColorSpectrum,
            Md2Slide
        ],
        providers: [{ provide: ColorLocale, useClass: DefaultColorLocale }, ColorUtil],
        entryComponents: [
            Md2Colorpicker,
        ]
    })
], Md2ColorpickerModule);
export { Md2ColorpickerModule };
//# sourceMappingURL=index.js.map