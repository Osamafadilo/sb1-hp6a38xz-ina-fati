import * as React from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          {...props}
        />
        <div
          className={clsx(
            "h-4 w-4 rounded border border-primary cursor-pointer",
            checked && "bg-primary",
            className
          )}
          onClick={() => setChecked(!checked)}
        >
          {checked && (
            <Check className="h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";