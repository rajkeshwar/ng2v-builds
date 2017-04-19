import { AfterContentInit, EventEmitter } from '@angular/core';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
export declare class Md2Clock implements AfterContentInit {
    private _locale;
    private _util;
    /** A date representing the period (hour or minute) to start the clock in. */
    startAt: any;
    private _startAt;
    /** Whether the clock should be started in hour or minute view. */
    startView: 'hour' | 'minute';
    /** The currently selected date. */
    selected: any;
    private _selected;
    private _hour;
    private _minute;
    /** The minimum selectable date. */
    minDate: Date;
    private _minDate;
    /** The maximum selectable date. */
    maxDate: Date;
    private _maxDate;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: Date) => boolean;
    /** Emits when the currently selected date changes. */
    selectedChange: EventEmitter<Date>;
    /** Date filter for the hour and minute views. */
    _dateFilterForViews: (date: Date) => boolean;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    _activeDate: Date;
    /** Grid of calendar cells representing the dates of the month. */
    _hours: Array<Object>;
    _minutes: Array<Object>;
    private _clampedActiveDate;
    /** Whether the clock is in hour view. */
    _hourView: boolean;
    /** The label for the current clock view. */
    readonly _label: string;
    readonly _hand: any;
    constructor(_locale: DateLocale, _util: DateUtil);
    ngAfterContentInit(): void;
    /** Handles date selection in the hour view. */
    _dateSelected(date: Date): void;
    /** Initializes this month view. */
    private _init();
    /** Handles hour selection in the minute view. */
    _hourSelected(hour: Date): void;
    /** Handles user clicks on the period label. */
    _currentPeriodClicked(): void;
    /** Handles user clicks on the previous button. */
    _previousClicked(): void;
    /** Handles user clicks on the next button. */
    _nextClicked(): void;
    /** Whether the previous period button is enabled. */
    _previousEnabled(): boolean;
    /** Whether the next period button is enabled. */
    _nextEnabled(): boolean;
    /** Whether the two dates represent the same view in the current view mode (hour or minute). */
    private _isSameView(date1, date2);
    /** Handles keydown events on the clock body. */
    _handleClockBodyKeydown(event: KeyboardEvent): void;
    /** Handles keydown events on the clock body when clock is in hour view. */
    private _handleCalendarBodyKeydownInMonthView(event);
    /** Handles keydown events on the clock body when clock is in minute view. */
    private _handleCalendarBodyKeydownInYearView(event);
    /**
     * Determine the date for the hour that comes before the given hour in the same column in the
     * clock table.
     */
    private _prevMonthInSameCol(date);
    /**
     * Determine the date for the hour that comes after the given hour in the same column in the
     * clock table.
     */
    private _nextMonthInSameCol(date);
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private _getTimeInCurrentDate(date);
}
