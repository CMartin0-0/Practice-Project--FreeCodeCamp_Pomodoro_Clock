import Container from './components/containers';
import Button from './components/buttons';
import "./App.css"
import { useState } from 'react';

function App( ) {

  const [ breakLength, setBreakLength] = useState(5);
  const [ sessionLength, setSessionLength] = useState(25);


const incrementBreak = (breakLength: number) => {
  if (breakLength >= 1 && breakLength < 60) {
    setBreakLength(breakLength => breakLength + 1);
  } else {return}
}

const decrementBreak = (breakLength: number) => {
   if (breakLength > 1 && breakLength <= 60) {
     setBreakLength((breakLength) => breakLength - 1);
   } else {
     return;
   }
}

const incrementSession = (sessionLength: number) => {
  if (sessionLength >= 1 && sessionLength < 60) {
    setSessionLength((sessionLength) => sessionLength + 1);
  } else {
    return;
  }
};

const decrementSession = (sessionLength: number) => {
  if (sessionLength > 1 && sessionLength <= 60) {
    setSessionLength((sessionLength) => sessionLength - 1);
  } else {
    return;
  }
};

const resetTimer = () => {
  setSessionLength(25);
  setBreakLength(5);
}





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
          {breakLength}
        </Container>
        <Button id="break-decrement" onClick={() => decrementBreak(breakLength)}>
          ᗐ
        </Button>
        <Button id="break-increment" onClick={() => incrementBreak(breakLength)}>
          ᗑ
        </Button>
        <Container id="session-label" className="session-label">
          Session Length
        </Container>
        <Container id="session-length" className="session-length">
          {sessionLength}
        </Container>
        <Button id="session-decrement" onClick={() => decrementSession(sessionLength)}>
          ᗐ
        </Button>
        <Button id="session-increment" onClick={() => incrementSession(sessionLength)}>
          ᗑ
        </Button>
        <Container id="timer-label" className="timer-label">
          Session
        </Container>
        <Container id="time-left" className="time-left">
          25:00
        </Container>
        <Button id="start_stop" onClick={() => {}}>
          start
        </Button>
        <Button id="reset" onClick={() => resetTimer()}>
          reset
        </Button>
      </Container>
    </Container>
  );
}

export default App;
