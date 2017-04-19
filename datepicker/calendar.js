var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '../core/keyboard/keycodes';
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
var Md2Calendar = (function () {
    function Md2Calendar(_locale, _util) {
        var _this = this;
        this._locale = _locale;
        this._util = _util;
        /** Whether the calendar should be started in month or year view. */
        this.startView = 'month';
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /** Date filter for the month and year views. */
        this._dateFilterForViews = function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate || _this._util.isSameDay(date, _this.minDate)) &&
                (!_this.maxDate || _this._util.isSameDay(date, _this.maxDate));
        };
    }
    Object.defineProperty(Md2Calendar.prototype, "startAt", {
        /** A date representing the period (month or year) to start the calendar in. */
        get: function () { return this._startAt; },
        set: function (value) { this._startAt = this._locale.parseDate(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "selected", {
        /** The currently selected date. */
        get: function () { return this._selected; },
        set: function (value) { this._selected = this._locale.parseDate(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () { return this._minDate; },
        set: function (date) { this._minDate = this._locale.parseDate(date); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Md2Calendar.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () { return this._maxDate; },
        set: function (date) { this._maxDate = this._locale.parseDate(date); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Md2Calendar.prototype, "_activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: function () { return this._clampedActiveDate; },
        set: function (value) {
            this._clampedActiveDate = this._util.clampDate(value, this.minDate, this.maxDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_label", {
        /** The label for the current calendar view. */
        get: function () {
            return this._monthView ?
                this._locale.getCalendarMonthHeaderLabel(this._activeDate) :
                this._locale.getCalendarYearHeaderLabel(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Md2Calendar.prototype.ngAfterContentInit = function () {
        this._activeDate = this.startAt || this._util.today();
        this._monthView = this.startView != 'year';
    };
    /** Handles date selection in the month view. */
    Md2Calendar.prototype._dateSelected = function (date) {
        if ((!date || !this.selected) && date != this.selected ||
            this._util.isSameDay(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    };
    /** Handles month selection in the year view. */
    Md2Calendar.prototype._monthSelected = function (month) {
        this._activeDate = month;
        this._monthView = true;
    };
    /** Handles user clicks on the period label. */
    Md2Calendar.prototype._currentPeriodClicked = function () {
        this._monthView = !this._monthView;
    };
    /** Handles user clicks on the previous button. */
    Md2Calendar.prototype._previousClicked = function () {
        this._activeDate = this._monthView ?
            this._util.incrementMonths(this._activeDate, -1) :
            this._util.incrementYears(this._activeDate, -1);
    };
    /** Handles user clicks on the next button. */
    Md2Calendar.prototype._nextClicked = function () {
        this._activeDate = this._monthView ?
            this._util.incrementMonths(this._activeDate, 1) :
            this._util.incrementYears(this._activeDate, 1);
    };
    /** Whether the previous period button is enabled. */
    Md2Calendar.prototype._previousEnabled = function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    };
    /** Whether the next period button is enabled. */
    Md2Calendar.prototype._nextEnabled = function () {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    Md2Calendar.prototype._isSameView = function (date1, date2) {
        return this._monthView ?
            date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() :
            date1.getFullYear() == date2.getFullYear();
    };
    /** Handles keydown events on the calendar body. */
    Md2Calendar.prototype._handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._monthView) {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else {
            this._handleCalendarBodyKeydownInYearView(event);
        }
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    Md2Calendar.prototype._handleCalendarBodyKeydownInMonthView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._util.incrementDays(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._util.incrementDays(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._util.incrementDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this._activeDate = this._util.incrementDays(this._activeDate, 7);
                break;
            case HOME:
                this._activeDate = this._util.getFirstDateOfMonth(this._activeDate);
                break;
            case END:
                this._activeDate = this._util.getLastDateOfMonth(this._activeDate);
                break;
            case PAGE_UP:
                this._activeDate = event.altKey ?
                    this._util.incrementYears(this._activeDate, -1) :
                    this._util.incrementMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this._activeDate = event.altKey ?
                    this._util.incrementYears(this._activeDate, 1) :
                    this._util.incrementMonths(this._activeDate, 1);
                break;
            case ENTER:
                if (this._dateFilterForViews(this._activeDate)) {
                    this._dateSelected(this._activeDate);
                    break;
                }
                return;
            default:
                // Don't prevent default on keys that we don't explicitly handle.
                return;
        }
        event.preventDefault();
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    Md2Calendar.prototype._handleCalendarBodyKeydownInYearView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._util.incrementMonths(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._util.incrementMonths(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case DOWN_ARROW:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case HOME:
                this._activeDate = this._util.incrementMonths(this._activeDate, -this._activeDate.getMonth());
                break;
            case END:
                this._activeDate = this._util.incrementMonths(this._activeDate, 11 - this._activeDate.getMonth());
                break;
            case PAGE_UP:
                this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._monthSelected(this._activeDate);
                break;
            default:
                // Don't prevent default on keys that we don't explicitly handle.
                return;
        }
        event.preventDefault();
    };
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    Md2Calendar.prototype._prevMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var increment = date.getMonth() <= 4 ? -5 : (date.getMonth() >= 7 ? -7 : -12);
        return this._util.incrementMonths(date, increment);
    };
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     */
    Md2Calendar.prototype._nextMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var increment = date.getMonth() <= 4 ? 7 : (date.getMonth() >= 7 ? 5 : 12);
        return this._util.incrementMonths(date, increment);
    };
    return Md2Calendar;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Calendar.prototype, "startAt", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Calendar.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Calendar.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Calendar.prototype, "minDate", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Calendar.prototype, "maxDate", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2Calendar.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Calendar.prototype, "selectedChange", void 0);
Md2Calendar = __decorate([
    Component({selector: 'md2-calendar',
        template: "<div class=\"md2-calendar-header\" *ngIf=\"_monthView\"><button class=\"md2-calendar-button md2-calendar-previous-button\" [class.md2-calendar-disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z\"/><path d=\"M0-.5h24v24H0z\" fill=\"none\"/></svg></button> <button class=\"md2-calendar-button md2-calendar-period-button\" (click)=\"_currentPeriodClicked()\">{{_label}}</button> <button class=\"md2-calendar-button md2-calendar-next-button\" [class.md2-calendar-disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z\"/><path d=\"M0-.25h24v24H0z\" fill=\"none\"/></svg></button></div><div class=\"md2-calendar-body\" tabindex=\"0\" (keydown)=\"_handleCalendarBodyKeydown($event)\" cdkMonitorSubtreeFocus><md2-month-view *ngIf=\"_monthView\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_dateSelected($event)\"></md2-month-view><md2-year-view *ngIf=\"!_monthView\" [minDate]=\"minDate\" [maxDate]=\"maxDate\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"_dateFilterForViews\" (selectedChange)=\"_monthSelected($event)\"></md2-year-view></div>",
        styles: [".md2-calendar{display:block;background-color:#fff}.md2-calendar-body{padding:8px}.md2-calendar-header{display:flex;justify-content:space-between;font-size:14px;font-weight:700;text-align:center;line-height:48px}.md2-calendar-button{display:inline-block;min-width:48px;background:0 0;padding:0;margin:0;border:none;outline:0;cursor:pointer}.md2-calendar-button.md2-calendar-disabled{opacity:.5}.md2-calendar-period-button{font:inherit;font-size:14px;font-weight:700}.md2-calendar-button>svg{vertical-align:middle}md2-year-view{display:block;width:100%;height:276px;line-height:40px;background:#fff;overflow-x:hidden;overflow-y:auto;transition:.3s}.md2-year-view-content{display:flex;flex-direction:column;justify-content:center;min-height:100%}.md2-calendar-year{position:relative;display:block;margin:0 auto;padding:0;font-size:17px;font-weight:400;text-align:center;cursor:pointer}.md2-calendar-year.md2-year-focused,.md2-calendar-year.md2-year-selected{color:#106cc8}.md2-calendar-year.md2-year-selected{font-size:26px;font-weight:500}.md2-month-view-table{border-spacing:0;border-collapse:collapse;font-size:13px;min-width:224px;width:100%;text-align:center}.md2-month-view-table th{font-size:11px;color:rgba(0,0,0,.36)}.md2-month-view-table-label{padding:7.14286% 0 7.14286% 7.14286%;height:0;line-height:0;transform:translateX(-6px);text-align:left;font-size:14px;font-weight:700;color:rgba(0,0,0,.54)}.md2-month-view-table-cell{position:relative;width:14.28571%;height:0;line-height:0;padding:7.14286% 0;text-align:center}.md2-month-view-table-cell-content{position:absolute;top:5%;left:5%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;border-width:1px;border-style:solid;border-radius:50%;color:rgba(0,0,0,.87);border-color:transparent;cursor:pointer}.md2-month-view-table-disabled>.md2-month-view-table-cell-content:not(.md2-month-view-table-selected){color:rgba(0,0,0,.38)}[dir=rtl] .md2-month-view-table-label{padding:0 7.14286% 0 0;transform:translateX(6px);text-align:right}.md2-month-view-table-active>.md2-month-view-table-cell-content:not(.md2-month-view-table-selected),:not(.md2-month-view-table-disabled):hover>.md2-month-view-table-cell-content:not(.md2-month-view-table-selected){background-color:rgba(0,0,0,.1)}.md2-month-view-table-selected{background-color:#106cc8;color:rgba(255,255,255,.87)}.md2-month-view-table-disabled>.md2-month-view-table-selected{background-color:rgba(16,108,200,.4)}.md2-month-view-table-today:not(.md2-month-view-table-selected){border-color:#106cc8}.md2-month-view-table-disabled>.md2-month-view-table-today:not(.md2-month-view-table-selected){border-color:rgba(0,0,0,.18)}.md2-month-view-table-today.md2-month-view-table-selected{box-shadow:inset 0 0 0 1px rgba(255,255,255,.87)} /*# sourceMappingURL=calendar.css.map */ "],
        host: {
            '[class.md2-calendar]': 'true',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [DateLocale, DateUtil])
], Md2Calendar);
export { Md2Calendar };
//# sourceMappingURL=calendar.js.map