import { useToggle } from './useToggle';

export default function ToggleComponent() {
  const [value, toggle, setTrue, setFalse] = useToggle(false);

  return (
    <div>
      <div>{value.toString()}</div>
      <button onClick={() => toggle}>Toggle</button>
      <button onClick={() => setTrue}>Make True</button>
      <button onClick={() => setFalse}>Make False</button>
    </div>
  );
}
