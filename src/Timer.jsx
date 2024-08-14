import { useEffect, useState } from 'react';

const Timer = ({ time, setTime, shortBreak, longBreak, saveTime, setTimerOn }) => {
    const [pomodoro, setPomodoro] = useState(0);
    const [isWorking, setIsWorking] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [stopTimer, setStopTimer] = useState('work');
    const [buttonText, setButtonText] = useState('Start');
    const [secondButtonText, setSecondButtonText] = useState('Stop')
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        let interval;

        if ((isWorking || isBreak) && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (isWorking && time === 0) {
            clearInterval(interval);
            setPomodoro((p) => p + 1);

            if (pomodoro === 3) {
                setTime(longBreak);
                setPomodoro(0); 
            } else {
                setTime(shortBreak);
            }

            setIsWorking(false);
            setIsBreak(true);
            setStopTimer('break');
            console.log(stopTimer)
        } else if (isBreak && time === 0) {
            clearInterval(interval);
            setIsWorking(true);
            setIsBreak(false);
            setTime(saveTime);
            setStopTimer('work');
            console.log(stopTimer)
        }

        return () => clearInterval(interval);
    }, [time, isWorking, isBreak, setTime, shortBreak, longBreak, pomodoro, saveTime, stopTimer]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const startPomodoro = () => {
        if (stopTimer === 'work') {
            setIsWorking(true);
           
        } else if (stopTimer === 'break') {
            setIsBreak(true);
        }
        setButtonText('Pause')
        setSecondButtonText('Stop')
        setButtonDisabled(false)
     
    };

    const stopPomodoro = () => {
        if (isWorking) {
            setIsWorking(false);
            setStopTimer('work');
           
        } else if (isBreak) {
            setIsBreak(false);
            setStopTimer('break');
        }
        setButtonText('Continue')
        setSecondButtonText('Done')
        setButtonDisabled(false)
       
    };

    const handleButtonClick = () => {
        if (isWorking || isBreak) {
            stopPomodoro();
           
        } else {
            startPomodoro();
        }
    };

    const resetPomodoro = () => {
        if (isWorking || isBreak) {
            stopPomodoro();
    }
    if ((!isWorking || !isBreak) && secondButtonText === 'Done') {
       if (stopTimer === 'break') {
        setIsBreak(false)
        setIsWorking(true)
        setTime(saveTime)
        setStopTimer('work')
       }
        if (stopTimer === 'work') {
            setIsBreak(true)
            setIsWorking(false)
            setStopTimer('break')
            setPomodoro((p) => p + 1);
            if (pomodoro === 3) {
                setTime(longBreak);
                setPomodoro(0); 
            } else {
                setTime(shortBreak);
            }
           }
           setButtonText('Pause')
           setSecondButtonText('Stop')
       
    }
   else if ((isWorking || isBreak) && secondButtonText === 'Stop') {
    setTime(saveTime)
    setButtonText('Start')
    setButtonDisabled(true)
    setSecondButtonText('Stop')
   }
}

    return (
        <div>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
            <button onClick={handleButtonClick}>
                {buttonText}
            </button>
            <button onClick={resetPomodoro} disabled={isButtonDisabled}>{secondButtonText}</button>
        </div>
    );
};

export default Timer;
