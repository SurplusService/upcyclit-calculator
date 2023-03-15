import React, { useState } from 'react';
import {
    SelectChangeEvent, Autocomplete, TextField,
    FormControl, InputLabel,
    Select, MenuItem, Button, Grid
} from '@mui/material';


interface OptionItem {
    id: number;
    name: string;
    industry: string;
    type: string;
    carbon_footprint: number;
    energy_consumption: number;
    methane_production: number;
}

interface ModifierItem {
    id: number;
    name: string;
    label: string;
}

const categories: OptionItem[] = require('../../data/categories.json');
export const modifiers: ModifierItem[] = [
    { id: 0, name: "Quantity", label: 'x', },
    { id: 1, name: "Weight (lbs)", label: 'lbs' },
    { id: 2, name: "Gaylords", label: 'gaylords'},
]

export interface CalculationDetails {
    category: OptionItem;
    modifier: ModifierItem;
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
    const [modifier, setModifier] = useState(modifiers[0]);
    const [value, setValue] = useState(0);

    const handleAutocompleteChange = (e: any, value: OptionItem | null) => {
        setCategory(value?.id || 0)
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
    }
    
    const handleSelectChange = (e: SelectChangeEvent<number>) => {
        // TODO: should we set value to 0 here?
        setModifier(modifiers[Number(e.target.value)])
    }

    const handleAddToCalculation = () => {
        const selectedCategory = categories.find((item: OptionItem) => item.id === category);
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
        <Grid container spacing={2} maxWidth="sm">
            <Grid item xs={12}>
                <Autocomplete
                    id="unit-autocomplete"
                    options={categories}
                    groupBy={(option: OptionItem) => option.industry}
                    getOptionLabel={(option: OptionItem) => option.name}
                    onChange={handleAutocompleteChange}
                    renderInput={(params) => <TextField {...params} label="UpCycleable Units" />}
                />
            </Grid>
            <Grid item sm={3} xs={6}>
                <TextField
                    id="modifier-number"
                    label={modifier.name}
                    type="number"
                    onChange={handleValueChange}
                    value={value}
                    sx={sxFill}
                />
            </Grid>
            <Grid item sm={3} xs={6}>
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
                        {modifiers.map((modifier: ModifierItem) => (
                            <MenuItem value={modifier.id} key={modifier.id}>{modifier.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Button variant="contained" size="large" onClick={handleAddToCalculation} sx={sxFill}>Add to Calculation</Button>
            </Grid>
        </Grid>
    );
}

export default CalculatorInput;