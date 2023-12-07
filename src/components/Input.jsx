const Input = ({ time, setTime}) => {
  return (
    <div>
      <input
        type="number"
        placeholder="分"
        className="text-2xl bg-black border border-gray-300 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-20 h-20 pl-5 mr-5"
        onChange={(e) => {
          setTime({ ...time, minute: e.target.value });
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
          setTime({ ...time, second: e.target.value });
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
