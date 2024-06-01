import Container from './components/containers';
import Button from './components/buttons';
import "./App.css"
function App() {
  
  return (
    <Container className="container" id="container">
      <Container id="text-container-1" className="text-container-1">
        Timer based on the idea that it is good to take a 5 minute break for every 25 minutes spent working. 
        <br></br>
        --
        <br></br>
        Allows for setting custom values for both the break and the session, of up to one hour for each. 
      </Container>
      <Container id="circle-container" className="circle-container">
        <Container id="break-label" className="break-label">
          Break Length
        </Container>
        <Container id="break-length" className="break-length">
          5
        </Container>
        <Button id="break-decrement" onClick={() => {}}>
          ᗐ
        </Button>
        <Button id="break-increment" onClick={() => {}}>
          ᗑ
        </Button>
        <Container id="session-label" className="session-label">
          Session Length
        </Container>
        <Container id="session-length" className="session-length">
          25
        </Container>
        <Button id="session-decrement" onClick={() => {}}>
          ᗐ
        </Button>
        <Button id="session-increment" onClick={() => {}}>
          ᗑ
        </Button>
        <Container id="timer-label" className="timer-label">
          Session
        </Container>
        <Container id="time-left" className="time-left">
          25:00
        </Container>
      </Container>
    </Container>
  );
}

export default App;
