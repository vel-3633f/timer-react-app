import { useEffect, useState } from "react";
import Circle from "./Circle";

const Counter = ({ time, gauge,isDisp }) => {
  const [newTime, setNewTime] = useState({
    second: "",
    minute: "",
  });

  useEffect(() => {
    const newObj = { ...time };
    if (time.minute.toString().length === 1) {
      newObj.minute = "0" + newObj.minute;
    }
    if (time.second.toString().length === 1) {
      newObj.second = "0" + newObj.second;
    }
    setNewTime(newObj);
  }, [time]);

  return (
    <div>
      <Circle gauge={gauge} isDisp={isDisp} />
      <p className="text-white text-7xl absolute top-20 left-0 w-[300px] text-center">
        {`${newTime.minute}：${newTime.second}`}
      </p>
    </div>
  );
};

export default Counter;
