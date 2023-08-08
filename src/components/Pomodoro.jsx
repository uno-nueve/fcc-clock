import React, { useEffect, useState } from 'react';

//TODO: implement functionality to display the time setted by the SetupControls component
//? Previous TODO is partially implemented. Need state to track countdown to switch session/break
//TODO: implement countdown functionality
const Timer = ({ sessionLength, breakLength, seconds }) => {
    return (
        <div className='timer-container'>
            <h4 id='timer-label'>Session</h4>
            <div id='time-left'>
                <div className='timer'>
                    <p id='minutes'>{sessionLength}</p>
                    <p>:</p>
                    <p id='seconds'>{seconds}</p>
                </div>
            </div>
        </div>
    )
}

//TODO: implement functionality in both buttons
//? handleReset is defined but the countdown needs to be implemented
const TimerControls = ({ handleStart, handleReset }) => {
    return (
        <>
            <button id="start_stop" onClick={ handleStart }>START/STOP</button>
            <button id="reset" onClick={ handleReset } >RESET</button>
        </>
    )
}

//* Functionality fully implemented
//* current session is passed in Timer state
//TODO: implement current break in Timer state
const SetupControls = ({ handleSessionLength, handleBreakLength, sessionLength, breakLength }) => {
    return (
        <>
            <div id='break-controls' className='controls'>
                <p id="break-label">Break Length</p>
                <button id="break-decrement" onClick={ handleBreakLength }>-</button>
                <h5 id="break-length">{ breakLength }</h5>
                <button id="break-increment" onClick={ handleBreakLength }>+</button>
            </div>
            <div id='session-controls' className='controls'>
                <p id="session-label">Session Length</p>
                <button id="session-decrement" onClick={ handleSessionLength }>-</button>
                <h5 id="session-length">{ sessionLength }</h5>
                <button id="session-increment" onClick={ handleSessionLength }>+</button>
            </div>
        </>
    )
}

const initialSession = 25;
const initialBreak = 5;

//TODO: define states for the timer and implement it on the TimerControlers component
//TODO: define how to switch from 'session' to 'break' states
const Pomodoro = () => {
    const [sessionLength, setSessionLength] = useState(initialSession);
    const [breakLength, setBreakLength] = useState(initialBreak);
    const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);
    const [start, setStart] = useState(false);

    let seconds = '00';

    //? The next code works but I'm not able to integrate the stop functionality

    // window.onload = () => {
    //     document.getElementById('minutes').innerHTML = sessionLength;
    //     document.getElementById('seconds').innerHTML = seconds;
    // }

    // const start = () => {
    //     seconds = 60;

    //     let sessionMins = sessionLength - 1;
    //     let breakMins = breakLength - 1;

    //     let breakCount = 0

    //     let timer = () => {
    //         document.getElementById('minutes').innerHTML = sessionMins;
    //         document.getElementById('seconds').innerHTML = seconds;
            
    //         seconds = seconds - 1

    //         if (seconds === 0) {
    //             sessionMins = sessionMins - 1
    //             if (sessionMins === -1) {
    //                 if (breakCount % 2 === 0) {
    //                     sessionMins = breakMins
    //                     breakCount++
    //                 } else {
    //                     sessionMins = sessionLength
    //                     breakCount++
    //                 }
    //             }
    //             seconds = 59
    //         }
    //     }

    //     setInterval(timer, 1000);
    // }

    //** This codeblock works but is not implemented and can be refactored with states */

    // const sessionMins = document.getElementById('minutes');
    // const sessionSecs = document.getElementById('seconds');
    // let breakSecs;
    // let breakMins;

    // let startTimer;

    // const timer = () => {
    //     // Session Timer
    //     if (sessionSecs.innerText !== 0) {
    //         sessionSecs.innerText--
    //     } else if (sessionMins.innerText !== 0 && sessionSecs === 0) {
    //         sessionSecs.innerText = 59
    //         sessionMins.innerText--
    //     }

    //     // Break Timer
    //     if (sessionMins.innerText === 0 && sessionSecs === 0) {
    //         if (breakSecs.innerText !== 0) {
    //             breakSecs.innerText--
    //         } else if (breakMins.innerText === 0 && breakSecs.innerText === 0) {
    //             breakSecs.innerText = 59
    //             breakMins.innerText--
    //         }
    //     }
    // }

    // if (startTimer === undefined) {
    //     startTimer = setInterval(timer, 1000)
    // }

    // // Stop timer
    // const stopInterval = () => {
    //     clearInterval(startTimer)
    // }
    //** END OF CODEBLOCK */

    //* COMPLETED
    const handleSessionLength = (e) => {
        if (sessionLength === 1 && e.target.id === 'session-decrement') {
            return;
        } else if (sessionLength === 60 && e.target.id === 'session-increment') {
            return;
        } else {
            if (e.target.id === 'session-increment') {
                setSessionLength(sessionLength + 1)
            } else if (e.target.id === 'session-decrement') {
                setSessionLength(sessionLength - 1)
            } else
            return;
        }
    }

    //* COMPLETED
    const handleBreakLength = (e) => {
        if (breakLength === 1 && e.target.id === 'break-decrement') {
            return;
        } else if (breakLength === 60 && e.target.id === 'break-increment') {
            return;
        } else {
            if (e.target.id === 'break-increment') {
                setBreakLength(breakLength + 1)
            } else if (e.target.id === 'break-decrement') {
                setBreakLength(breakLength - 1)
            } else
            return;
        }
    }

    //? DEFINED: needs countdown to complete implementation
    console.log('is the timer paused? ', start)
    const handleStart = () => {
        setStart(!start)
    }

    //? DEFINED: setSessionLength and setBreakLength work as intended, setPause needs countdown
    const handleReset = (e) => {
        console.log(e.target.id)
        setStart(false)
        setSessionLength(initialSession)
        setBreakLength(initialBreak)
        console.log('app is set to default state')
    }
    
    return (
        <div>
            <h1>25 + 5 Clock</h1>
            <Timer 
                sessionLength={sessionLength}
                breakLength={breakLength}
                seconds={seconds}
            />
            <TimerControls 
                handleStart={ handleStart }
                handleReset={ handleReset }
            />
            <SetupControls 
                sessionLength={sessionLength}
                breakLength={breakLength}
                handleSessionLength={ handleSessionLength } 
                handleBreakLength={ handleBreakLength }
            />
        </div>
    );
}

export default Pomodoro;
