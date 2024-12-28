import { cn } from "@/lib/utils";

import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const ColorToggle = ({
  handleColorChange,
  className,
}: {
  handleColorChange: (e: FormEvent<HTMLButtonElement>) => void;
  className: string;
}) => {
  return (
    <div className={cn("mx-8 my-4 flex items-center space-x-2", className)}>
      <Switch
        onClick={handleColorChange}
        id="color-toggle"
        className={`data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-red-500`}
      />
      <Label htmlFor="color-toggle">Card Color</Label>
    </div>
  );
};

export default ColorToggle;
