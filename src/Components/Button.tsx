import { useAppContext } from "./CalculatorState";

export default function Button({type, value}: {type: string; value: string}){
    const calculator = useAppContext();

    const handleClick = () => {
        switch(type){
            case "number":
                calculator.addNumber(Number(value));
                break;
            case "operator":
                calculator.addOperation(value)
                break;
            case "action":
                calculator.executeAction(value);
                break;
            default:
                break;
        }
    }

    return (
        <button className="calculatorButton" onClick={handleClick}>
            {value}
        </button>
     )
}