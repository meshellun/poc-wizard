import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { states } from '../helpers/Utils';
import { makeStyles } from "@material-ui/core/styles";
import { Controller } from 'react-hook-form';


const StateSelector: React.FC<{control?: any, name: string, setValue: Function }> = ({control, name, setValue}) => {
  const useStyles = makeStyles(() => ({
    inputRoot: {
      "& .MuiOutlinedInput-notchedOutline": {
        color: "red",
        padding: "0px",
        margin: "0px",
        border: "solid #e4e4e4 3px",
        borderRadius: "0px"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        color: "red",
        borderColor: "#e4e4e4"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        color: "red",
        borderColor: "#e4e4e4"
      }
    }
  }));

  const classes = useStyles();

  return (
    <Controller name={name} control={control} render={({value}) => 
      <Autocomplete freeSolo={true} value={value} 
      id="legal-states"
      classes={classes}
      autoSelect={true} 
      options={states} 
      getOptionLabel={option => option} 
      onChange={(event, value)=>{
          setValue(name, value)
      }}
      renderOption={option =>(
      <span> {option}</span>
      )} renderInput={params => {
          let newInputProps = {...params.InputProps, placeholder: 'State'};
          let innerInputProps = {...params.inputProps, maxLength: "2"}
          let newParams = {...params, InputProps: newInputProps, 
          inputProps: innerInputProps};
          return (
            <TextField type="text" {...newParams} variant="outlined"/>
      )}} />} rules={{
          required: true, 
          validate: (val) => (states.findIndex((state) => /[A-Za-z]{2}/.test(val) && state === val?.toUpperCase()) !== -1)
      }} />
  );
};

export default StateSelector;
