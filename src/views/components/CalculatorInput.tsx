import React from 'react';
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
    Energy_consumption: number;
    methane_production: number;
}

interface ModifierItem {
    id: number;
    name: string;
}

const catagories: OptionItem[] = require('../../data/catagories.json');
const modifiers: ModifierItem[] = [
    { id: 0, name: "Quantity" },
    { id: 1, name: "Weight (lbs)" },
    { id: 2, name: "Gaylords" },
]

type CalculatorInputState = {
    category: number;
    modifier: ModifierItem;
    value: number;
}

interface CalculationDetails {
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

class CalculatorInput extends React.Component<CalculatorInputProps, CalculatorInputState> {
    state: CalculatorInputState = {
        category: 0,
        value: 0,
        modifier: modifiers[0],
    }
    
    handleAutocompleteChange = (e: any, value: OptionItem | null) => {
        this.setState({
            category: value?.id || 0,
        });
    }

    handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: Number(e.target.value),
        });
    }
    
    handleSelectChange = (e: SelectChangeEvent<number>) => {
        // TODO: should we set value to 0 here?
        this.setState({
            modifier: modifiers[Number(e.target.value)],
        });
    }

    handleAddToCalculation = () => {
        const category = catagories.find((item: OptionItem) => item.id === this.state.category);
        if (category) {
            // TODO: make sure value is positive
            //       make sure there is a selection
            this.props.onSelect({
                category: category,
                modifier: this.state.modifier,
                value: this.state.value,
            });
        } else {
            // TODO: ask user to place a selection
        }
    }

    render() {
        return (
            <Grid container spacing={2} maxWidth="sm">
                <Grid item xs={12}>
                    <Autocomplete
                        id="unit-autocomplete"
                        options={catagories}
                        groupBy={(option: OptionItem) => option.industry}
                        getOptionLabel={(option: OptionItem) => option.name}
                        onChange={this.handleAutocompleteChange}
                        renderInput={(params) => <TextField {...params} label="UpCycleable Units" />}
                    />
                </Grid>
                <Grid item sm={3} xs={6}>
                    <TextField
                        id="modifier-number"
                        label={this.state.modifier.name}
                        type="number"
                        onChange={this.handleValueChange}
                        value={this.state.value}
                        sx={sxFill}
                    />
                </Grid>
                <Grid item sm={3} xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="units-label">Units</InputLabel>
                        <Select
                            id="units-select-label"
                            labelId="units-label"
                            value={this.state.modifier.id}
                            label="Units"
                            onChange={this.handleSelectChange}
                            sx={sxFill}
                        >
                            {modifiers.map((modifier: ModifierItem) => (
                                <MenuItem value={modifier.id} key={modifier.id}>{modifier.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Button variant="contained" size="large" onClick={this.handleAddToCalculation} sx={sxFill}>Add to Calculation</Button>
                </Grid>
            </Grid>
        );
    }
}

export default CalculatorInput;