var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ElementRef, Input, Output, Optional, EventEmitter, Renderer, Self, ViewChildren, QueryList, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { NgControl, } from '@angular/forms';
import { Overlay, OverlayState, TemplatePortalDirective, } from '../core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { ColorLocale } from './color-locale';
import { ColorUtil, Rgba } from './color-util';
/** Change event object emitted by Md2Colorpicker. */
var Md2ColorChange = (function () {
    function Md2ColorChange(source, color) {
        this.source = source;
        this.color = color;
    }
    return Md2ColorChange;
}());
export { Md2ColorChange };
var Md2Colorpicker = (function () {
    function Md2Colorpicker(_element, overlay, _viewContainerRef, _renderer, _locale, _util, _control) {
        this._element = _element;
        this.overlay = overlay;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._locale = _locale;
        this._util = _util;
        this._control = _control;
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        this._value = null;
        this._color = null;
        this._isDark = false;
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** Whether the select is disabled.  */
        this._disabled = false;
        this._container = 'inline';
        this._openOnFocus = false;
        /** Position of the menu in the X axis. */
        this.positionX = 'after';
        /** Position of the menu in the Y axis. */
        this.positionY = 'below';
        this.overlapTrigger = true;
        this._formats = ['hex', 'rgb', 'hsl'];
        this._inputFocused = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        this.okLabel = 'Ok';
        this.cancelLabel = 'Cancel';
        this.tabindex = 0;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Md2Colorpicker.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    Object.defineProperty(Md2Colorpicker.prototype, "format", {
        get: function () { return this._format || this._locale.formatColor; },
        set: function (value) {
            if (this._format !== value) {
                this._format = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (value && this._value !== value) {
                this._value = value;
            }
            else {
                this._value = this._locale.defaultColor;
            }
            var hsva = this._util.stringToHsva(this._value);
            var rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(hsva));
            var rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
            this._value = this._util.outputFormat(hsva, this._locale.formatColor);
            if (Math.round((rgbaText.r * 299 + rgbaText.g * 587 + rgbaText.b * 114) / 1000) >= 128
                || hsva.a < 0.35) {
                this._isDark = true;
            }
            else {
                this._isDark = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) { this._color = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "container", {
        get: function () { return this._container; },
        set: function (value) {
            if (this._container !== value) {
                this._container = value || 'inline';
                this.destroyPanel();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: function () { return this._placeholder; },
        set: function (value) { this._placeholder = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "disabled", {
        /** Whether the component is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "openOnFocus", {
        get: function () { return this._openOnFocus; },
        set: function (value) { this._openOnFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "isOpen", {
        set: function (value) {
            if (value && !this.panelOpen) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: function () { return this._panelOpen; },
        enumerable: true,
        configurable: true
    });
    /** Toggles the overlay panel open or closed. */
    Md2Colorpicker.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    Md2Colorpicker.prototype.open = function () {
        if (this.disabled) {
            return;
        }
        this._createOverlay();
        this._overlayRef.attach(this.templatePortals.first);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.value = this.color;
    };
    /** Closes the overlay panel and focuses the host element. */
    Md2Colorpicker.prototype.close = function () {
        this._panelOpen = false;
        // if (!this._color) {
        //  this._placeholderState = '';
        // }
        this._focusHost();
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
        }
    };
    /** Removes the panel from the DOM. */
    Md2Colorpicker.prototype.destroyPanel = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    Md2Colorpicker.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.toggle();
        }
    };
    Md2Colorpicker.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    Md2Colorpicker.prototype._handleFocus = function (event) {
        this._inputFocused = true;
    };
    Md2Colorpicker.prototype._handleBlur = function (event) {
        this._inputFocused = false;
        if (!this.panelOpen) {
            this._onTouched();
        }
        if (this._util.isColorValid(this.color)) {
            this._emitChangeEvent();
        }
    };
    Md2Colorpicker.prototype._handleWindowResize = function (event) {
        if (this.container === 'inline') {
            this.close();
        }
    };
    Md2Colorpicker.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._renderer.invokeElementMethod(document.querySelectorAll('.md2-colorpicker-panel')[0], 'focus');
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    Md2Colorpicker.prototype._setFormat = function (format) {
        this._locale.formatColor = format;
        var hsva = this._util.stringToHsva(this._value);
        if (this._locale.formatColor === 'hex' && hsva.a < 1) {
            this._locale.formatColor = 'rgb';
        }
        this._value = this._util.outputFormat(hsva, this._locale.formatColor);
    };
    Md2Colorpicker.prototype._spectrumColorChange = function (event) {
        this.value = event;
    };
    Md2Colorpicker.prototype._clearValue = function (event) {
        event.stopPropagation();
        this.color = null;
    };
    Md2Colorpicker.prototype._onClickOk = function () {
        this.color = this.value;
        this._emitChangeEvent();
        this.close();
    };
    /** Emits an event when the user selects a color. */
    Md2Colorpicker.prototype._emitChangeEvent = function () {
        this._onChange(this.color);
        this.change.emit(new Md2ColorChange(this, this.color));
    };
    Md2Colorpicker.prototype.writeValue = function (value) {
        this.color = value;
    };
    Md2Colorpicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Colorpicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    Md2Colorpicker.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** Focuses the host element when the panel closes. */
    Md2Colorpicker.prototype._focusHost = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    Md2Colorpicker.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this.close();
        });
    };
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    Md2Colorpicker.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            if (this.container === 'inline') {
                var _a = this.positionX === 'before' ? ['end', 'start'] : ['start', 'end'], posX = _a[0], fallbackX = _a[1];
                var _b = this.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], fallbackOverlayY = _b[1];
                var originY = overlayY;
                var fallbackOriginY = fallbackOverlayY;
                if (!this.overlapTrigger) {
                    originY = overlayY === 'top' ? 'bottom' : 'top';
                    fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
                }
                config.positionStrategy = this.overlay.position().connectedTo(this._element, { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: originY }, { overlayX: fallbackX, overlayY: overlayY })
                    .withFallbackPosition({ originX: posX, originY: fallbackOriginY }, { overlayX: posX, overlayY: fallbackOverlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: fallbackOriginY }, { overlayX: fallbackX, overlayY: fallbackOverlayY });
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
            }
            else {
                config.positionStrategy = this.overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this.overlay.create(config);
        }
    };
    Md2Colorpicker.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    return Md2Colorpicker;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Colorpicker.prototype, "onOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Colorpicker.prototype, "onClose", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Colorpicker.prototype, "change", void 0);
__decorate([
    ViewChildren(TemplatePortalDirective),
    __metadata("design:type", QueryList)
], Md2Colorpicker.prototype, "templatePortals", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Colorpicker.prototype, "format", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Colorpicker.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Colorpicker.prototype, "color", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Colorpicker.prototype, "container", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Colorpicker.prototype, "placeholder", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], Md2Colorpicker.prototype, "required", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Colorpicker.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Colorpicker.prototype, "okLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Colorpicker.prototype, "cancelLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Colorpicker.prototype, "tabindex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2Colorpicker.prototype, "openOnFocus", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2Colorpicker.prototype, "isOpen", null);
Md2Colorpicker = __decorate([
    Component({selector: 'md2-colorpicker',
        template: "<div class=\"md2-colorpicker-trigger\"><div class=\"md2-colorpicker-preview\" tabindex=\"0\" (click)=\"toggle()\"><span [style.background]=\"color\"></span></div><div class=\"md2-colorpicker-input\" [class.md2-colorpicker-input-focused]=\"_inputFocused\"><span class=\"md2-colorpicker-placeholder\" [class.md2-floating-placeholder]=\"color || _inputFocused\">{{ placeholder }} </span><input class=\"md2-colorpicker-value\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" [(ngModel)]=\"color\" (change)=\"$event.stopPropagation()\" (focus)=\"_handleFocus($event)\" (blur)=\"_handleBlur($event)\"> <span *ngIf=\"color && !required && !disabled\" class=\"md2-colorpicker-clear\" (click)=\"_clearValue($event)\"><svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></span></div></div><ng-template portal><div class=\"md2-colorpicker-panel\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onPanelDone()\" [attr.container]=\"container\" tabindex=\"0\"><div class=\"md2-colorpicker-content\"><div class=\"md2-colorpicker-header\" [class.dark]=\"_isDark\" [style.background]=\"value\"><div class=\"md2-colorpicker-header-input\">{{ value }}</div><div class=\"md2-colorpicker-formats\"><span *ngFor=\"let f of _formats\" [class.active]=\"f===_locale.format\" (click)=\"_setFormat(f)\">{{ f }}</span></div></div><div class=\"md2-colorpicker-container\"><md2-color-spectrum [color]=\"value\" (colorChange)=\"_spectrumColorChange($event)\"></md2-color-spectrum></div><div class=\"md2-colorpicker-actions\"><div class=\"md2-button\" (click)=\"close()\">Cancel</div><div class=\"md2-button\" (click)=\"_onClickOk()\">Ok</div></div></div></div></ng-template>",
        styles: ["md2-colorpicker{position:relative;display:block;outline:0;backface-visibility:hidden}md2-colorpicker.md2-colorpicker-disabled{pointer-events:none;cursor:default}.md2-colorpicker-trigger{display:flex;margin:18px 0;cursor:pointer}.md2-colorpicker-preview{position:relative;display:inline-block;width:24px;height:24px;margin-right:8px;border:2px solid #fff;border-radius:50%;overflow:hidden;background-color:#fff;background-image:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:12px 12px;background-position:0 0,6px 6px;box-shadow:0 3px 1px -2px rgba(0,0,0,.14),0 2px 2px 0 rgba(0,0,0,.098),0 1px 5px 0 rgba(0,0,0,.084)}.md2-colorpicker-preview span{display:block;width:100%;height:100%}.md2-colorpicker-input{position:relative;display:flex;flex:1;color:rgba(0,0,0,.38);justify-content:space-between;align-items:center;height:30px;line-height:22px;border-bottom:1px solid rgba(0,0,0,.12);box-sizing:border-box}.md2-colorpicker-disabled .md2-colorpicker-input{color:rgba(0,0,0,.38);border-color:transparent;background-image:linear-gradient(to right,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 33%,transparent 0);background-position:bottom -1px left 0;background-size:4px 1px;background-repeat:repeat-x}.md2-colorpicker-input.md2-colorpicker-input-focused{color:#106cc8;border-color:#106cc8}md2-colorpicker:focus:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#106cc8;border-color:#106cc8}md2-colorpicker.ng-invalid.ng-touched:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#f44336;border-color:#f44336}.md2-colorpicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;transform:translate3d(0,26px,0) scale(1);transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:all 150ms cubic-bezier(.25,.8,.25,1)}.md2-colorpicker-placeholder.md2-floating-placeholder{left:-2px;text-align:left;transform:translate3d(0,6px,0) scale(.75)}[dir=rtl] .md2-colorpicker-placeholder{right:0;left:18px;transform-origin:right top}[dir=rtl] .md2-colorpicker-placeholder.md2-floating-placeholder{right:-2px;text-align:right}[aria-required=true] .md2-colorpicker-placeholder::after{content:'*'}.md2-colorpicker-value{position:relative;width:100%;padding:2px;color:rgba(0,0,0,.87);border:0;outline:0;background:0 0}.md2-colorpicker-disabled .md2-colorpicker-value{color:rgba(0,0,0,.38)}.md2-colorpicker-clear{color:rgba(0,0,0,.54)}.md2-colorpicker-clear svg{fill:currentColor}.md2-colorpicker-panel{max-width:350px;border-radius:3px;overflow:auto;-webkit-overflow-scrolling:touch;background:#fff;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-sizing:border-box;outline:0;user-select:none}.md2-colorpicker-panel[container=dialog]{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-colorpicker-header{height:80px;color:#fff}.md2-colorpicker-header.dark{color:#000}.md2-colorpicker-header-input{font-size:16px;font-weight:700;text-align:center;line-height:50px}.md2-colorpicker-formats{display:flex}.md2-colorpicker-formats span{flex:1;padding:4px 8px 3px;text-align:center;text-transform:uppercase;cursor:pointer;border-bottom:2px solid transparent;background:rgba(255,255,255,.25);box-sizing:border-box}.dark .md2-colorpicker-formats span{background:rgba(0,0,0,.25)}.md2-colorpicker-formats span.active{cursor:default;background:0 0;border-color:rgba(255,255,255,.5)}.dark .md2-colorpicker-formats span.active{border-color:rgba(0,0,0,.5)}.md2-colorpicker-container{width:256px;padding:8px}.md2-colorpicker-actions{text-align:right}.md2-colorpicker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-colorpicker-actions .md2-button:hover{background:#ebebeb}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=colorpicker.css.map */ "],
        host: {
            'role': 'colorpicker',
            '[attr.aria-label]': 'placeholder',
            '[attr.aria-required]': 'required.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.aria-invalid]': '_control?.invalid || "false"',
            '[class.md2-colorpicker-disabled]': 'disabled',
            '(window:resize)': '_handleWindowResize($event)'
        },
        animations: [
            trigger('fadeInContent', [
                state('showing', style({ opacity: 1 })),
                transition('void => showing', [
                    style({ opacity: 0 }),
                    animate("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
                ])
            ])
        ],
        encapsulation: ViewEncapsulation.None
    }),
    __param(6, Self()), __param(6, Optional()),
    __metadata("design:paramtypes", [ElementRef, Overlay,
        ViewContainerRef, Renderer,
        ColorLocale, ColorUtil,
        NgControl])
], Md2Colorpicker);
export { Md2Colorpicker };
//# sourceMappingURL=colorpicker.js.map