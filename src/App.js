import './App.css';
import React, {useEffect, useState, useRef} from "react"
import useToggle from "./useToggle"

function App() {

    const [startingTime, setStartingTime] = useState(5)
    
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
    const [on, toggle] = useToggle()
    
    const settingsMessage = on ? 'Hide Settings' : 'View Settings'

    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }

    function decrementTimeRemaining() {
        setStartingTime(prevTime => prevTime - 1)        
    }
    
    function incrementTimeRemaining() {
        setStartingTime(prevTime => prevTime + 1)        
    }

    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])

  return (
    <div>
        <h1>How fast do you type?</h1>
        <textarea
            ref={textBoxRef}
            onChange={handleChange}
            value={text}
            disabled={!isTimeRunning}
        />
        <h4>Time remaining: {timeRemaining}</h4>        
        <button 
            onClick={startGame}
            disabled={isTimeRunning}
        >
            Start
        </button>
        <h1>Word count: {wordCount}</h1>
        <br />
        <hr />
        <div>

            <h4
                onClick={toggle}                
            > 
                {settingsMessage}
            </h4>

            { on 
                ?
                    <div >
                        <span>Set Starting Time Remaining</span>
                        <div class="display-in-row">
                            <button 
                                onClick={decrementTimeRemaining} 
                                disabled={isTimeRunning}>
                                    -
                            </button>
                            
                            {startingTime}    
                            
                            <button 
                                onClick={incrementTimeRemaining}
                                disabled={isTimeRunning}
                            >
                                +
                            </button>
                        </div>    
                    </div>
                    
                : 
                <div></div>                
            }
            
            
        </div>
    </div>
  );
}

export default App;
