import './styles/App.css';
import Sidebar from './Sidebar.jsx'
import Timer from './Timer.jsx'
import ModalWindow from './ModalSettings.jsx'
import NotificationsModal from './NotificationsModal.jsx'
import { useState } from 'react';

function App() {
  const [pomodoroTime, setPomodoroTime] = useState(1500);
  const [saveTime, setSavedTime] = useState(1500)
  const [shortBreakTime, setShortBreak] = useState(300)
  const [longBreakTime, setLongBreak] = useState(900)
  const [timerIsOn, setTimerIsOn] = useState(false)
  return (
    <>
      <header className="header">
        POMODORO
      </header>
      <main className="main">
        <Sidebar button1={
          <ModalWindow time={pomodoroTime} setTime={setPomodoroTime} saveTime={saveTime}
            setSavedTime={setSavedTime} shortBreak={shortBreakTime}
            setShortBreakTime={setShortBreak}
            setLongBreakTime={setLongBreak}
            longBreak={longBreakTime} 
          >
          </ModalWindow>
        }
          button2={<NotificationsModal time={pomodoroTime} timerIsOn={timerIsOn}/>}
        />
        <div className="main__container">
          <div className="main__container-clock">
            <Timer time={pomodoroTime} setTime={setPomodoroTime}
              shortBreak={shortBreakTime} setShortBreak={setShortBreak}
              longBreak={longBreakTime} setLongBreak={setLongBreak} saveTime={saveTime} setTimerOn = {setTimerIsOn}/>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
