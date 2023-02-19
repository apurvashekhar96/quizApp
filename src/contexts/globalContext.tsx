import React, { createContext, useState } from "react";
type markedAnswer = {
  questionNo: number;
  answer: string[];
};

export interface contextType {
  started: boolean;
  ended: boolean;
  markedAnswers: markedAnswer[];
  handleSetMArkedAnswers: (data: markedAnswer[]) => void;
  handleSetStarted: () => void;
  handleSetEnded: () => void;
}

const defaultContext = {
  started: false,
  ended: false,
  markedAnswers: [{ questionNo: 0, answer: [""] }],
  handleSetMArkedAnswers: () => {},
  handleSetStarted: () => {},
  handleSetEnded: () => {},
};

interface props {
  children: any;
}

export const GlobalContext = createContext<contextType>(defaultContext);

const GlobalContextProvider = ({ children }: props): any => {
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [markedAnswers, setMarkedAnswers] = useState<markedAnswer[]>([
    { questionNo: 1, answer: [""] },
  ]);

  const handleSetStarted = () => {
    setStarted(!started);
  };
  const handleSetEnded = () => {
    setEnded(!ended);
  };
  const handleSetMArkedAnswers = (data: markedAnswer[]) => {
    setMarkedAnswers([...data]);
  };

  return (
    <GlobalContext.Provider
      value={{
        ended,
        started,
        markedAnswers,
        handleSetEnded,
        handleSetStarted,
        handleSetMArkedAnswers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
