import * as React from "react";
import { clsx } from "clsx";

interface SliderProps {
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  onValueChange?: (value: number[]) => void;
  className?: string;
}

export const Slider = ({
  defaultValue = [0, 100],
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  className,
}: SliderProps) => {
  const [localValue, setLocalValue] = React.useState(value || defaultValue);
  const rangeRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (index: number) => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      const percent = Math.min(
        Math.max((event.clientX - rect.left) / rect.width, 0),
        1
      );
      const rawValue = min + (max - min) * percent;
      const steppedValue = Math.round(rawValue / step) * step;

      const newValue = [...localValue];
      newValue[index] = steppedValue;
      newValue.sort((a, b) => a - b);

      setLocalValue(newValue);
      onValueChange?.(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  React.useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  const getPercent = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div
      ref={rangeRef}
      className={clsx(
        "relative h-2 w-full rounded-full bg-gray-200",
        className
      )}
    >
      <div
        className="absolute h-full rounded-full bg-primary"
        style={{
          left: `${getPercent(localValue[0])}%`,
          right: `${100 - getPercent(localValue[1])}%`,
        }}
      />
      {localValue.map((value, index) => (
        <div
          key={index}
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white border-2 border-primary"
          style={{ left: `${getPercent(value)}%` }}
          onMouseDown={() => handleMouseDown(index)}
        />
      ))}
    </div>
  );
};