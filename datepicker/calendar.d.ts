import { AfterContentInit, EventEmitter } from '@angular/core';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export declare class Md2Calendar implements AfterContentInit {
    private _locale;
    private _util;
    /** A date representing the period (month or year) to start the calendar in. */
    startAt: any;
    private _startAt;
    /** Whether the calendar should be started in month or year view. */
    startView: 'month' | 'year';
    /** The currently selected date. */
    selected: any;
    private _selected;
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
    /** Date filter for the month and year views. */
    _dateFilterForViews: (date: Date) => boolean;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    _activeDate: Date;
    private _clampedActiveDate;
    /** Whether the calendar is in month view. */
    _monthView: boolean;
    /** The label for the current calendar view. */
    readonly _label: string;
    constructor(_locale: DateLocale, _util: DateUtil);
    ngAfterContentInit(): void;
    /** Handles date selection in the month view. */
    _dateSelected(date: Date): void;
    /** Handles month selection in the year view. */
    _monthSelected(month: Date): void;
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
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    private _isSameView(date1, date2);
    /** Handles keydown events on the calendar body. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Handles keydown events on the calendar body when calendar is in month view. */
    private _handleCalendarBodyKeydownInMonthView(event);
    /** Handles keydown events on the calendar body when calendar is in year view. */
    private _handleCalendarBodyKeydownInYearView(event);
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    private _prevMonthInSameCol(date);
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     */
    private _nextMonthInSameCol(date);
}
