// src/components/Timer.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import io from "socket.io-client";
import useSound from "use-sound";
import alarmSound from "../assets/alarm.wav"; // Add an alarm sound in the assets folder

const socket = io("http://localhost:5000");

const Timer = () => {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("time");
    return savedTime ? JSON.parse(savedTime) : 1500; // default to 25 minutes
  });
  const [isActive, setIsActive] = useState(false);
  const [workLength, setWorkLength] = useState(() => {
    const savedWorkLength = localStorage.getItem("workLength");
    return savedWorkLength ? JSON.parse(savedWorkLength) : 25; // default to 25 minutes
  });
  const [breakLength, setBreakLength] = useState(() => {
    const savedBreakLength = localStorage.getItem("breakLength");
    return savedBreakLength ? JSON.parse(savedBreakLength) : 5; // default to 5 minutes
  });
  const [startTime, setStartTime] = useState(null);
  const [play] = useSound(alarmSound);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("time", JSON.stringify(newTime));
          return newTime;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      play();
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time, play]);

  const startTimer = () => {
    setIsActive(true);
    setStartTime(new Date());
    socket.emit("startSession", {
      userId: localStorage.getItem("userId"),
      startTime: new Date(),
    });
  };

  const stopTimer = async () => {
    setIsActive(false);
    const endTime = new Date();
    socket.emit("stopSession", {
      userId: localStorage.getItem("userId"),
      endTime,
    });
    // Save session data
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/sessions",
        { startTime, endTime },
        { headers: { "x-auth-token": token } }
      );
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("time"); // Clear saved time
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(workLength * 60);
    localStorage.removeItem("time"); // Clear saved time
  };

  const handleWorkLengthChange = (e) => {
    const newWorkLength = e.target.value;
    setWorkLength(newWorkLength);
    localStorage.setItem("workLength", JSON.stringify(newWorkLength));
    setTime(newWorkLength * 60);
  };

  const handleBreakLengthChange = (e) => {
    const newBreakLength = e.target.value;
    setBreakLength(newBreakLength);
    localStorage.setItem("breakLength", JSON.stringify(newBreakLength));
  };

  const progress = (time / (workLength * 60)) * 100;

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Pomodoro Timer</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <CircularProgress variant="determinate" value={progress} size={200} />
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
            {time % 60}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Work Length (minutes)"
          type="number"
          value={workLength}
          onChange={handleWorkLengthChange}
          sx={{ m: 1 }}
        />
        <TextField
          label="Break Length (minutes)"
          type="number"
          value={breakLength}
          onChange={handleBreakLengthChange}
          sx={{ m: 1 }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={startTimer}
        sx={{ mt: 2 }}
      >
        Start
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={stopTimer}
        sx={{ mt: 2, ml: 2 }}
      >
        Stop
      </Button>
      <Button variant="contained" onClick={resetTimer} sx={{ mt: 2, ml: 2 }}>
        Reset
      </Button>
    </Box>
  );
};

export default Timer;
