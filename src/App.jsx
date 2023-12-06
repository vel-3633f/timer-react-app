import { useEffect, useState } from "react";
import Input from "./components/Input";
// import useSound from "use-sound";
// import sfx from "../public/sound/timerSound.mp3";

const btnStyle =
  "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-blue-500 disabled:text-white";

function App() {
  const [time, setTime] = useState({
    second: 1,
    minute: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isDisp, setIsDisp] = useState(false);
  // const [play] = useSound(sfx);

  useEffect(() => {
    let timerId = null;
    if (isRunning) {
      timerId = setInterval(() => {
        setTime((obj) => {
          let sumTime = Number(obj.second) + 60 * Number(obj.minute);
          console.log(sumTime);
          if (sumTime - 1 === 0) {
            clearInterval(timerId);
          }
          sumTime--;
          let newObj = {
            second: sumTime % 60,
            minute: Math.floor(sumTime / 60),
          };
          return newObj;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const toggleStart = () => {
    setIsRunning((prev) => !prev);
    if (!isDisp) {
      setIsDisp((prev) => !prev);
    }
  };

  const toggleCancel = () => {
    setIsRunning(false);
    setIsDisp((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {isDisp && (
        <div>
          <p>{`${time.minute}：${time.second}`}</p>
          <span>秒経過</span>
        </div>
      )}
      {!isDisp && <Input time={time} setTime={setTime} />}
      <div>
        <button onClick={toggleCancel} className={btnStyle} disabled={!isDisp}>
          キャンセル
        </button>
        <button onClick={toggleStart} className={btnStyle}>
          {isRunning ? "一時停止" : "開始"}
        </button>
      </div>
    </div>
  );
}

export default App;
