import { useEffect, useState } from "react"


const useLocalStorageState = (init , Key) => {
    const [value, setValue] = useState(()=>{
      const valueStore = localStorage.getItem(Key)
      return valueStore ? JSON.parse(valueStore) : init;
    });

    useEffect(()=>{
      localStorage.setItem(Key , JSON.stringify(value))
    },[Key , value]);
    
  return [value, setValue]
}

export default useLocalStorageState;

