import { useAppContext } from "./CalculatorState";

export default function CalculatorScreen() {
  const calculator = useAppContext();
  return (
    <div className="calculatorScreen">
      <div className="calculatorCurrentValue">
        {calculator.currentValue}
        {calculator.isDecimal && "."}
      </div>
    </div>
  );
}
