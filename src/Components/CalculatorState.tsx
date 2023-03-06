import { createContext, useState, useContext } from "react";

const AppContext = createContext({
  /* state */
  memory: null,
  operation: null,
  currentValue: 0,
  /* methods */
  addNumber: (value: number) => {},
  addOperation: (operation: string) => {},
  getResult: () => {},
  executeAction: (action: string) => {},
});

export default function CalculatorState({ children }: any) {
  const [memory, setMemory] = useState<any>(null);
  const [operation, setOperation] = useState<any>(null);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isReset, setIsReset] = useState<boolean>(true);

  const handleAddNumber = (value: number) => {
    if (isReset) {
      setCurrentValue(value);
      setIsReset(false);
    } else {
      const newValue: string = currentValue.toString() + value;
      setCurrentValue(Number(newValue));
    }
  };

  const handleAddOperation = (op: string) => {
    if(currentValue){
        if(operation){
            //TODO: Resolver
          handleGetResult()
        }else{
            setOperation(op);
            setMemory(currentValue);
            setCurrentValue(0);
            setIsReset(true);
        }
    }
  };

  const handleGetResult = () => {
    let result = 0;
    if(currentValue && operation && memory){
        switch (operation) {
            case "+" :
                result = currentValue + parseFloat(memory);
                break;
            
            default:
        }

        setCurrentValue(result);
        setOperation(null);
        setMemory(result);
        setIsReset(true);
    }
  };
  const handleExecuteAction = (action: string) => {
    switch(action) {
        case "=" :
            handleGetResult();
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
