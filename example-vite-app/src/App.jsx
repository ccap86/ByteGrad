import { useState } from "react";
import Button from "./Button";
import Count from "./Count";

const info = {
  currentCount: 4,
  limit: 10,
};

const newInfo = {
  ...info,
  limit: 20,
  newCount: true,
};
function App() {
  const [number, setNumber] = useState(0);

  console.log(info);

  console.log(newInfo);

  return (
    <div className="app">
      <Count number={number} />
      <Button setNumber={setNumber} />
    </div>
  );
}
export default App;
