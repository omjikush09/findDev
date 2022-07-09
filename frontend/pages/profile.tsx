import {NextPage} from "next"
import React from "react";
import { Container,Typography,Grid,TextField,MenuItem,Button} from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from "../styles/Profile.module.scss"
const Profile=()=>{
    
    const Input = styled('input')({
        display: 'none',
      });
    const currencies = [
        {
          value: 'Working',
          label: 'Working',
        },
        {
          value: 'Student',
          label: 'Student',
        }
      ];


    const [currency, setCurrency] = React.useState("Student");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  } ;


    return (
        <>
        <Container maxWidth={false} className={styles.container}>
    <div  className={styles.container_small}>
        <Typography variant='h2' component="h2" align='center'>
           FIND DEV
        </Typography>
      <Grid container >
      {/* <Grid item xs={6} >
ddfsd
        </Grid> */}
      <Grid item xs={12} >
        <div className={styles.test}>

      <Typography variant='body2' component="span" align='center'>
          Name
        </Typography>
        <TextField id="outlined-basic" label="Name" variant="outlined" className={styles.form_input} size="small"  name="name" />
        </div>
        <br></br>
        <div className={styles.test}>
        <Typography variant='body2' component="span" align='center'>
            Profesion
        </Typography>
        <TextField
        size="small"
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
         >
            {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        

        </div>
        <div className={styles.test}>
        <Typography variant='body2' component="span" align='center'>
        Discription
        </Typography>
        <TextField id="outlined-basic" label="Description" placeholder="he" variant="outlined" className={styles.form_input} multiline  name="name" />
        
        </div>
        <div className={styles.test}>
        <Typography variant='body2' component="span" align='center'>
            Profile Image
        </Typography>
        <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
         </label>
        </div>
            <div>
                
            </div>
         </Grid>
        
          </Grid>
      </div>
        </Container>
        </>
    )
}

export default Profile;
