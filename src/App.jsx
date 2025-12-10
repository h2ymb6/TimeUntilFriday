import "./App.css";
import bg from "./assets/고양이.jpg";
import { useState } from "react";
import RadioGroup from "./components/RadioGroup";
import Timer from "./components/timer";
import ProgressBar from "./components/RrogressBar";

function App() {
  const [selectedTime, setSelectedTime] = useState("");

  const options = [
    { id: "cb_2030", label: " 금요일 오후 8:30" },
    { id: "cb_1430", label: " 금요일 오후 2:20" },
  ];

  return (
    <div>
      <img className="backGround" src={bg} alt="배경" />
      <div className="center">
        <h2>집 가쟈~~</h2>
        <RadioGroup
          options={options}
          selected={selectedTime}
          onChange={setSelectedTime}
        />
        <ProgressBar />
        <Timer selectedTime={selectedTime} />
      </div>
    </div>
  );
}

export default App;
