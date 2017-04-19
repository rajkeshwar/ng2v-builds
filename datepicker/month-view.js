var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
var Md2CalendarCell = (function () {
    function Md2CalendarCell(value, displayValue, enabled) {
        this.value = value;
        this.displayValue = displayValue;
        this.enabled = enabled;
    }
    return Md2CalendarCell;
}());
export { Md2CalendarCell };
var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
var Md2MonthView = (function () {
    function Md2MonthView(_locale, _util) {
        this._locale = _locale;
        this._util = _util;
        this._activeDate = this._util.today();
        /** Emits when a new date is selected. */
        this.selectedChange = new EventEmitter();
        this._weekdays = this._locale.narrowDays.slice(this._locale.firstDayOfWeek)
            .concat(this._locale.narrowDays.slice(0, this._locale.firstDayOfWeek));
    }
    Object.defineProperty(Md2MonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         */
        get: function () { return this._activeDate; },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            this._activeDate = this._locale.parseDate(value) || this._util.today();
            if (!this._util.isSameMonthAndYear(oldActiveDate, this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2MonthView.prototype, "selected", {
        /** The currently selected date. */
        get: function () { return this._selected; },
        set: function (value) {
            this._selected = this._locale.parseDate(value);
            this._selectedDate = this._getDateInCurrentMonth(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    /** Handles when a new date is selected. */
    Md2MonthView.prototype._cellClicked = function (cell) {
        if (!cell.enabled || this._selectedDate == cell.value) {
            return;
        }
        this.selectedChange.emit(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), cell.value, this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds()));
    };
    Object.defineProperty(Md2MonthView.prototype, "_firstRowOffset", {
        /** The number of blank cells to put at the beginning for the first row. */
        get: function () {
            return this._weeks && this._weeks.length && this._weeks[0].length ?
                DAYS_PER_WEEK - this._weeks[0].length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Md2MonthView.prototype._isActiveCell = function (rowIndex, colIndex) {
        var cellNumber = rowIndex * DAYS_PER_WEEK + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber == this.activeDate.getDate() - 1;
    };
    Md2MonthView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /** Initializes this month view. */
    Md2MonthView.prototype._init = function () {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._util.today());
        var firstOfMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), 1, this.activeDate.getHours(), this.activeDate.getMinutes(), this.activeDate.getSeconds());
        this._firstWeekOffset =
            (DAYS_PER_WEEK + firstOfMonth.getDay() - this._locale.firstDayOfWeek) % DAYS_PER_WEEK;
        this._createWeekCells();
    };
    /** Creates Md2CalendarCells for the dates in this month. */
    Md2MonthView.prototype._createWeekCells = function () {
        var daysInMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate();
        this._weeks = [[]];
        for (var i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            var enabled = !this.dateFilter ||
                this.dateFilter(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), i + 1));
            this._weeks[this._weeks.length - 1]
                .push(new Md2CalendarCell(i + 1, this._locale.dates[i + 1], enabled));
        }
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    Md2MonthView.prototype._getDateInCurrentMonth = function (date) {
        return this._util.isSameMonthAndYear(date, this.activeDate) ? date.getDate() : null;
    };
    return Md2MonthView;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2MonthView.prototype, "activeDate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2MonthView.prototype, "selected", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Md2MonthView.prototype, "dateFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2MonthView.prototype, "selectedChange", void 0);
Md2MonthView = __decorate([
    Component({selector: 'md2-month-view',
        template: "<table class=\"md2-month-view-table\"><thead><tr><th *ngFor=\"let day of _weekdays\">{{day}}</th></tr></thead><tbody><tr *ngFor=\"let row of _weeks; let rowIndex = index\"><td *ngIf=\"rowIndex === 0 && _firstRowOffset\" class=\"md2-month-view-table-label\" [attr.colspan]=\"_firstRowOffset\"></td><td *ngFor=\"let item of row; let colIndex = index\" class=\"md2-month-view-table-cell\" [class.md2-month-view-table-disabled]=\"!item.enabled\" [class.md2-month-view-table-active]=\"_isActiveCell(rowIndex, colIndex)\" (click)=\"_cellClicked(item)\"><div class=\"md2-month-view-table-cell-content\" [class.md2-month-view-table-selected]=\"_selectedDate === item.value\" [class.md2-month-view-table-today]=\"_todayDate === item.value\">{{item.displayValue}}</div></td></tr></tbody></table>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [DateLocale, DateUtil])
], Md2MonthView);
export { Md2MonthView };
//# sourceMappingURL=month-view.js.map