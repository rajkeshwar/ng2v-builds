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
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
var Md2Clock = (function () {
    function Md2Clock(_locale, _util) {
        var _this = this;
        this._locale = _locale;
        this._util = _util;
        /** Whether the clock should be started in hour or minute view. */
        this.startView = 'hour';
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /** Date filter for the hour and minute views. */
        this._dateFilterForViews = function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate || _this._util.isSameDay(date, _this.minDate)) &&
                (!_this.maxDate || _this._util.isSameDay(date, _this.maxDate));
        };
        /** Grid of calendar cells representing the dates of the month. */
        this._hours = [];
        this._minutes = [];
    }
    Object.defineProperty(Md2Clock.prototype, "startAt", {
        /** A date representing the period (hour or minute) to start the clock in. */
        get: function () { return this._startAt; },
        set: function (value) { this._startAt = this._locale.parseDate(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "selected", {
        /** The currently selected date. */
        get: function () { return this._selected; },
        set: function (value) {
            this._selected = this._locale.parseDate(value);
            this._getTimeInCurrentDate(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () { return this._minDate; },
        set: function (date) { this._minDate = this._locale.parseDate(date); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Md2Clock.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () { return this._maxDate; },
        set: function (date) { this._maxDate = this._locale.parseDate(date); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Md2Clock.prototype, "_activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: function () { return this._clampedActiveDate; },
        set: function (value) {
            this._clampedActiveDate = this._util.clampDate(value, this.minDate, this.maxDate);
            this._init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "_label", {
        /** The label for the current clock view. */
        get: function () {
            return this._hourView ?
                this._locale.getCalendarMonthHeaderLabel(this._activeDate) :
                this._locale.getCalendarYearHeaderLabel(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "_hand", {
        get: function () {
            var CLOCK_INNER_RADIUS = 27.5;
            var CLOCK_OUTER_RADIUS = 41.25;
            var deg = 0;
            var radius = CLOCK_OUTER_RADIUS;
            //if (this._view) {
            var inner = this._hour > 0 && this._hour < 13;
            radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
            deg = Math.round(this._hour * (360 / (24 / 2)));
            //} else {
            //  deg = Math.round(this._minute * (360 / 60));
            //}
            return {
                'transform': "rotate(" + deg + "deg)",
                'height': radius + "%",
                'margin-top': 50 - radius + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Md2Clock.prototype.ngAfterContentInit = function () {
        this._activeDate = this.startAt || this._util.today();
        this._hourView = this.startView != 'minute';
        this._init();
    };
    /** Handles date selection in the hour view. */
    Md2Clock.prototype._dateSelected = function (date) {
        if ((!date || !this.selected) && date != this.selected || this._util.isSameDay(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    };
    /** Initializes this month view. */
    Md2Clock.prototype._init = function () {
        //this._selected = this._getMonthInCurrentYear(this.selected);
        //this._todayMonth = this._getMonthInCurrentYear(SimpleDate.today());
        //this._yearLabel = this._locale.getCalendarYearHeaderLabel(this.activeDate);
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        //this._hours = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(row => row.map(
        //  month => this._createCellForMonth(month)));
        var CLOCK_RADIUS = 50;
        var CLOCK_INNER_RADIUS = 27.5;
        var CLOCK_OUTER_RADIUS = 41.25;
        var CLOCK_TICK_RADIUS = 7.0833;
        this._hours.length = 0;
        for (var i = 0; i < 24; i++) {
            //let x = -(50 * (Math.sin(-Math.PI * (i / 6))));
            //let y = -(50 * (Math.cos(-Math.PI * (i / 6))));
            //this._hours.push({
            //  hour: i === 0 ? '00' : i,
            //  top: y,
            //  left: x
            //});
            var radian = i / 6 * Math.PI;
            var inner = i > 0 && i < 13, radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
            this._hours.push({
                hour: i === 0 ? '00' : i,
                top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
            });
        }
        for (var i = 0; i < 60; i += 5) {
            var radian = i / 30 * Math.PI;
            this._minutes.push({
                minute: i === 0 ? '00' : i,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
    };
    /** Handles hour selection in the minute view. */
    Md2Clock.prototype._hourSelected = function (hour) {
        this._activeDate = hour;
        this._hourView = true;
    };
    /** Handles user clicks on the period label. */
    Md2Clock.prototype._currentPeriodClicked = function () {
        this._hourView = !this._hourView;
    };
    /** Handles user clicks on the previous button. */
    Md2Clock.prototype._previousClicked = function () {
        this._activeDate = this._hourView ?
            this._util.incrementHours(this._activeDate, -1) :
            this._util.incrementYears(this._activeDate, -1);
    };
    /** Handles user clicks on the next button. */
    Md2Clock.prototype._nextClicked = function () {
        this._activeDate = this._hourView ?
            this._util.incrementHours(this._activeDate, 1) : this._util.incrementMinutes(this._activeDate, 1);
    };
    /** Whether the previous period button is enabled. */
    Md2Clock.prototype._previousEnabled = function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    };
    /** Whether the next period button is enabled. */
    Md2Clock.prototype._nextEnabled = function () {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    };
    /** Whether the two dates represent the same view in the current view mode (hour or minute). */
    Md2Clock.prototype._isSameView = function (date1, date2) {
        return this._hourView ?
            date1.getFullYear() == date2.getFullYear() && date1.getHours() == date2.getHours() :
            date1.getFullYear() == date2.getFullYear();
    };
    /** Handles keydown events on the clock body. */
    Md2Clock.prototype._handleClockBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._hourView) {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else {
            this._handleCalendarBodyKeydownInYearView(event);
        }
    };
    /** Handles keydown events on the clock body when clock is in hour view. */
    Md2Clock.prototype._handleCalendarBodyKeydownInMonthView = function (event) {
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
                    this._util.incrementHours(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this._activeDate = event.altKey ?
                    this._util.incrementYears(this._activeDate, 1) :
                    this._util.incrementHours(this._activeDate, 1);
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
    /** Handles keydown events on the clock body when clock is in minute view. */
    Md2Clock.prototype._handleCalendarBodyKeydownInYearView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._util.incrementHours(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._util.incrementHours(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case DOWN_ARROW:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case HOME:
                this._activeDate = this._util.incrementHours(this._activeDate, -this._activeDate.getHours());
                break;
            case END:
                this._activeDate = this._util.incrementHours(this._activeDate, 11 - this._activeDate.getHours());
                break;
            case PAGE_UP:
                this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this._activeDate = this._util.incrementYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._hourSelected(this._activeDate);
                break;
            default:
                // Don't prevent default on keys that we don't explicitly handle.
                return;
        }
        event.preventDefault();
    };
    /**
     * Determine the date for the hour that comes before the given hour in the same column in the
     * clock table.
     */
    Md2Clock.prototype._prevMonthInSameCol = function (date) {
        // Determine how many hours to jump forward given that there are 2 empty slots at the beginning
        // of each minute.
        var increment = date.getHours() <= 4 ? -5 : (date.getHours() >= 7 ? -7 : -12);
        return this._util.incrementHours(date, increment);
    };
    /**
     * Determine the date for the hour that comes after the given hour in the same column in the
     * clock table.
     */
    Md2Clock.prototype._nextMonthInSameCol = function (date) {
        // Determine how many hours to jump forward given that there are 2 empty slots at the beginning
        // of each minute.
        var increment = date.getHours() <= 4 ? 7 : (date.getHours() >= 7 ? 5 : 12);
        return this._util.incrementHours(date, increment);
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    Md2Clock.prototype._getTimeInCurrentDate = function (date) {
        this._hour = date ? date.getHours() : null;
        this._minute = date ? date.getMinutes() : null;
    };
    return Md2Clock;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Clock.prototype, "startAt", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Clock.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Clock.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Clock.prototype, "minDate", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Clock.prototype, "maxDate", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2Clock.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Clock.prototype, "selectedChange", void 0);
Md2Clock = __decorate([
    Component({selector: 'md2-clock',
        template: "<div class=\"md2-clock\" tabindex=\"0\" (keydown)=\"_handleClockBodyKeydown($event)\" cdkMonitorSubtreeFocus><div class=\"md2-clock-center\"></div><div class=\"md2-clock-hand\" [ngStyle]=\"_hand\"></div><div class=\"md2-clock-hours\" [class.active]=\"_hourView\"><div *ngFor=\"let h of _hours\" class=\"md2-clock-cell\" [class.md2-clock-cell-selected]=\"_hour == h.hour\" [style.top]=\"h.top+'%'\" [style.left]=\"h.left+'%'\">{{ h.hour }}</div></div><div class=\"md2-clock-minutes\" [class.active]=\"!_hourView\"><div *ngFor=\"let m of _minutes\" class=\"md2-clock-cell\" [class.md2-clock-cell-selected]=\"_minute == m.minute\" [style.top]=\"m.top+'%'\" [style.left]=\"m.left+'%'\">{{ m.minute }}</div></div></div>",
        styles: ["md2-clock{position:relative;display:block;min-width:224px;font-size:13px;background-color:#e0e0e0;border-radius:50%;box-sizing:border-box}.md2-clock{position:relative;width:100%;height:0;padding-top:100%}.md2-clock-center{position:absolute;top:50%;left:50%;width:2.5%;height:2.5%;margin:-1.25%;border-radius:50%;background-color:#106cc8}.md2-clock-hand{position:absolute;top:0;right:0;bottom:0;left:0;width:1px;margin:0 auto;background-color:#106cc8;transform-origin:bottom}.md2-clock-hand::before{content:'';position:absolute;top:-4px;left:-4px;width:8px;height:8px;border-radius:50%;background-color:#106cc8}.md2-clock-hours,.md2-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:350ms;transform:scale(1.2)}.md2-clock-hours.active,.md2-clock-minutes.active{opacity:1;visibility:visible;transform:scale(1)}.md2-clock-minutes{transform:scale(.8)}.md2-clock-cell{position:absolute;display:flex;width:14.1666%;height:14.1666%;color:rgba(0,0,0,.87);justify-content:center;box-sizing:border-box;border-radius:50%;align-items:center;cursor:pointer}.md2-clock-cell:hover{background-color:rgba(0,0,0,.1)}.md2-clock-cell.md2-clock-cell-selected{background-color:#65acf3} /*# sourceMappingURL=clock.css.map */ "],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [DateLocale, DateUtil])
], Md2Clock);
export { Md2Clock };
//# sourceMappingURL=clock.js.map