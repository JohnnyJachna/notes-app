import Sketch from "@uiw/react-color-sketch";

const ColorPicker = ({ value, onChange }) => {
  return <Sketch color={value} onChange={(c) => onChange(c.hex)} />;
};

export default ColorPicker;
