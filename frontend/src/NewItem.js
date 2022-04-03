import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, TextField, FormLabel,
RadioGroup, Radio, FormControlLabel } from '@mui/material';

const NewItem = () => {
    
    return (
        <div>
            <FormControl>
            <InputLabel htmlFor="my-input">Item Name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">What are you selling?</FormHelperText>
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="my-input">Price</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">What's it worth?</FormHelperText>
            </FormControl>
            <FormControl>
            <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={5}
            variant="outlined"
            />
            <FormHelperText id="my-helper-text">Tell us about it.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Method of Delivery</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                    <FormControlLabel value="pick-up" control={<Radio />} label="Pick-Up" />
                    <FormControlLabel value="drop-off" control={<Radio />} label="Drop-Off" />
                    <FormControlLabel value="direct-delivery" control={<Radio />} label="Direct Delivery" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Willing to haggle?</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </div>
        
    )
}

export default NewItem;