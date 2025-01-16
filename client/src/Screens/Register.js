import React, { useState} from 'react'
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

import useEth from '../contexts/EthContext/useEth';
import Util from './util';

const Register = () => {

  const { state } = useEth();
  
  const [userName, setUserName] = useState("");

    const registerUser = async () => {
        if (!userName) {
          window.alert("Please fill all the fields");
          return;
        };
      state.contract.methods.registerUser(userName.trim()).send({ from: state.account })
        .then(data => {
          console.log("registration successful :", data)
           window.location.reload(false);
        })
        .catch(error => {
          // handle the error here
            let msg = Util.metamaskErrorParser(error);
            console.log(msg)
        });
     
      }
    
  const classes = useStyles();

  return (
    <motion.div 
      className={classes.registerContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={classes.formContainer}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1 className={classes.title}>
          Welcome to Soundex
        </motion.h1>
        <motion.div className={classes.form}>
          <h2 className={classes.subtitle}>Register</h2>
          <p className={classes.warning}>
            User Name can't be changed
          </p>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Enter User Name"
            className={classes.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <motion.button
            className={classes.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={registerUser}
          >
            Register with MetaMask
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const useStyles = makeStyles({
  registerContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000000",
    backgroundImage: "radial-gradient(circle at center, #001233 0%, #000000 100%)",
  },
  formContainer: {
    padding: "3rem",
    borderRadius: "20px",
    background: "rgba(0, 123, 255, 0.05)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 30px rgba(0, 123, 255, 0.1)",
    maxWidth: "500px",
    width: "90%",
  },
  title: {
    color: "#007BFF",
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "2rem",
    textShadow: "0 0 10px rgba(0, 123, 255, 0.3)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  warning: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.9rem",
    textAlign: "center",
    fontStyle: "italic",
  },
  input: {
    padding: "1rem 1.5rem",
    fontSize: "1.1rem",
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(0, 123, 255, 0.3)",
    borderRadius: "10px",
    color: "white",
    outline: "none",
    transition: "all 0.3s ease",
    "&:focus": {
      borderColor: "#007BFF",
      boxShadow: "0 0 15px rgba(0, 123, 255, 0.2)",
    },
  },
  button: {
    padding: "1rem",
    fontSize: "1.1rem",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "#0056b3",
      boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)",
    },
  },
});

export default Register;