import React, { useState } from 'react';
import {
  SelectChangeEvent, Autocomplete, TextField,
  FormControl, InputLabel,
  Select, MenuItem, Button, Grid,
  Alert, Snackbar
} from '@mui/material';

import * as db from '../data/db';

export interface CalculationDetails {    category: db.OptionItem;
  modifier: db.ModifierItem;
  value: number;
}

const sxFill = { width: '100%', height: '100%' }

interface CalculatorInputProps {
  categories: db.OptionItem[];

/**
 * Callback function to handle the selection of a category with modifier.
 */
onSelect: ((details: CalculationDetails) => void)
}


const CalculatorInput = (props: CalculatorInputProps) => {
  const [category, setCategory] = useState(0);
  const [modifier, setModifier] = useState(db.getModifier(0));
  const [value, setValue] = useState(0);
  const [errorNoCategory, setErrorNoCategory] = useState(false);
  const [errorNoValue, setErrorNoValue] = useState(false);

  // This is a hack to reset the autocomplete field
  const [autocompleteKey, setAutocompleteKey] = useState(Math.random());

    const handleAutocompleteChange = (e: any, value: db.OptionItem | null) => {
      setCategory(value?.id || 0)
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value.replace(/-/g, '') || 0);
      setValue(Number(e.target.value))
      if (newValue === 0) {
        setTimeout(() => {
          e.target.select()
        }, 0);
      }
    }

    const handleSelectChange = (e: SelectChangeEvent<number>) => {
      setModifier(db.getModifier(Number(e.target.value)))
    }

  const handleAddToCalculation = () => {
      if (category === 0) {
        setErrorNoCategory(true)
        return
      }
    
      const selectedCategory = db.getCategory(category);

      if (value === 0) {
        setErrorNoValue(true)
        return
      }

    if (selectedCategory) {
      setCategory(0)
      setAutocompleteKey(Math.random())
      props.onSelect({
          category: selectedCategory,
          modifier: modifier,
          value: value,
      });
      } else {
          // TODO: ask user to place a selection
      }
    }

  return (
    <>
      <Snackbar
        open={errorNoCategory}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          if (reason === 'escapeKeyDown') {
            event.preventDefault();
          }
          setErrorNoCategory(false)
        }}
        autoHideDuration={5000}
      >
        <Alert severity="error" sx={{ width: '100%', margin: '.5rem' }}>Please select a category.</Alert>
      </Snackbar>
      <Snackbar
        open={errorNoValue}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          if (reason === 'escapeKeyDown') {
            event.preventDefault();
          }
          setErrorNoValue(false)
        }}
        autoHideDuration={5000}
      >
        <Alert severity="error" sx={{ width: '100%', margin: '.5rem' }}>Please enter a value.</Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={7}>
          <Autocomplete
            key={autocompleteKey}
            id="unit-autocomplete"
            options={props.categories}
            groupBy={option => option.industry}
            getOptionLabel={option => option.name}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField {...params} label="UpcyclIT® Unit" />
            )}
          />
        </Grid>
        <Grid item sm={3} xs={5}>
          <FormControl fullWidth>
            <InputLabel id="units-label">Units</InputLabel>
            <Select
              id="units-select-label"
              labelId="units-label"
              value={modifier.id}
              label="Units"
              onChange={handleSelectChange}
              sx={sxFill}
            >
              {db.getModifiers().map(modifier => (
                <MenuItem value={modifier.id} key={modifier.id}>
                  {modifier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={3} xs={5}>
          <TextField
            id="modifier-number"
            label={modifier.name}
            type="number"
            InputProps={{
              inputProps: {min:0}
            }}
            onFocus={event => {
              const target = event.target;
              setTimeout(() => target.select(), 0);
            }}
            onChange={handleValueChange}
            value={value}
            sx={sxFill}
          />
        </Grid>
        <Grid item sm={3} xs={7}>
          <Button
            variant="contained"
            size="large"
            onClick={handleAddToCalculation}
            sx={sxFill}
          >
            Add to Calculation
          </Button>
        </Grid>
      </Grid>
      </>
    );
}

export default CalculatorInput;