import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";

import Controls from "./controls";
import { useForm, Form } from "./useForm";

// import useEth from "../contexts/EthContext/useEth";

const initialFValues = {
    songName: "",
    songCost: "",
    songFile: null,
};

const useStyles = makeStyles({
    form: {
        backgroundColor: '#121212',
        padding: '2rem',
        borderRadius: '15px',
        border: '1px solid rgba(0, 123, 255, 0.1)',
    },
    fileInput: {
        padding: '1rem',
        backgroundColor: 'rgba(0, 123, 255, 0.05)',
        borderRadius: '10px',
        border: '2px solid rgba(0, 123, 255, 0.3)',
        color: 'white',
        '&:hover': {
            borderColor: '#007BFF',
        }
    }
});

export default function UploadForm(props) {
    const { handleUploadSong, setOpenAddNewPopup } = props;
    const classes = useStyles();

    // const { state } = useEth();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("songName" in fieldValues)
            temp.songName = fieldValues.songName
                ? ""
                : "This field is required.";
        if ("songCost" in fieldValues)
            temp.songCost = (fieldValues.songCost !== 0)
            ? ""
                : "This field is required.";
        if ("songFile" in fieldValues)
            temp.songFile = fieldValues.songFile
                ? ""
                : "This field is required.";
        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    // const handleUploadSong = (fie) => {
        

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleUploadSong({
                songName: values.songName,
                songCost: values.songCost,
                songFile: values.songFile,
                closePopup: () => {
                    setOpenAddNewPopup(false);
                }
            });
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        
        // Add file validation
        if (file) {
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                setErrors({
                    ...errors,
                    songFile: "File size should be less than 50MB"
                });
                return;
            }
            
            if (!file.type.startsWith('audio/')) {
                setErrors({
                    ...errors,
                    songFile: "Please upload an audio file"
                });
                return;
            }
        }

        setValues({
            ...values,
            songFile: file,
        });
    };

    return (
        <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Controls.Input
                            name="songName"
                            label="Song Name"
                            value={values.songName}
                            onChange={handleInputChange}
                            error={errors.songName}
                        />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Controls.Input
                            name="songCost"
                            label="Song Cost"
                            value={values.songCost}
                            onChange={handleInputChange}
                            error={errors.songCost}
                            type="number"
                        />
                    </motion.div>
                </Grid>
                <Grid item xs={6}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <input
                            className={classes.fileInput}
                            name="songFile"
                            onChange={handleFileChange}
                            type="file"
                            accept="audio/*"
                        />
                        {errors.songFile && (
                            <div style={{ color: '#ff3d00', marginTop: '0.5rem' }}>
                                {errors.songFile}
                            </div>
                        )}
                    </motion.div>
                    <div style={{ marginTop: '2rem' }}>
                        <Controls.Button 
                            type="submit" 
                            text="Submit"
                            style={{
                                backgroundColor: '#007BFF',
                                marginRight: '1rem',
                                '&:hover': {
                                    backgroundColor: '#0056b3',
                                }
                            }}
                        />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                            style={{
                                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                color: '#007BFF',
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}