var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
/**
 * Component used as the panel for the datepicker dialog and popup.
 * @docs-internal
 */
var Md2DatepickerPanel = (function () {
    function Md2DatepickerPanel(_elementRef) {
        this._elementRef = _elementRef;
    }
    Md2DatepickerPanel.prototype.ngAfterContentInit = function () {
        //this._elementRef.nativeElement.querySelector('.md2-calendar-body').focus();
    };
    return Md2DatepickerPanel;
}());
Md2DatepickerPanel = __decorate([
    Component({selector: 'md2-datepicker-panel',
        template: "<md2-calendar cdkTrapFocus></md2-calendar><md2-clock cdkTrapFocus></md2-clock>",
        styles: [" /*# sourceMappingURL=datepicker-panel.css.map */ "],
        host: {
            '[class.md2-datepicker-panel]': 'true',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [ElementRef])
], Md2DatepickerPanel);
export { Md2DatepickerPanel };
//# sourceMappingURL=datepicker-panel.js.map