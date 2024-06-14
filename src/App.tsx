import Container from './components/containers';
import Button from './components/buttons';
import './App.css';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';

const App = () => {
  const [breakInterval, setBreakInterval] = useImmer(5);
  const [sessionInterval, setSessionInterval] = useImmer(25);
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useImmer(25 * 60);
  const [timerActive, setTimerActive] = useImmer(false);
  const [timerPhase, setTimerPhase] = useImmer('session');

  const minutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = timeLeftInSeconds % 60;

  const handleIncrementTimer = (e) => {
    const id = e.target.id;

    if (id === 'break-increment') {
      if (breakInterval < 60 && !timerActive) {
        setBreakInterval(breakInterval + 1);
        if (timerPhase === 'break') {
          setTimeLeftInSeconds((breakInterval + 1) * 60);
        }
      }
    } else if (id === 'session-increment') {
      if (sessionInterval < 60 && !timerActive) {
        setSessionInterval(sessionInterval + 1);
        if (timerPhase === 'session') {
          setTimeLeftInSeconds((sessionInterval + 1) * 60);
        }
      }
    }
  };

  const handleDecrementTimer = (e) => {
    const id = e.target.id;

    if (id === 'break-decrement') {
      if (breakInterval > 1 && !timerActive) {
        setBreakInterval(breakInterval - 1);
        if (timerPhase === 'break') {
          setTimeLeftInSeconds((breakInterval - 1) * 60);
        }
      }
    } else if (id === 'session-decrement') {
      if (sessionInterval > 1 && !timerActive) {
        setSessionInterval(sessionInterval - 1);
        if (timerPhase === 'session') {
          setTimeLeftInSeconds((sessionInterval - 1) * 60);
        }
      }
    }
  };

  const handleResetTimer = () => {
    setBreakInterval(5);
    setSessionInterval(25);
    setTimeLeftInSeconds(25 * 60);
    setTimerActive(false);
    setTimerPhase('session');
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  };

  const handleTimerStatus = () => {
    if (!timerActive) {
      setTimerActive(true);
    } else if (timerActive) {
      setTimerActive(false);
    }
  };

  useEffect(() => {
    const handleTimerPhaseSwitch = () => {
      if (timerPhase === 'session') {
        setTimerPhase('break');
        setTimeLeftInSeconds(breakInterval * 60);
      } else if (timerPhase === 'break') {
        setTimerPhase('session');
        setTimeLeftInSeconds(sessionInterval * 60);
      }
    };

    let intervalId: number | undefined;
    if (timerActive && timeLeftInSeconds > 0) {
      intervalId = setInterval(() => {
        setTimeLeftInSeconds(timeLeftInSeconds - 1);
      }, 1000);
    } else if (timerActive && timeLeftInSeconds === 0) {
      intervalId = setInterval(() => {
        document.getElementById('beep').play();
        setTimeLeftInSeconds(timeLeftInSeconds - 1);
        handleTimerPhaseSwitch();
      }, 1000);
    }

    return (): void => {
      clearInterval(intervalId);
    };
  }, [
    breakInterval,
    sessionInterval,
    setTimeLeftInSeconds,
    timeLeftInSeconds,
    setTimerPhase,
    timerPhase,
    timerActive,
  ]);

  return (
    <Container className="container" id="container">
      <Container id="text-container-1" className="text-container-1">
        Timer based on the idea that it is good to take a 5 minute break for
        every 25 minutes spent working.
        <br></br>
        --
        <br></br>
        Allows for setting custom values for both the break and the session, of
        up to one hour for each.
      </Container>
      <Container id="circle-container" className="circle-container">
        <Container id="break-label" className="break-label">
          Break Length
        </Container>
        <Container id="break-length" className="break-length">
          {breakInterval}
        </Container>
        <Button id="break-decrement" onClick={handleDecrementTimer}>
          ᗐ
        </Button>
        <Button id="break-increment" onClick={handleIncrementTimer}>
          ᗑ
        </Button>
        <Container id="session-label" className="session-label">
          Session Length
        </Container>
        <Container id="session-length" className="session-length">
          {sessionInterval}
        </Container>
        <Button id="session-decrement" onClick={handleDecrementTimer}>
          ᗐ
        </Button>
        <Button id="session-increment" onClick={handleIncrementTimer}>
          ᗑ
        </Button>
        <Container id="timer-label" className="timer-label">
          {timerPhase}
        </Container>
        <Container id="time-left" className="time-left">
          {minutes < 10 ? ('0' + minutes).slice(-2) : minutes}:
          {seconds < 10 ? ('0' + seconds).slice(-2) : seconds}
        </Container>
        <Button id="start_stop" onClick={handleTimerStatus}>
          {timerActive ? '❚❚' : '▶'}
        </Button>
        <Button id="reset" onClick={handleResetTimer}>
          ↺
        </Button>
        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
        >
        </audio>
      </Container>
    </Container>
  );
};

export default App;
