// src/components/Analytics.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalSessions: 0,
    totalWorkMinutes: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/analytics", {
          headers: { "x-auth-token": token },
        });
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4">Productivity Analytics</Typography>
      <Typography variant="h6">
        Total Sessions: {analytics.totalSessions}
      </Typography>
      <Typography variant="h6">
        Total Work Minutes: {analytics.totalWorkMinutes}
      </Typography>
    </Box>
  );
};

export default Analytics;
