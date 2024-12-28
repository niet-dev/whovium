import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const ColorToggle = ({
  handleColorChange,
}: {
  handleColorChange: (e: FormEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
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
