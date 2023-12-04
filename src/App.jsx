import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId = null;
    if (!isRunning) {
      timerId = setInterval(() => {
        setTime((val) => val + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const toggle = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <h3>
        <time>{time}</time>
        <span>秒経過</span>
      </h3>
      <button onClick={toggle}>{isRunning ? "スタート" : "ストップ"}</button>
    </div>
  );
}

export default App;
