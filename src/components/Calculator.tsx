import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import CalculatorInput, { CalculationDetails } from './CalculatorInput';
import CalculatorGraph from './CalculatorGraph';
import CalculatorItems from './CalculatorItems';
import CreatabilityForm from './CreatabilityForm';
import * as db from '../data/db';


const Calculator = () => {
    const [items, setItems] = useState<CalculationDetails[]>([])
    const [lineItems, setLineItems] = useState('')

    const handleSelect = (details: CalculationDetails) => {
        setItems([...items, details])
    }

    const handleDelete = (id: number) => {
        setItems(items.filter((item) => item.category.id !== id))
    }

    const handleUpdate = (id: number, updatedItem: CalculationDetails) => {
        let newItems: CalculationDetails[] = []

        for (const element of items) {
            // if item has target id, push the updated item
            if (element.category.id === id) {
                newItems.push(updatedItem)
            } else {
                newItems.push(element)
            }
        }

        setItems(newItems)
    }

    const [open, setOpen] = useState(false)

    const showForm = () => { 
        setLineItems('')
        items.forEach((item) => {
            setLineItems((lineItems) => lineItems + `${item.category.name}: ${item.value} ${item.modifier.label}\n`)
        })
        setOpen(true)
    }

    return (
        open ? (
            <CreatabilityForm lineItems={ lineItems } />
        ) : <div style={{ height: '100%', width: '100%', padding: '1rem', border: '1px dashed #cde0ec', borderRadius: '4px', boxSizing: 'border-box'}}>
            <Stack sx={{ height: '100%' }} alignItems="center">
                <CalculatorInput onSelect={handleSelect} />
                <Stack mt={2} sx={{ flex: 1, overflowY: 'auto', width: '100%' }}>
                    <CalculatorItems items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
                    {(items.length > 0) && <Button
                        variant="contained"
                        size="large"
                        onClick={showForm}
                    >
                        Send Me The Results
                    </Button>}
                </Stack>
                <CalculatorGraph items={items} />
            </Stack>
        </div>
    );
}

function CalculatorWrapper() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        db.init().then(() => {
            setLoading(false)
        })
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Calculator/>
    );
}

export default CalculatorWrapper;