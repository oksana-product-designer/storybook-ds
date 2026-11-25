import { DayPicker, type Matcher } from 'react-day-picker';
import { Icon } from '../../icons/Icon';
import './Calendar.css';

export type CalendarProps = {
  /** The selected day. */
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  /** First month shown when the calendar is not controlled with `month`. */
  defaultMonth?: Date;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  /** Days that cannot be selected (Figma state "Disabled"). Example: `{ before: new Date() }`. */
  disabled?: Matcher | Matcher[];
  /** Overrides the current date, which is marked with the "Today" state. */
  today?: Date;
  className?: string;
};

/**
 * Figma components "Calendar" and "Calendar day". The week starts on Monday and the labels are
 * English, as in Figma. The day states (Default, Hover, Today, Selected, Disabled, Outside) are
 * drawn by the calendar itself, there is no separate day component.
 */
export function Calendar({
  selected,
  onSelect,
  defaultMonth,
  month,
  onMonthChange,
  disabled,
  today,
  className,
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      weekStartsOn={1}
      showOutsideDays
      fixedWeeks
      selected={selected}
      onSelect={onSelect}
      defaultMonth={defaultMonth ?? selected}
      month={month}
      onMonthChange={onMonthChange}
      disabled={disabled}
      today={today}
      className={className}
      classNames={{
        root: 'ds-calendar',
        months: 'ds-calendar__months',
        month: 'ds-calendar__month',
        month_caption: 'ds-calendar__caption',
        caption_label: 'ds-calendar__label',
        nav: 'ds-calendar__nav',
        button_previous: 'ds-calendar__nav-button',
        button_next: 'ds-calendar__nav-button',
        month_grid: 'ds-calendar__grid',
        weekdays: 'ds-calendar__weekdays',
        weekday: 'ds-calendar__weekday',
        weeks: 'ds-calendar__weeks',
        week: 'ds-calendar__week',
        day: 'ds-calendar__day',
        day_button: 'ds-calendar__day-button',
        today: 'ds-calendar__day--today',
        selected: 'ds-calendar__day--selected',
        outside: 'ds-calendar__day--outside',
        disabled: 'ds-calendar__day--disabled',
        hidden: 'ds-calendar__day--hidden',
      }}
      components={{
        Chevron: ({ orientation }) => (
          <Icon name={orientation === 'left' ? 'arrow-left' : 'arrow-right'} />
        ),
      }}
    />
  );
}
