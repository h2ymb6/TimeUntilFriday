import { useEffect, useState } from "react";

export default function Timer({ selectedTime }) {
  const [timerText, setTimerText] = useState("시간 선택해");
  const [percent, setPercent] = useState(0);

  const getTargetTime = (hour, minute) => {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);
    target.setDate(target.getDate() + ((5 - target.getDay() + 7) % 7));
    if (now.getDay() === 5) {
      const todayTarget = new Date();
      todayTarget.setHours(hour, minute, 0, 0);
      if (now > todayTarget) target.setDate(target.getDate() + 7);
    }
    return target;
  };

  const getSundayReset = () => {
    const now = new Date();
    const sunday = new Date(now);
    sunday.setDate(now.getDate() + ((0 - now.getDay() + 7) % 7));
    sunday.setHours(18, 0, 0, 0);
    return sunday;
  };

  const getWeekStart = () => {
    const now = new Date();
    const monday = new Date(now);
    const day = now.getDay();
    const diffToMon = (day + 6) % 7;
    monday.setDate(now.getDate() - diffToMon);
    monday.setHours(0, 0, 0, 0);
    if (day === 0 && now.getHours() >= 18) monday.setDate(monday.getDate() + 7);
    return monday;
  };

  useEffect(() => {
    const updateTimer = () => {
      if (!selectedTime) {
        // selectedTime이 없을 땐 interval 안에서 처리
        setTimerText("시간 선택해");
        setPercent(0);
        return;
      }

      const [hour, minute] = selectedTime === "cb_2030" ? [20, 30] : [14, 20];

      const target = getTargetTime(hour, minute);
      const now = new Date();

      const todayFridayTarget = new Date();
      todayFridayTarget.setHours(hour, minute, 0, 0);
      todayFridayTarget.setDate(
        todayFridayTarget.getDate() + ((5 - todayFridayTarget.getDay() + 7) % 7)
      );

      const sundayReset = getSundayReset();
      const afterTargetOnFriday = now > todayFridayTarget;
      const inWeekendRange =
        now.getTime() > todayFridayTarget.getTime() &&
        now.getTime() < sundayReset.getTime();

      if (afterTargetOnFriday || inWeekendRange) {
        setTimerText("집 갈 시간!");
        setPercent(100);
        return;
      }

      const diff = target - now;
      const totalSeconds = Math.floor(diff / 1000);
      const hoursLeft = Math.floor(totalSeconds / 3600);
      const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimerText(`${hoursLeft}시간 ${minutesLeft}분 ${seconds}초 남음`);

      const start = getWeekStart();
      const total = target - start;
      const passed = now - start;
      let p = (passed / total) * 100;
      if (p < 0) p = 0;
      if (p > 100) p = 100;
      setPercent(p);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // 처음 한 번 실행
    return () => clearInterval(interval);
  }, [selectedTime]);

  return (
    <>
      <div className="progress-container" style={{marginTop:"-40px"}}>
        <div className="progress-bar" style={{ width: percent + "%" }}></div>
      </div>

      <div className="percent">{Math.floor(percent)}%</div>
      <div id="timer" style={{fontSize:"30px"}}>{timerText}</div>
    </>
  );
}
