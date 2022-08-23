import { useEffect, useState } from "react";

/**
 * Saves into the local storage 
 * @param key 
 * @param initialValue 
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) { //Whatever type it the intitial value is going to be that type or a function that returns that type
    const [value, setValue] = useState<T>(() => { //functional version to check storage just one time & not every time the component re-renders
        const jsonValue = localStorage.getItem(key)
        //if is in Storage, returns the value
        if (jsonValue != null) return JSON.parse(jsonValue)

        //To fix issue that typescript thinks T is a function
        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    // Every time thw value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}