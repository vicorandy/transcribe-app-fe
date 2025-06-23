import React, { useState, useEffect,useImperativeHandle, forwardRef } from "react";
import { Box } from "@chakra-ui/react";


interface TimerProps {
    isRecording : boolean;
    isPaused : boolean;

}


export interface TimerRef {
    resetTimer: () => void;

  }

const Timer = forwardRef<TimerRef, TimerProps>(({ isRecording, isPaused }, ref) => {
  const [time, setTime] = useState<number>(0); // Time in seconds

  useImperativeHandle(ref, () => ({
    resetTimer: () => {
        console.log('running 2')
      setTime(0);
    }
  }));

  useEffect(() => {
  

       if(isPaused) {
        console.log('running1')
        setTime(time) 
       } 

       if(isRecording){
        const interval = setInterval(() => {
           if(isPaused) return
           isRecording ? setTime((prev) => prev + 1) : setTime(time) // Increment time by 1 second
        }, 1000);
        return () => clearInterval(interval); // Cleanup on unmount
       }
       else{
        console.log('running3')
        setTime(time)
       }

      
   

  }, [isPaused,isRecording]);


  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

return (
    <Box m={'1rem 0'} display={ isRecording? 'Box' : 'none'} textAlign={'center'}>{formatTime(time)}</Box>
)
});

export default Timer;
