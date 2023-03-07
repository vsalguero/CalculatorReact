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
        const dot = isDecimal ? "." : "";
        const old: string = currentValue.toString() + dot + value.toString();
        setCurrentValue(parseFloat(old));
        setIsReset(false);
        setIsDecimal(false);
      }
    } else {
      if (value.toString() === ".") {
        setIsDecimal(true);
      } else {
        const dot = isDecimal ? "." : "";
        const old: string = currentValue.toString() + dot + value.toString();
        setIsDecimal(false);
        setCurrentValue(parseFloat(old));
      }
    }
  };

  const handleAddOperation = (op: string) => {
    if (currentValue) {
      if (operation) {
        handleGetResult();
        setOperation(op);
        setIsReset(true);
        setIsDecimal(false);
      } else {
        setOperation(op);
        setMemory(currentValue);
        setCurrentValue(0);
        setIsReset(true);
        setIsDecimal(false);
      }
    }
  };

  const handleGetResult = () => {
    let result = 0;
    if (currentValue && operation && memory) {
      switch (operation) {
        case "+":
          result = parseFloat(currentValue.toString()) + parseFloat(memory);
          break;
        case "-":
          result = parseFloat(memory) - parseFloat(currentValue.toString());
          break;
        case "*":
          result = parseFloat(memory) * parseFloat(currentValue.toString());
          break;
        case "/":
          result = parseFloat(memory) / parseFloat(currentValue.toString());
          break;
        case "%":
          result =
            (parseFloat(memory) / 100) * parseFloat(currentValue.toString());
          break;

        default:
      }

      setCurrentValue(result);
      setOperation(null);
      setMemory(result);
      setIsReset(true);
      setIsDecimal(false);
    }
  };

  const clean = () => {
    setCurrentValue(0);
    setOperation(null);
    setIsReset(true);
    setIsDecimal(false);
  };

  const deleteNumber = () => {
    const index = currentValue.toString().indexOf(".");
    if (index > 0) {
      const numberOfDecimals = currentValue.toString().slice(index + 1).length;
      if (numberOfDecimals == 1) {
        const min = Math.floor(currentValue);
        setCurrentValue(min);
      } else {
        const newNumber = currentValue.toFixed(numberOfDecimals - 1).toString();
        setCurrentValue(parseFloat(newNumber));
      }
    } else {
      setCurrentValue(Math.floor(currentValue / 10));
    }
  };

  const addDecimal = () => {
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
      case "←":
        deleteNumber();
        break;
      case "+/-":
        setCurrentValue(currentValue * -1);
        break;
      case ".":
        addDecimal();
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
