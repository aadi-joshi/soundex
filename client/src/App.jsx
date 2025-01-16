import React, { useEffect, useState } from "react";
import {
  makeStyles,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

import Home from "./Screens/Home";

import useEth from './contexts/EthContext/useEth';

import Register from "./Screens/Register";


function App() {
  const classes = useStyles();

  const { state } = useEth();
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Trying to connect to your blockchain wallet.... Please make sure you are connected to the correct blockchain network.");

  useEffect(() => {
    if (state.contract !== null && state.account !== null) {
      setLoading(false);
    } else if (state.account !== null && state.contract === null) {
      setLoadingMessage("Contract not found. Please make sure you are connected to the correct blockchain network.");
    } else if (state.account === null) {
      setLoadingMessage("Trying to connect to your blockchain wallet.... Please make sure you are connected to the correct blockchain network.");
    }
  }, [state]);

  return (
    <>
      <CssBaseline />
      <div className={classes.app} >
        {loading ? 
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={classes.loadingContainer}
          >
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className={classes.title}
            >
              Welcome to Soundex
            </motion.h1>
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className={classes.subtitle}
            >
              Loading...
            </motion.h2>
            <motion.h3
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className={classes.message}
            >
              {loadingMessage}
            </motion.h3>
          </motion.div>
          :
          (state.userName === "" || state.userName === undefined || state.userName === null) ?
          <Register />
          :
          <Home />
        }
        <ToastContainer theme="dark" position="bottom-right" />
      </div>
    </>
  );
}

const useStyles = makeStyles({
  app: {
    margin: 0,
    padding: 0,
    display: 'flex',
    backgroundColor: '#000000',
    minHeight: '100vh',
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    background: '#000000',
    backgroundImage: "radial-gradient(circle at center, #001233 0%, #000000 100%)",
  },
  title: {
    color: "#007BFF",
    background: "rgba(0, 123, 255, 0.1)",
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    padding: "1.5rem 3rem",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0, 123, 255, 0.2)",
    textAlign: "center",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    padding: "1rem",
  },
  message: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "1.2rem",
    fontWeight: "500",
    marginBottom: "1rem",
    padding: "1.5rem",
    textAlign: "center",
    maxWidth: "600px",
    background: "rgba(0, 123, 255, 0.05)",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
  }
});

export default App;
