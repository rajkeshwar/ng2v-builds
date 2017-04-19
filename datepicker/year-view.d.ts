import { ElementRef, AfterContentInit, EventEmitter } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
export declare class Md2YearView implements AfterContentInit {
    private _element;
    private _locale;
    private _util;
    /** The date to display in this year view (everything other than the year is ignored). */
    activeDate: Date;
    private _activeDate;
    /** The currently selected date. */
    selected: Date;
    private _selected;
    /** The minimum selectable date. */
    minDate: Date;
    private _minDate;
    /** The maximum selectable date. */
    maxDate: Date;
    private _maxDate;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: Date) => boolean;
    /** Emits when a new month is selected. */
    selectedChange: EventEmitter<Date>;
    /** Grid of calendar cells representing the months of the year. */
    _years: Array<number>;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     */
    _selectedYear: number;
    _activeYear: number;
    constructor(_element: ElementRef, _locale: DateLocale, _util: DateUtil);
    ngAfterContentInit(): void;
    /** Handles when a new month is selected. */
    _yearSelected(year: number): void;
    /** Initializes this month view. */
    private _init();
    /** Create years. */
    private _createYears();
    /** Set Scroll of the years container. */
    private _setScrollTop();
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private _getYearInCurrentDate(date);
}
