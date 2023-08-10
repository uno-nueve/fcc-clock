import React, { useState, useEffect } from 'react';
import './styles.css'
import Footer from './Footer';

const initialSession = 25;
const initialBreak = 5;

const SettingsControlPanel = ({ handleTime, sessionTime, breakTime }) => {
    return (
        <div className="control-panel">
            <div className="control-wrapper">
                <label htmlFor="session-length" className="settings-label" id="session-label">Session Length</label>
                <div className="settings-controls">
                    <button id="session-increment" className='button-primary' onClick={handleTime}>+</button>
                    <span id="session-length" className='settings-info'>{sessionTime}</span>
                    <button id="session-decrement" className='button-primary' onClick={handleTime}>-</button>
                </div>
            </div>
            <div className="control-wrapper">
                <label htmlFor="break-length" className="settings-label" id="break-label">Break Length</label>
                <div className="settings-controls">
                    <button id="break-increment" className='button-primary' onClick={handleTime}>+</button>
                    <span id="break-length" className='settings-info'>{breakTime}</span>
                    <button id="break-decrement" className='button-primary' onClick={handleTime}>-</button>
                </div>
            </div>
        </div>
    )
};

const TimerDisplay = ({ timeSwitch, mins, clockMins, secs, clockSecs }) => {
    return (
        <div className="timer-display">
            <label htmlFor="time-left" className="timer-label" id="timer-label">{ timeSwitch ? 'Session' : 'Break' }</label>
            <div className="timer">
                <audio src='https://cdn.freesound.org/previews/457/457518_4256189-lq.mp3' id="beep" />
                <p id="time-left">
                    { mins.toString().length === 1 ? clockMins : mins }
                    :
                    { secs.toString().length === 1 ? clockSecs : secs }
                </p>
            </div>
        </div>
    )
};

const TimerControlPanel = ({ handleStart, handleReset, start }) => {
    return (
        <div className="timer-panel">
            <button id="start_stop" className='button-secondary' onClick={handleStart}>{ start ? 'PAUSE' : 'START' }</button>
            <button id="reset" className='button-secondary' onClick={handleReset}>RESET</button>
        </div>
    )
};

const TwentyFivePlusFive = () => {
    const [sessionTime, setSessionTime] = useState(initialSession);
    const [breakTime, setBreakTime] = useState(initialBreak);
    const [inSeconds, setInSeconds] = useState(sessionTime * 60);
    const [start, setStart] = useState(false);
    const [timeSwitch, setTimeSwitch] = useState(true);
    
    //* Countdown functionality
    useEffect(() => {
        const beep = document.getElementById('beep');
        let interval;
        if (start) {
            interval = setInterval(() => {
                setInSeconds(inSeconds => {
                    if (inSeconds <= 0) {
                        if (timeSwitch) {
                            setTimeSwitch(false)
                            beep.play()
                            return breakTime * 60
                        } else {
                            setTimeSwitch(true)
                            beep.play()
                            return sessionTime * 60
                        }
                    }
                    return inSeconds - 1
                });
            }, 1000)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [breakTime, sessionTime, start, timeSwitch]);

    //* Timer display formating
    const mins = Math.floor(inSeconds / 60);
    const secs = Math.floor(inSeconds % 60);

    let clockMins;
    let clockSecs;

    if (secs.toString().length === 1) {
        clockSecs = `0${secs}`
    }
    
    if (mins.toString().length === 1) {
        clockMins = `0${mins}`
    }

    //* Timer setup
    const handleTime = (e) =>{
        const input = e.target.id;
        if (
            (sessionTime === 1 && input === 'session-decrement') || 
            (sessionTime === 60 && input === 'session-increment') || 
            (breakTime === 1 && input === 'break-decrement') || 
            (breakTime === 60 && input === 'break-increment')
            ) {
            return;
        } else {
            switch (input) {
                case 'session-increment':
                    setSessionTime(sessionTime + 1)
                    setInSeconds((sessionTime + 1) * 60)
                    break;
                case 'session-decrement':
                    setSessionTime(sessionTime - 1)
                    setInSeconds((sessionTime - 1) * 60)
                    break;
                case 'break-increment':
                    setBreakTime(breakTime + 1)
                    setInSeconds((breakTime + 1) * 60)
                    break;
                case 'break-decrement':
                    setBreakTime(breakTime - 1)
                    setInSeconds((breakTime - 1) * 60)
                    break;
                default:
                    break;
            }
        }
    }

    //* START / PAUSE switch
    const handleStart = () => {
        setStart(start => !start)
    }

    //* RESET timer
    const handleReset = () => {
        setStart(false)
        setSessionTime(initialSession)
        setBreakTime(initialBreak)
        setInSeconds(initialSession * 60)
        setTimeSwitch(true)
        const beep = document.getElementById('beep');
        beep.pause()
        beep.currentTime = 0
    }

    return (
        <div className="timer-wrapper">
            <h1 className="title">25 + 5 CLOCK</h1>
            {/* Settings Control Panel */}
            <SettingsControlPanel handleTime={handleTime} sessionTime={sessionTime} breakTime={breakTime} />
            {/* Timer Display */}
            <TimerDisplay timeSwitch={timeSwitch} mins={mins} clockMins={clockMins} secs={secs} clockSecs={clockSecs} />
            {/* Timer Control Panel */}
            <TimerControlPanel handleStart={handleStart} handleReset={handleReset} start={start} />
            <Footer />
        </div>
    );
}

export default TwentyFivePlusFive;
