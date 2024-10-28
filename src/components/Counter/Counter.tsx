import {
  useCounterStore,
  CounterStore,
} from '../../stores/counter/counterStore';

const Counter = () => {
  const { count, increase, decrease, clear }: CounterStore = useCounterStore();

  return (
    <div className="flex gap-3">
      <button className="btn" onClick={() => increase(1)}>
        +
      </button>
      <div>{count}</div>
      <button className="btn" onClick={() => decrease(1)}>
        -
      </button>
      <button className="btn" onClick={() => clear()}>
        Reset
      </button>
    </div>
  );
};

export default Counter;
