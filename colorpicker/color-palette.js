var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
var MdCalendarTable = (function () {
    function MdCalendarTable() {
    }
    return MdCalendarTable;
}());
MdCalendarTable = __decorate([
    Component({selector: 'md2-color-palette',
        template: "<div class=\"mat-calendar-body\" tabindex=\"0\" (keydown)=\"_handleCalendarBodyKeydown($event)\" cdkMonitorSubtreeFocus><md-month-view *ngIf=\"_monthView\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_dateSelected($event)\"></md-month-view><md-year-view *ngIf=\"!_monthView\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_monthSelected($event)\"></md-year-view></div>",
        styles: [" /*# sourceMappingURL=color-palette.css.map */ "],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], MdCalendarTable);
export { MdCalendarTable };
//# sourceMappingURL=color-palette.js.map