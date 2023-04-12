import React, { useState } from 'react';
import {
    SelectChangeEvent, Autocomplete, TextField,
    FormControl, InputLabel,
    Select, MenuItem, Button, Grid, Popover, Typography
} from '@mui/material';

import * as db from '../data/db';

export interface CalculationDetails {
    category: db.OptionItem;
    modifier: db.ModifierItem;
    value: number;
}

const sxFill = { width: '100%', height: '100%' }

interface CalculatorInputProps {
  /**
   * Callback function to handle the selection of a category with modifier.
   */
  onSelect: ((details: CalculationDetails) => void)
}


const CalculatorInput = (props: CalculatorInputProps) => {
    const [category, setCategory] = useState(0);
    const [modifier, setModifier] = useState(db.getModifier(0));
    const [value, setValue] = useState(0);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openAnchor = Boolean(anchorEl);
    const id = openAnchor ? 'simple-popover' : undefined;


    const handleAutocompleteChange = (e: any, value: db.OptionItem | null) => {
      setCategory(value?.id || 0)
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value))
    }

    const handleSelectChange = (e: SelectChangeEvent<number>) => {
      setModifier(db.getModifier(Number(e.target.value)))
    }

    const handleAddToCalculation = () => {
      const selectedCategory = db.getCategory(category);
        if (selectedCategory) {
            // TODO: make sure value is positive
            //       make sure there is a selection
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
      <Grid container spacing={2}>
        <Grid item sm={3} xs={7}>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            sx={sxFill}
          >
            HELP
          </Button>
          <Popover
            id={id}
            open={openAnchor}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>Instruction of the calculator comes here.</Typography>
          </Popover>
        </Grid>
        <Grid item sm={3} xs={7}>
          <Autocomplete
            id="unit-autocomplete"
            options={db.getCategories()}
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
    );
}

export default CalculatorInput;