import Container from './components/containers';
import Button from './components/buttons';
import './App.css';
import { useImmer } from 'use-immer';
import { useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { AutoTextSize} from 'auto-text-size';

const App = () => {
  //setting up all the state values that are needed, immer is used for simplicity and beacuse it's interchangeable with useState
  const [breakInterval, setBreakInterval] = useImmer(5);
  const [sessionInterval, setSessionInterval] = useImmer(25);
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useImmer(25 * 60);
  const [timerActive, setTimerActive] = useImmer(false);
  const [timerPhase, setTimerPhase] = useImmer('session');
  const [animationKey, setAnimationKey] = useImmer(0);
  const [animationDuration, setAnimationDuration] = useImmer(25 * 60);

  //the two variables below will be used to for the timer operation and display
  const minutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = timeLeftInSeconds % 60;
  //the ref that holds the reference to the alarm audio clip
  const audioClip = useRef<HTMLAudioElement>(null);

  const handleIncrementTimer = (e: React.MouseEvent<HTMLElement>) => {
    //save the id of the html element the event handler fired from, to tell what value to change
    const id = e.currentTarget.id;

    if (id === 'break-increment') {
      if (breakInterval < 60 && !timerActive) {
        //checking to make sure the value remains between 0-60 and also that the timer is not running (if it is running the buttons are disabled)
        setBreakInterval(breakInterval + 1);
        //check if the value in the timer display needs to be updated too
        if (timerPhase === 'break') {
          setTimeLeftInSeconds((breakInterval + 1) * 60);
           setAnimationKey((animationKey) => animationKey + 1);
           setAnimationDuration((breakInterval + 1) * 60);
        }
      }
    } else if (id === 'session-increment') {
      if (sessionInterval < 60 && !timerActive) {
        setSessionInterval(sessionInterval + 1);
        //check if the value in the timer display needs to be updated too
        if (timerPhase === 'session') {
          setTimeLeftInSeconds((sessionInterval + 1) * 60);
           setAnimationKey((animationKey) => animationKey + 1);
           setAnimationDuration((sessionInterval + 1) * 60);
        }
      }
    }
  };

  const handleDecrementTimer = (e: React.MouseEvent<HTMLElement>) => {
    // logic is the same as for increment handler above
    const id = e.currentTarget.id;

    if (id === 'break-decrement') {
      if (breakInterval > 1 && !timerActive) {
        setBreakInterval(breakInterval - 1);
        if (timerPhase === 'break') {
          setTimeLeftInSeconds((breakInterval - 1) * 60);
           setAnimationKey((animationKey) => animationKey + 1);
           setAnimationDuration((breakInterval - 1) * 60);
        }
      }
    } else if (id === 'session-decrement') {
      if (sessionInterval > 1 && !timerActive) {
        setSessionInterval(sessionInterval - 1);
        if (timerPhase === 'session') {
          setTimeLeftInSeconds((sessionInterval - 1) * 60);
           setAnimationKey((animationKey) => animationKey + 1);
           setAnimationDuration((sessionInterval - 1) * 60);
        }
      }
    }
  };

  const handleResetTimer = () => {
    //reset the state values, alarm audio clip, and the two variables (seconds and minutes)
    setBreakInterval(5);
    setSessionInterval(25);
    setTimeLeftInSeconds(25 * 60);
    setTimerActive(false);
    setTimerPhase('session');
    if (audioClip.current !== null) {
      audioClip.current.pause();
      audioClip.current.currentTime = 0;
    }
    setAnimationKey(animationKey => animationKey + 1)
    setAnimationDuration(25 * 60);
  };

  const handleTimerStatus = () => {
    //handles starting and stopping the timer 
    //also the value by which it is decided whether the play or pause button is visible at any given time
    if (!timerActive) {
      setTimerActive(true);
    } else if (timerActive) {
      setTimerActive(false);
    }
  };

  useEffect(() => {
    //handles the swapping between break and session timing phases as the timer runs
    const handleTimerPhaseSwitch = () => {
      if (timerPhase === 'session') {
        setTimerPhase('break');
        setTimeLeftInSeconds(breakInterval * 60);
        setAnimationKey(animationKey => animationKey + 1);
        setAnimationDuration(breakInterval * 60);
      } else if (timerPhase === 'break') {
        setTimerPhase('session');
        setTimeLeftInSeconds(sessionInterval * 60);
        setAnimationKey(animationKey => animationKey + 1);
        setAnimationDuration(sessionInterval * 60);
      }
    };
    //variable to hold interval id so that it can be cleared
    let intervalId: number | undefined;
    //logic that handles the timer counting down and updates the display/value every 1000ms 
    if (timerActive && timeLeftInSeconds > 0) {
      intervalId = setInterval(() => {
        setTimeLeftInSeconds(timeLeftInSeconds - 1);
        setAnimationKey(Math.random());
      }, 1000);
    } else if (timerActive && timeLeftInSeconds === 0) {
      //checks if the timer phase should be swapped and the alarm sound should play
          if (audioClip.current !== null) {
            audioClip.current.play();
          }
      intervalId = setInterval(() => {
        
             setTimeLeftInSeconds(timeLeftInSeconds - 1);
            handleTimerPhaseSwitch();
        
      }, 1000);
    } 
    // this is the cleanup for our effect that clears our interval after each run
    return () => {
      clearInterval(intervalId);
    };
  }, [
    //the list of dependences for our effect, normally setter functions can be omitted but my linter complained when I did so...
    breakInterval,
    sessionInterval,
    setTimeLeftInSeconds,
    timeLeftInSeconds,
    setTimerPhase,
    timerPhase,
    timerActive,
    audioClip,
    animationKey,
    setAnimationKey,
    setAnimationDuration,
    animationDuration
  ]);

  return (
    //this is the returned jsx for the timer
    <>
      <Container className="container" id="container">
        <Container id="text-container-1" className="text-container-1">
        <AutoTextSize
         mode='multiline'
         minFontSizePx={20}
         maxFontSizePx={26}
        >
          Timer based on the idea that it is good to take a 5 minute break for
          every 25 minutes spent working.
          <br></br>
          --
          <br></br>
          Allows for setting custom values for both the break and the session,
          of up to one hour for each.
          </AutoTextSize>
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
          {timerPhase === 'session' ? (
            <Container id="animated-timer-wrap" className="animated-timer-wrap">
              <CountdownCircleTimer
                colors={['#ff0000', '#32d3a3']}
                colorsTime={[animationDuration, 5, 0]}
                isSmoothColorTransition={false}
                size={250}
                isPlaying={timerActive ? true : false}
                duration={animationDuration}
                key={animationKey}
                initialRemainingTime={timeLeftInSeconds}
                updateInterval={0}
                strokeWidth={2}
              ></CountdownCircleTimer>
            </Container>
          ) : (
            <Container
              id="animated-timer-wrap-2"
              className="animated-timer-wrap"
            >
              <CountdownCircleTimer
                colors={[ '#32d3a3','#ff0000']}
                colorsTime={[animationDuration, 5, 0]}
                isSmoothColorTransition={false}
                size={300}
                isPlaying={timerActive ? true : false}
                duration={animationDuration}
                key={animationKey}
                initialRemainingTime={timeLeftInSeconds}
                updateInterval={0}
                strokeWidth={2}
              ></CountdownCircleTimer>
            </Container>
          )}
          <Container id="timer-label" className="timer-label">
            {/*sets timer label to the current timer phase*/}
            {timerPhase}
          </Container>
          <Container id="time-left" className="time-left">
            {/*formatting the timer values to be displayed*/}
            {minutes < 10 ? ('0' + minutes).slice(-2) : minutes}:
            {seconds < 10 ? ('0' + seconds).slice(-2) : seconds}
          </Container>
          <Button id="start_stop" onClick={handleTimerStatus}>
            {/*set whether the play or pause button should be visible and active*/}
            {timerActive ? '❚❚' : '▶'}
          </Button>
          <Button id="reset" onClick={handleResetTimer}>
            {'↺'}
          </Button>
        </Container>
      </Container>
      <audio id="beep" ref={audioClip}>
        <source
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="audio"
          type="audio/mpeg"
        />
      </audio>
    </>
  );
};

export default App;
