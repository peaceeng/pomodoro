// src/components/History.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
// src/utils/formatDuration.js
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours}h ${minutes}m ${secs}s`;
}

const History = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/sessions", {
          headers: { "x-auth-token": token },
        });
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Session History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Duration (minutes)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session._id}>
                <TableCell>
                  {new Date(session.startTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(session.endTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {formatDuration(
                    Math.round(
                      (new Date(session.endTime) -
                        new Date(session.startTime)) /
                        1000
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;
