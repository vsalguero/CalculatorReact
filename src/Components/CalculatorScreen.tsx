import { useAppContext } from "./CalculatorState"

export default function CalculatorScreen(){
    const calculator = useAppContext();
    return <div className="calculatorScreen">
        <div>Memory: {calculator.memory}
            Operation: {calculator.operation}
        </div>
        <div className="calculatorCurrentValue">{calculator.currentValue}{calculator.isDecimal && "."}</div>

    </div>
}
