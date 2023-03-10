import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import history from '../../Navigation/history';
import { AppBar,Toolbar, Typography,Button,IconButton, Link, Grid,Paper,Box, MenuItem, Select, FormControl, InputLabel, Divider, TextField} from '@material-ui/core';
const serverURL = "";



const Payment = (props) => {
  const tripInfo = props.location.state.stuff[0]
  let [name, setName] = React.useState('')
  let [number, setNumber] = React.useState('')
  let [mmyy, setMmyy] = React.useState('')
  let [cvv, setCvv] = React.useState('')
  let [errorMessage, setErrorMessage] = React.useState('')
  let [successMessage, setSuccessMessage] = React.useState('')
  const regexNumber = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  const regexMMYY =  /^(?:0[1-9]|1[0-2])(\d{2})$/;
  const regexCVV = /^[0-9]{3,4}$/;

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }
  const handleMmyyChange = (e) => {
    setMmyy(e.target.value)
  }
  const handleCvvChange = (e) => {
    setCvv(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !number || !mmyy || !cvv){
      setErrorMessage("Please fill out all credit card information")
      return;
    }
    if (!regexNumber.test(number)){
      setErrorMessage("Please enter correct credit card number")
      return;
    }
    if (!regexMMYY.test(mmyy)){
      setErrorMessage("Please enter correct MMYY")
      return;
    }
    if (!regexCVV.test(cvv)){
      setErrorMessage("Please enter correct CVV")
      return;
    }
    setErrorMessage("")
    setSuccessMessage ("Order successfully placed !")
  }
  return (
    <Box mt = {2}>
      <Typography variant = "h3" style={{color: 'black'}} align = "center">Checkout</Typography>
      <h1></h1>
      <hr />
      <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1 align = "center">Enter your credit card information</h1>
        <Box sx={{ mt: -1, ml : 29}}>
          <TextField label="Cardholder Name" value={name} onChange={handleNameChange} />
        </Box>
        <Box sx={{ mt: 2, ml : 29}}>
          <TextField label="Cardholder Number" value={number} type="number" onChange={handleNumberChange} />
        </Box>
        <Box sx={{ mt: 2, ml : 29}}>
          <TextField label="MMYY" value={mmyy} onChange={handleMmyyChange} type="number" maxLength = {4}/>
          <p1> </p1>
          <TextField sx = {{ ml : 2 }}label="CVV" value={cvv} onChange={handleCvvChange} type="number"/>
          <Typography  variant="subtitle2" color = "secondary">{errorMessage}</Typography>
        </Box>
        <Box sx={{ mt: 3, ml : 28}}>
          <h1>Order Total</h1>
          <Typography variant="h5">{tripInfo.price}$</Typography>
          <Button variant="contained" color="secondary" style={{ marginTop: 7 }} onClick={handleSubmit}>Submit</Button>
          <Typography variant="h6" style = {{color : "green"}}>{successMessage}</Typography>
        </Box>
        </Grid>
        <Grid item xs={4}>
          <h1>Order Summary</h1>
          <Typography variant="subtitle1" >1x</Typography>
          <Typography variant="subtitle1" >{tripInfo.origin}-{tripInfo.destination}</Typography>
          <Typography variant="subtitle1">{tripInfo.departure_time}-{tripInfo.arrival_time}</Typography>
          <Typography variant="subtitle1">{tripInfo.trip_date}</Typography>
          <hr />
          <Typography variant="h5">Total Price : {tripInfo.price}$</Typography>
        </Grid>
      </Grid>
      </div>
    </Box>
  )
}

export default Payment;