import { useEffect, useState } from "react";
// import useSound from "use-sound";
// import sfx from "../public/sound/timerSound.mp3";

function App() {
  const [time, setTime] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  // const [play] = useSound(sfx);

  useEffect(() => {
    let timerId = null;
    if (!isRunning) {
      timerId = setInterval(() => {
        setTime((val) => {
          console.log(val - 1);
          if (val - 1 === 0) {
            clearInterval(timerId);
          }
          return val - 1;
        });
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
      <button onClick={toggle} className="">
        {isRunning ? "開始" : "一時停止"}
      </button>
    </div>
  );
}

export default App;
