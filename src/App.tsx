import Container from './components/containers';
import Button from './components/buttons';
import './App.css';
import { useImmer } from 'use-immer';

const App = () => {
  const [breakPhase, setBreakPhase] = useImmer({
    length: 5,
    isCurrentTimerPhase: false,
  });
  const [sessionPhase, setSessionPhase] = useImmer({
    length: 25,
    isCurrentTimerPhase: true,
  });
  const [timerStatus, setTimerStatus] = useImmer({
    isRunning: false,
    timeRemaining: '25:00',
  });

  const handleIncrementTimer = (e) => {
    const id = e.target.id;

    if (timerStatus.isRunning) {
      return;
    }

    if (id === 'break-increment') {
      if (breakPhase.length >= 1 && breakPhase.length < 60) {
        setBreakPhase({ ...breakPhase, length: breakPhase.length + 1 });
        if (breakPhase.isCurrentTimerPhase) {
          setTimerStatus({
            ...timerStatus,
            timeRemaining: clockify(breakPhase.length),
          });
          return;
        }
      } else {
        return;
      }
    } else if (id === 'session-increment') {
      if (sessionPhase.length >= 1 && sessionPhase.length < 60) {
        setSessionPhase({ ...sessionPhase, length: sessionPhase.length + 1 });
        if (sessionPhase.isCurrentTimerPhase) {
          setTimerStatus({
            ...timerStatus,
            timeRemaining: clockify(sessionPhase.length),
          });
          return;
        }
      } else {
        return;
      }
    }
    return;
  };

  const handleDecrementTimer = (e) => {
    const id = e.target.id;

    if (timerStatus.isRunning) {
      return;
    }

    if (id === 'break-decrement') {
      if (breakPhase.length > 1 && breakPhase.length <= 60) {
        setBreakPhase({ ...breakPhase, length: breakPhase.length - 1 });
        if (breakPhase.isCurrentTimerPhase) {
          setTimerStatus({
            ...timerStatus,
            timeRemaining: clockify(breakPhase.length),
          });
          return;
        }
      } else {
        return;
      }
    } else if (id === 'session-decrement') {
      if (sessionPhase.length > 1 && sessionPhase.length <= 60) {
        setSessionPhase({ ...sessionPhase, length: sessionPhase.length - 1 });
        if (sessionPhase.isCurrentTimerPhase) {
          setTimerStatus({
            ...timerStatus,
            timeRemaining: clockify(sessionPhase.length),
          });
          return;
        }
      } else {
        return;
      }
    }
    return;
  };

  const resetTimer = () => {
    setSessionPhase({length: 25, isCurrentTimerPhase: true});
    setBreakPhase({length: 5, isCurrentTimerPhase: false});
    setTimerStatus({timeRemaining: '25:00', isRunning: false});

  };

  function HandleTimer() {}

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
          {breakPhase.length}
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
          {sessionPhase.length}
        </Container>
        <Button id="session-decrement" onClick={handleDecrementTimer}>
          ᗐ
        </Button>
        <Button id="session-increment" onClick={handleIncrementTimer}>
          ᗑ
        </Button>
        <Container id="timer-label" className="timer-label">
          {sessionPhase.isCurrentTimerPhase ? 'session' : 'break'}
        </Container>
        <Container id="time-left" className="time-left">
          {timerStatus.timeRemaining}
        </Container>
        <Button id="start_stop" onClick={() => {}}>
          play pause
        </Button>
        <Button id="reset" onClick={() => resetTimer()}>
          reset
        </Button>
      </Container>
    </Container>
  );
};

export default App;
