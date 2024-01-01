import { Dispatch, SetStateAction } from 'react';


interface NumberInputProps {
    max: number,
    min: number,
    step: number,
    value: number,
    setValue: (value: number) => void
}


const NumberInput = ({max, min, step, value, setValue}: NumberInputProps) => {

  const increaseValue = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const decreaseValue = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="px-2 py-1 bg-blue-500 text-white font-bold rounded-l"
        onClick={decreaseValue}
      >
        -
      </button>
      <input
        type="number"
        className="w-12 px-2 py-1 border text-center appearance-none"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <button
        className="px-2 py-1 bg-blue-500 text-white font-bold rounded-r"
        onClick={increaseValue}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
