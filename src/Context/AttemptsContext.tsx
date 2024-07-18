import {
  createContext,
  useState,
  ReactNode,
  useContext,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

type AttemptsType = 0 | 1 | 2 | 3;

type AttemptsContextType = {
  attempts: AttemptsType;
  setAttempts: Dispatch<SetStateAction<AttemptsType>>;
  incrementAttempts: () => void;
  resetAttempts: () => void;
  isGameOver: boolean;
};

const AttemptsContext = createContext<AttemptsContextType>({
  attempts: 0,
  setAttempts: () => {},
  incrementAttempts: () => {},
  resetAttempts: () => {},
  isGameOver: false,
});

export const AttemptsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [attempts, setAttempts] = useState<AttemptsType>(0);
  const isGameOver = attempts === 3;

  const incrementAttempts = () => {
    setAttempts((prevAttempts) =>
      prevAttempts < 3 ? ((prevAttempts + 1) as AttemptsType) : prevAttempts,
    );
  };

  const resetAttempts = () => {
    setAttempts(0);
  };

  return (
    <AttemptsContext.Provider
      value={{
        attempts,
        setAttempts,
        incrementAttempts,
        resetAttempts,
        isGameOver,
      }}
    >
      {children}
    </AttemptsContext.Provider>
  );
};

export const useAttemptsContext = () => useContext(AttemptsContext);
