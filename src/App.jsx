import { useEffect, useState } from "react";
import Input from "./components/Input";
import Circle from "./components/Circle";
// import useSound from "use-sound";
// import sfx from "../public/sound/timerSound.mp3";

const btnCancelStyle =
  "w-24 h-24 bg-gray-800 hover:bg-gray-700 text-white font-semibold hover:text-white hover:border-gray-700 py-2 border border-white rounded-full disabled:bg-gray-900 disabled:text-gray-700 disabled:border-gray-700";
const btnStartStyle =
  "w-24 h-24  font-semibold hover:text-white  py-2 border rounded-full ";
const greenStyle = "bg-green-900 text-green-100 border-green-400" 
const yellowStyle = "bg-yellow-600"

function App() {
  const [time, setTime] = useState({
    second: 60,
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
    <div className="flex items-center justify-center h-screen w-screen bg-black flex-col">
      {isDisp ? (
        <div>
          <Circle time={time} />
          <p>{`${time.minute}：${time.second}`}</p>
        </div>
      ) : (
        <Input time={time} setTime={setTime} />
      )}
      <div className="flex ">
        <button
          onClick={toggleCancel}
          className={btnCancelStyle}
          disabled={!isDisp}
        >
          キャンセル
        </button>
        <button
          onClick={toggleStart}
          className={isRunning ? `${btnStartStyle} ${yellowStyle}` : `${btnStartStyle} ${greenStyle}`}
        >
          {isRunning ? "一時停止" : "開始"}
        </button>
      </div>
    </div>
  );
}

export default App;
