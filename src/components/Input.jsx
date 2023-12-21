const Input = ({ time, setTime }) => {
  const changeInput = (e) => {
    let val = e.target.value;
    if (e.target.value >= 60) {
      val = 60;
    } else if (e.target.value <= 0) {
      val = 0;
    }
    return Math.ceil(val);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="分"
        className="text-2xl bg-black border border-gray-300 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-20 h-20 pl-5 mr-5"
        onChange={(e) => {
          setTime({ ...time, minute: changeInput(e) });
        }}
        value={time.minute}
        min={0}
        max={60}
      />
      <span className="text-white text-2xl mr-5">分</span>
      <input
        type="number"
        placeholder="秒"
        className="text-2xl bg-black border border-gray-300 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-20 h-20 pl-5 mr-5"
        onChange={(e) => {
          setTime({ ...time, second: changeInput(e) });
        }}
        value={time.second}
        min={0}
        max={60}
      />
      <span className="text-white text-2xl">秒</span>
    </div>
  );
};

export default Input;
