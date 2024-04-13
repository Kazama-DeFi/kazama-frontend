import React, { useState, useEffect } from 'react';

const RewardTimer: React.FC = () => {
    const calculateInitialTime = (): number => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(0, 0, 0, 0); // Set to midnight
        const secondsSinceMidnight = Math.floor((now.getTime() - midnight.getTime()) / 1000);
        return 24 * 60 * 60 - secondsSinceMidnight; // Countdown from 24 hours
      };
    
      const [time, setTime] = useState<number>(calculateInitialTime());
      const [timezoneOffset, setTimezoneOffset] = useState<number>(
        new Date().getTimezoneOffset() * 60
      );
    
      useEffect(() => {
        const interval = setInterval(() => {
          // Update the time every second
          setTime((prevTime) => prevTime - 1);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        // Update timezone offset when it changes
        setTimezoneOffset(new Date().getTimezoneOffset() * 60);
      }, []);
    
      useEffect(() => {
        // Check if the timer has reached zero
        if (time === 0) {
          // Reset the timer to 24 hours
          setTime(calculateInitialTime());
        }
      }, [time]);
    
      const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
    
        const formattedHours = hours.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        });
    
        const formattedMinutes = minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        });
    
        const formattedSeconds = remainingSeconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        });
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      };
    
      const adjustedTime = time + timezoneOffset; // Adjust time for the user's timezone
    
      return (
        <div>
          <h1>Holding Rewards</h1>
          <p style={{fontSize: "13px"}}>{formatTime(adjustedTime)}</p>
        </div>
      );
    };
    

export default RewardTimer;