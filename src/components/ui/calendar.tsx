import * as React from "react";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  mode?: "single" | "range";
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[]) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}

export const Calendar = ({
  mode = "single",
  selected,
  onSelect,
  disabled,
  className,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(
    Array.isArray(selected) ? selected : selected ? [selected] : []
  );

  const handleDateSelect = (date: Date) => {
    if (disabled?.(date)) return;

    let newSelectedDates: Date[];
    if (mode === "single") {
      newSelectedDates = [date];
    } else {
      if (selectedDates.length === 0 || selectedDates.length === 2) {
        newSelectedDates = [date];
      } else {
        const start = selectedDates[0];
        newSelectedDates =
          date < start ? [date, start] : [start, date];
      }
    }

    setSelectedDates(newSelectedDates);
    onSelect?.(mode === "single" ? newSelectedDates[0] : newSelectedDates);
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];
  let week = Array(7).fill(null);

  days.forEach((day, index) => {
    const dayIndex = (firstDayOfMonth + index) % 7;
    week[dayIndex] = day;

    if (dayIndex === 6 || index === days.length - 1) {
      weeks.push([...week]);
      week = Array(7).fill(null);
    }
  });

  return (
    <div className={clsx("p-3", className)}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="font-semibold">
          {currentMonth.toLocaleDateString("ar-SA", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {["أحد", "اثن", "ثلا", "أرب", "خمي", "جمع", "سبت"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            if (day === null) return <div key={`empty-${weekIndex}-${dayIndex}`} />;

            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );

            const isSelected = selectedDates.some(
              (selectedDate) =>
                selectedDate?.toDateString() === date.toDateString()
            );

            const isDisabled = disabled?.(date);

            return (
              <button
                key={`day-${weekIndex}-${dayIndex}`}
                onClick={() => handleDateSelect(date)}
                disabled={isDisabled}
                className={clsx(
                  "h-8 w-8 rounded-full text-sm",
                  isSelected && "bg-primary text-white",
                  !isSelected && "hover:bg-gray-100",
                  isDisabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {day}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};