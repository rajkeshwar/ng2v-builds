import { EventEmitter, AfterContentInit } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
export declare class Md2CalendarCell {
    value: number;
    displayValue: string;
    enabled: boolean;
    constructor(value: number, displayValue: string, enabled: boolean);
}
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
export declare class Md2MonthView implements AfterContentInit {
    private _locale;
    private _util;
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
    activeDate: Date;
    private _activeDate;
    /** The currently selected date. */
    selected: Date;
    private _selected;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: Date) => boolean;
    /** Emits when a new date is selected. */
    selectedChange: EventEmitter<Date>;
    /** Handles when a new date is selected. */
    _cellClicked(cell: Md2CalendarCell): void;
    /** The number of blank cells to put at the beginning for the first row. */
    readonly _firstRowOffset: number;
    _isActiveCell(rowIndex: number, colIndex: number): boolean;
    /** Grid of calendar cells representing the dates of the month. */
    _weeks: Md2CalendarCell[][];
    /** The number of blank cells in the first row before the 1st of the month. */
    _firstWeekOffset: number;
    /** The names of the weekdays. */
    _weekdays: string[];
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     */
    _selectedDate: number;
    /** The date of the month that today falls on. Null if today is in another month. */
    _todayDate: number;
    constructor(_locale: DateLocale, _util: DateUtil);
    ngAfterContentInit(): void;
    /** Initializes this month view. */
    private _init();
    /** Creates Md2CalendarCells for the dates in this month. */
    private _createWeekCells();
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    private _getDateInCurrentMonth(date);
}
