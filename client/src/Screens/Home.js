import React, {useState} from 'react'
import {
    makeStyles,
    CssBaseline,
    ThemeProvider,
} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import { darkTheme } from '../theme';

import SideBar from '../components/SideBar'
import Explore from './Explore';
import Library from './Library';
import Upload from './Upload';
import SongPlayer from '../components/SongPlayer';

const Home = () => {
    const classes = useStyles();

    const [screen, setScreen] = useState("explore");
    const [selectedSong, setSelectedSong] = useState("");

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.root}>
            <div className={classes.sideBar}>
                <SideBar screen={screen} setScreen={setScreen} />
            </div>
            <div className={classes.appMain}>
                {screen === "explore" && <Explore selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
                {screen === "library" && <Library selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
                {screen === "upload" && <Upload selectedSong={selectedSong} setSelectedSong={setSelectedSong} />}
                  <div className={classes.bottomAudioPlayerContainer}>
                    <div className={classes.bottomAudioPlayer}>
                        <SongPlayer selectedSong={selectedSong} />
                    </div>
                  </div>
              </div>
        </div>
    </ThemeProvider>
  )
}


const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000000",
    },
    sideBar: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: "0px",
        width: "420px",
        height: "100vh",
        backgroundColor: "#121212",
        color: "white",
        justifyContent: "space-between",
        borderRight: "1px solid rgba(0, 123, 255, 0.1)",
    },
    appMain: {
        paddingLeft: "420px",
        height: "100vh",
        flexGrow: 1,
        backgroundColor: "#000000",
    },
    bottomAudioPlayerContainer: {
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        bottom: "20px",
        height: "150px",
        margin: "40px",
        borderRadius: "30px",
        border: "1px solid #007BFF",
        width: "calc(100% - 500px)",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        boxShadow: "0 0 20px rgba(0, 123, 255, 0.2)",
    },
    bottomAudioPlayer: {
        width: "50%",
        padding: "20px",
    }
});

export default Home