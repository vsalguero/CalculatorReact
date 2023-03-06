import { createContext, useState, useContext } from "react";

const AppContext = createContext({
  /* state */
  memory: null,
  operation: null,
  currentValue: 0,
  isDecimal: false,
  /* methods */
  addNumber: (value: number | string) => {},
  addOperation: (operation: string) => {},
  getResult: () => {},
  executeAction: (action: string) => {},
});

export default function CalculatorState({ children }: any) {
  const [memory, setMemory] = useState<any>(null);
  const [operation, setOperation] = useState<any>(null);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isReset, setIsReset] = useState<boolean>(true);
  const [isDecimal, setIsDecimal] = useState<boolean>(false);

  const handleAddNumber = (value: number | string) => {
    if (isReset) {
      if (value.toString() === ".") {
        setIsDecimal(true);
      } else {
        const point = isDecimal ? "." : "";
        const newValue = currentValue.toString() + point + value.toString();
        
        setCurrentValue(Number(newValue));
        setIsReset(false);
        setIsDecimal(false);
      }
      setCurrentValue(Number(value));
      setIsReset(false);
    } else {
        if (value.toString() === ".") {
            setIsDecimal(true);
          } else {
            const point = isDecimal ? "." : "";
            const newValue = currentValue.toString() + point + value.toString();
            setCurrentValue(Number(newValue));
            setIsReset(false);
            setIsDecimal(false);
          } 
      const newValue: string = currentValue.toString() + value;
      setCurrentValue(parseFloat(newValue));
    }
  };

  const handleAddOperation = (op: string) => {
    if (currentValue) {
      if (operation) {
        handleGetResult();
        setOperation(op);
      } else {
        setOperation(op);
        setMemory(currentValue);
        setCurrentValue(0);
        setIsReset(true);
      }
    }
  };

  const handleGetResult = () => {
    let result = 0;
    if (currentValue && operation && memory) {
      switch (operation) {
        case "+":
          result = currentValue + parseFloat(memory);
          break;
        case "-":
          result = parseFloat(memory) - currentValue;
          break;
        case "*":
          result = parseFloat(memory) * currentValue;
          break;
        case "/":
          result = parseFloat(memory) / currentValue;
          break;
        case "%":
          result = (parseFloat(memory) / 100) * currentValue;
          break;

        default:
      }

      setCurrentValue(result);
      setOperation(null);
      setMemory(result);
      setIsReset(true);
    }
  };

  const clean = () => {
    setCurrentValue(0);
    setOperation(null);
    setIsReset(true);
  };

  const deleteNumber = () => {
    setCurrentValue(Math.floor(currentValue / 10));
    setOperation(null);
    setIsReset(true);
  };

  const convertToFloat = () => {
    if (currentValue.toString().indexOf(".") > 0) {
    } else {
      handleAddNumber(".");
    }
  };

  const handleExecuteAction = (action: string) => {
    switch (action) {
      case "=":
        handleGetResult();
        break;
      case "AC":
        clean();
        break;
      case "<==":
        deleteNumber();
        break;
      case "+/-":
        setCurrentValue(currentValue * -1);
        break;
      case ".":
        convertToFloat();
        break;
      default:
    }
  };
  return (
    <AppContext.Provider
      value={{
        memory,
        operation,
        currentValue,
        isDecimal,
        addNumber: handleAddNumber,
        addOperation: handleAddOperation,
        getResult: handleGetResult,
        executeAction: handleExecuteAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
