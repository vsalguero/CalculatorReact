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
  executeAction: () => {}
});

export default function CalculatorState({children}: any) {
  const [memory, setMemory] = useState<any>(null);
  const [operation, setOperation] = useState<any>(null);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isReset, setIsReset] = useState<boolean>(true);

  function handleAddNumber (value: number) {};

  function handleAddOperation (operation: string) {};

  function handleGetResult() {};
  function handleExecuteAction() {};
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
