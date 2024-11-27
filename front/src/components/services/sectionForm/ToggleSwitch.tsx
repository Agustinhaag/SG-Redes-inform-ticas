import React, { useState } from "react";

const ToggleSwitch: React.FC<{ onChange: (state: boolean) => void }> = ({
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState); 
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
