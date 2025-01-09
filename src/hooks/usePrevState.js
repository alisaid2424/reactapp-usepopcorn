
import  { useEffect, useRef } from 'react'

const usePrevState = ({state}) => {
    const ref = useRef(state)

    useEffect(() =>{
        ref.current = state
    })

    return  ref.current;
}

export default usePrevState
