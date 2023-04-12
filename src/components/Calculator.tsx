import React, { useState, useEffect, useRef } from 'react';
import { Button, Stack, CircularProgress, Popover, Typography } from '@mui/material';
import CalculatorInput, { CalculationDetails } from './CalculatorInput';
import CalculatorGraph, { generateChartData } from './CalculatorGraph';
import CalculatorItems from './CalculatorItems';
import CreatabilityForm from './CreatabilityForm';
import * as db from '../data/db';
import { circularProgressClasses } from '@mui/material/CircularProgress';

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//   },
// }));

const containerStyle = {
    padding: '1rem',
    height: '100%',
    width: '100%',
    border: '1px dashed #cde0ec',
    borderRadius: '4px',
    boxSizing: 'border-box',
};

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

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openAnchor = Boolean(anchorEl);
    const id = openAnchor ? 'simple-popover' : undefined;


    const [open, setOpen] = useState(false)

    const showForm = () => { 
        setLineItems(
            'Items:\n' +
            items.reduce(
                (lineItems, item) =>
                    `${lineItems}${item.category.name}: ${item.value} ${item.modifier.label}\n`,
                ''
            ) 
            + '\nResults:\n' +
            generateChartData(items).reduce(
                (lineItems, item) => `${lineItems}${item.name}: ${item.total} ${item.unit}\n`,
                ''
            )
        )
        setOpen(true)
    }

    const [overflowActive, setOverflowActive] = useState(false);

    const textRef = useRef<HTMLElement>(null);

    function isOverflowActive(el: HTMLElement) {
        return el.offsetHeight < el.scrollHeight
    }

    useEffect(() => {
        if (textRef.current && isOverflowActive(textRef.current)) {
            setOverflowActive(true);
            return;
        }

        setOverflowActive(false);
    }, [items]);

    return (
        open ? (
            <CreatabilityForm lineItems={ lineItems } />
        ) : <Stack sx={containerStyle} alignItems="center">
            

            <CalculatorInput onSelect={handleSelect} />
                <Stack
                    ref={textRef}
                    mt={2}
                    sx={{
                    flex: 1,
                    overflowY: 'auto',
                    width: '100%',
                    boxShadow: overflowActive ? 'inset 0px 20px 5px -20px #888, inset 0px -20px 5px -20px #888' : undefined,
                    borderRadius: '5px',
                }}>
                    <Button aria-describedby={id} variant="contained" onClick={handleClick}>
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
                    <CalculatorItems items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
                </Stack>
            {(items.length > 0) && <Button
                variant="contained"
                size="large"
                    onClick={showForm}
                    sx={{
                        width: '100%',
                        marginTop: '0.5rem',
                    }}
            >
                Send Me The Results
            </Button>}
            <CalculatorGraph items={items} />
        </Stack>
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
        return (
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={containerStyle}
            >
                <CircularProgress sx={{
                    [`&.${circularProgressClasses.colorPrimary}`]: {
                        color: 'rgba(0, 148, 68, 1)',
                    },
                }} />
            </Stack>
        )
    }

    return (
        <Calculator/>
    );
}

export default CalculatorWrapper;