import React from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface CustomDatePickerProps {
  initialValue: DateValueType;
  onChange: (value: DateValueType) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  initialValue,
  onChange,
}) => {
  return (
    <div className="border border-gray-400 rounded-md">
      <Datepicker
        useRange={false}
        asSingle={true}
        value={initialValue}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomDatePicker;
