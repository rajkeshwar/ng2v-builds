var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ColorLocale } from './color-locale';
import { ColorUtil, Hsva } from './color-util';
var Md2ColorSpectrum = (function () {
    function Md2ColorSpectrum(_locale, _util) {
        this._locale = _locale;
        this._util = _util;
        this.colorChange = new EventEmitter();
    }
    Object.defineProperty(Md2ColorSpectrum.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) {
            if (this._color !== value) {
                this._color = value || this._locale.defaultColor;
                this.hsva = this._util.stringToHsva(this.color);
                this.update(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "saturation", {
        get: function () {
            return {
                'left': this.hsva.s * 100 + "%",
                'top': 100 - this.hsva.v * 100 + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "hue", {
        get: function () {
            return {
                'left': this.hsva.h * 100 + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "alpha", {
        get: function () {
            return {
                'background': "linear-gradient(to right, transparent, " + this._alpha + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "alphaPointer", {
        get: function () {
            return {
                'left': this.hsva.a * 100 + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Md2ColorSpectrum.prototype._setSaturation = function (event) {
        this.hsva.s = event.x / event.width;
        this.hsva.v = 1 - event.y / event.height;
        this.update(true);
    };
    Md2ColorSpectrum.prototype._setHue = function (event) {
        this.hsva.h = event.x / event.width;
        this.update(true);
    };
    Md2ColorSpectrum.prototype._setAlpha = function (event) {
        this.hsva.a = event.x / event.width;
        this.update(true);
    };
    Md2ColorSpectrum.prototype.update = function (isInitialized) {
        var rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(this.hsva));
        var hueRgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this._alpha = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hue = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this._color = this._util.outputFormat(this.hsva, this._locale.formatColor);
        if (isInitialized) {
            this._emitChangeEvent();
        }
    };
    /** Emits an event when the user selects a color. */
    Md2ColorSpectrum.prototype._emitChangeEvent = function () {
        this.colorChange.emit(this.color);
    };
    return Md2ColorSpectrum;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2ColorSpectrum.prototype, "colorChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2ColorSpectrum.prototype, "color", null);
Md2ColorSpectrum = __decorate([
    Component({selector: 'md2-color-spectrum',
        template: "<div class=\"md2-color-saturation\" [style.background-color]=\"_hue\" slide (slideChange)=\"_setSaturation($event)\"><span [ngStyle]=\"saturation\" class=\"pointer\"></span></div><div class=\"md2-color-hue\" slide (slideChange)=\"_setHue($event)\"><span [ngStyle]=\"hue\" class=\"pointer\"></span></div><div class=\"md2-color-alpha\" slide (slideChange)=\"_setAlpha($event)\"><span [ngStyle]=\"alpha\" class=\"alpha-gradient\"></span> <span [ngStyle]=\"alphaPointer\" class=\"pointer\"></span></div>",
        styles: [":host{position:relative;display:block;width:100%;padding-top:50%}.md2-color-saturation{position:absolute;top:0;width:100%;bottom:88px;border-radius:3px;background:linear-gradient(to bottom,transparent,#000),linear-gradient(to right,#fff,transparent);cursor:crosshair}.md2-color-saturation .pointer{position:absolute;width:16px;height:16px;margin:-8px;border:2px solid #000;border-radius:50%;box-sizing:border-box}.md2-color-saturation .pointer::after{content:'';position:absolute;width:12px;height:12px;border:2px solid #fff;border-radius:50%;box-sizing:border-box}.md2-color-hue{position:relative;width:100%;height:30px;margin-top:12px;border-radius:3px;cursor:crosshair;background:linear-gradient(to right,red,#ff0,#0f0,#0ff,#00f,#f0f,red)}.md2-color-hue .pointer{position:absolute;top:-2px;bottom:-2px;margin-left:-3px;width:6px;border:2px solid #000;border-radius:2px;box-sizing:border-box}.md2-color-alpha{position:relative;width:100%;height:30px;margin-top:12px;border-radius:3px;cursor:crosshair;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:12px 12px,12px 12px;background-position:0 0,6px 6px}.md2-color-alpha .pointer{position:absolute;top:-2px;bottom:-2px;margin-left:-3px;width:6px;border:2px solid #000;border-radius:2px;box-sizing:border-box}.md2-color-alpha .alpha-gradient{position:absolute;top:0;right:0;bottom:0;left:0} /*# sourceMappingURL=color-spectrum.css.map */ "],
        exportAs: 'md2ColorSpectrum'
    }),
    __metadata("design:paramtypes", [ColorLocale, ColorUtil])
], Md2ColorSpectrum);
export { Md2ColorSpectrum };
//# sourceMappingURL=color-spectrum.js.map