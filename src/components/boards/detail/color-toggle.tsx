import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ColorToggle = ({
  handleColorChange,
  className,
}: {
  handleColorChange: (e: FormEvent<HTMLButtonElement>) => void;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "mx-8 my-8 flex items-center space-x-2 lg:my-0 lg:mt-8",
        className,
      )}
      aria-label="Color toggle switch container"
    >
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
