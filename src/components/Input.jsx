const Input = ({ time, setTime }) => {
  return (
    <div>
      <input
        type="number"
        placeholder="秒"
        onChange={(e) => {
          setTime({ ...time, second: e.target.value });
        }}
        value={time.second}
      />
      <input
        type="number"
        placeholder="分"
        onChange={(e) => {
          setTime({ ...time, minute: e.target.value });
        }}
        value={time.minute}
      />
    </div>
  );
};

export default Input;
