var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
var Md2YearView = (function () {
    function Md2YearView(_element, _locale, _util) {
        this._element = _element;
        this._locale = _locale;
        this._util = _util;
        this._activeDate = this._util.today();
        /** Emits when a new month is selected. */
        this.selectedChange = new EventEmitter();
    }
    Object.defineProperty(Md2YearView.prototype, "activeDate", {
        /** The date to display in this year view (everything other than the year is ignored). */
        get: function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            this._activeDate = this._locale.parseDate(value) || this._util.today();
            this._activeYear = this._getYearInCurrentDate(this._activeDate);
            if (oldActiveDate.getFullYear() != this._activeDate.getFullYear()) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2YearView.prototype, "selected", {
        /** The currently selected date. */
        get: function () { return this._selected; },
        set: function (value) {
            this._selected = this._locale.parseDate(value);
            this._selectedYear = this._getYearInCurrentDate(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2YearView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () { return this._minDate; },
        set: function (date) { this._minDate = this._locale.parseDate(date); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Md2YearView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () { return this._maxDate; },
        set: function (date) { this._maxDate = this._locale.parseDate(date); },
        enumerable: true,
        configurable: true
    });
    ;
    Md2YearView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /** Handles when a new month is selected. */
    Md2YearView.prototype._yearSelected = function (year) {
        this.selectedChange.emit(new Date(year, this.activeDate.getMonth(), this._activeDate.getDate(), this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds()));
    };
    /** Initializes this month view. */
    Md2YearView.prototype._init = function () {
        this._selectedYear = this._getYearInCurrentDate(this.selected);
        this._createYears();
    };
    /** Create years. */
    Md2YearView.prototype._createYears = function () {
        var startYear = this._minDate ? this._minDate.getFullYear() : 1900;
        var endYear = this._maxDate ? this._maxDate.getFullYear() :
            this._util.today().getFullYear() + 100;
        this._years = [];
        for (var i = startYear; i <= endYear; i++) {
            this._years.push(i);
        }
        this._setScrollTop();
    };
    /** Set Scroll of the years container. */
    Md2YearView.prototype._setScrollTop = function () {
        var _this = this;
        setTimeout(function () {
            var scrollContainer = _this._element.nativeElement;
            var selectedIndex = (_this._selectedYear ? _this._selectedYear : _this._activeYear) - 1900;
            scrollContainer.scrollTop = 20 + (selectedIndex * 40) - (scrollContainer.clientHeight / 2);
        }, 10);
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    Md2YearView.prototype._getYearInCurrentDate = function (date) {
        return date ? date.getFullYear() : null;
    };
    return Md2YearView;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2YearView.prototype, "activeDate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2YearView.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2YearView.prototype, "minDate", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2YearView.prototype, "maxDate", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2YearView.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2YearView.prototype, "selectedChange", void 0);
Md2YearView = __decorate([
    Component({selector: 'md2-year-view',
        template: "<div class=\"md2-year-view-content\"><div *ngFor=\"let year of _years\" class=\"md2-calendar-year\" [class.md2-year-focused]=\"_activeYear === year\" [class.md2-year-selected]=\"_selectedYear === year\" (click)=\"_yearSelected(year)\">{{ year }}</div></div>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [ElementRef,
        DateLocale, DateUtil])
], Md2YearView);
export { Md2YearView };
//# sourceMappingURL=year-view.js.map