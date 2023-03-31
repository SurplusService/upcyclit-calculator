import React, { useState } from 'react';
import { Button, Stack, Container } from '@mui/material';
import CalculatorInput, { CalculationDetails } from './CalculatorInput';
import CalculatorGraph from './CalculatorGraph';
import CalculatorItems from './CalculatorItems';


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
            <div style={{
                height: '100%',
                width: '100%'
            }}>
                    <iframe
                        src={`https://link.creatability.com/widget/form/4AOtxQcaT0o6Enkzgi3Z?calculator_results=${encodeURIComponent(lineItems)}`}
                        style={{
                            'width': '100%',
                            'height': '100%',
                            'border': 'none',
                            'borderRadius': '4px',
                        }}
                        id="inline-4AOtxQcaT0o6Enkzgi3Z" 
                        data-layout="{'id':'INLINE'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="neverDeactivate"
                        data-deactivation-value=""
                        title="Upcyclit Calculator Results"
                        data-form-name="Upcyclit Calculator Results"
                        data-height="761"
                        data-layout-iframe-id="inline-4AOtxQcaT0o6Enkzgi3Z"
                        data-form-id="4AOtxQcaT0o6Enkzgi3Z"
                    ></iframe>
                    <script src="https://link.creatability.com/js/form_embed.js"></script>
            </div>
        ) : <Container sx={{ height: '100%', padding: 2}} maxWidth="lg" color="text.primary">
            <Stack sx={{ height: '100%' }}>
                <CalculatorInput onSelect={handleSelect} />
                <Stack mt={2} sx={{ flex: 1, overflowY: 'auto' }}>
                    <CalculatorItems items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
                    <Button
                        variant="contained"
                        size="large"
                        onClick={showForm}
                    >
                        Send Me The Results
                    </Button>
                </Stack>
                <CalculatorGraph items={items} />
            </Stack>
        </Container>
    );
}

export default Calculator;