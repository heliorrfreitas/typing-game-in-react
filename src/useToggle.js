import {useState} from "react"

function useToggle(defaultValue = false) {
    const [on, setIsOn] = useState(defaultValue)
    
    function toggle() {
        setIsOn(prevState => !prevState)
    }
        
    return [on, toggle]
}

export default useToggle