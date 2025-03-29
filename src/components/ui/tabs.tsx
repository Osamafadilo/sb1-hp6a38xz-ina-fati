import * as React from "react";
import { clsx } from "clsx";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: "",
  setValue: () => {},
});

export const Tabs = ({ defaultValue, children }: TabsProps) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className, children }: TabsListProps) => {
  return (
    <div
      className={clsx(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const { value: selectedValue, setValue } = React.useContext(TabsContext);

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        selectedValue === value
          ? "bg-background text-foreground shadow-sm"
          : "hover:bg-background/50 hover:text-foreground"
      )}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className }: TabsContentProps) => {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (selectedValue !== value) return null;

  return <div className={className}>{children}</div>;
};