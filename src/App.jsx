import { useEffect, useState } from "react";
import Input from "./components/Input";
import Circle from "./components/Circle";
import useSound from "use-sound";
import sfx from "../public/sound/timerSound.mp3";

const btnCancelStyle =
  "w-24 h-24 bg-gray-800 hover:bg-gray-700 text-white font-semibold hover:text-white hover:border-gray-700 py-2 border border-white rounded-full disabled:bg-gray-900 disabled:text-gray-700 disabled:border-gray-700";
const btnStartStyle =
  "w-24 h-24  font-semibold hover:text-white  py-2 border rounded-full ";
const greenStyle =
  "bg-green-900 text-green-200 border-green-600 hover:text-green-200 hover:border-green-300";
const yellowStyle =
  "bg-yellow-900 text-yellow-400 border-yellow-600 hover:text-yellow-200 hover:border-yellow-300";

function App() {
  const [time, setTime] = useState({
    second: 0,
    minute: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isDisp, setIsDisp] = useState(false);
  const [initialVal, setInitialVal] = useState(0);
  const [gauge, setGauge] = useState(100);
  const [errorMsg, setErrorMsg] = useState("");
  const [play] = useSound(sfx, { volume: 0.3 });

  useEffect(() => {
    let timerId = null;
    if (isRunning) {
      timerId = setInterval(() => {
        setTime((obj) => {
          let sumTime = Number(obj.second) + 60 * Number(obj.minute);

          if (sumTime - 1 === 0) {
            play();
            setIsRunning(false);
            setIsDisp(false);
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

  useEffect(() => {
    let sumTime = Number(time.second) + 60 * Number(time.minute);
    const timePercent = (sumTime / initialVal) * 100;
    setGauge(timePercent.toFixed(5));
  }, [time]);

  const toggleStart = () => {
    try {
      const sumTime = Number(time.second) + 60 * Number(time.minute);
      if (sumTime === 0 || isNaN(sumTime)) {
        throw Error;
      }
      if (time.minute === "") {
        setTime({ ...time, minute: 0 });
      }
      setIsRunning((prev) => !prev);
      if (!isDisp) {
        setInitialVal(sumTime);

        setIsDisp((prev) => !prev);
      }
      setErrorMsg("");
    } catch {
      setErrorMsg("有効な値を入れてください");
    }
  };

  const toggleCancel = () => {
    setTime({
      second: 0,
      minute: 0,
    });
    setGauge(100);
    setIsRunning(false);
    setIsDisp((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black flex-col">
      <div className="h-[250px] flex items-center justify-center relative">
        {isDisp ? (
          <div>
            <Circle
              time={time}
              initialVal={initialVal}
              gauge={gauge}
              setGauge={setGauge}
            />
            <p className="text-white text-7xl absolute top-20 left-0 w-[300px] text-center">
              {`${time.minute}：${time.second}`}
            </p>
          </div>
        ) : (
          <Input time={time} setTime={setTime} />
        )}
      </div>
      <div className="h-10">
        {!isDisp && <p className="text-red-200">{errorMsg}</p>}
      </div>
      <div className="flex justify-between w-[250px] sm:w-[350px] ">
        <button
          onClick={toggleCancel}
          className={btnCancelStyle}
          disabled={!isDisp}
        >
          キャンセル
        </button>
        <button
          onClick={toggleStart}
          className={
            isRunning
              ? `${btnStartStyle} ${yellowStyle}`
              : `${btnStartStyle} ${greenStyle}`
          }
        >
          {isRunning ? "一時停止" : "開始"}
        </button>
      </div>
    </div>
  );
}

export default App;
