import { useState } from "react";

const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace === true) {
      setMode(mode);
    }
    if (!replace) {
      setMode(mode);
      setHistory((prev)=>[...prev, mode]);
    }
  };
  
  const back = () => {
    const history_copy = [...history];
    if (history_copy.length < 2) {
      setMode(history_copy[0]);
    }
    else {
      history_copy.pop()
      setHistory(history_copy);
      setMode(history_copy[history_copy.length - 1]);
    }
  };
  return { mode, transition, back };
}

export default useVisualMode;
