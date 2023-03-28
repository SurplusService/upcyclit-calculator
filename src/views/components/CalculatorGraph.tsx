import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts"
import { CalculationDetails } from "./CalculatorInput"
import { Grid, Typography, IconButton, Box } from "@mui/material"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { useState } from "react"

/**COLORS is the colors for each category. The index of the array is the category id. */
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/**CONVERSIONS is the conversion factors for each modifier. The index of the array is the modifier id. 
 * For example, the conversion factor for the Quantity modifier is 1.
 * For gaylords, the conversion factor is 2.5.
 * For weight, the conversion factor is 0.8.
*/
const CONVERSIONS = [1, 0.8, 2.5]

/**CalculatorGraphProps is the props for the CalculatorGraph component. */
interface CalculatorGraphProps {
    /**
     * Callback function to handle the selection of a category with modifier.
     * @param details The details of the calculation.
     */
    items: CalculationDetails[]
}

/**PieData is models a data for the pie chart. */
interface PieData {
    name: string
    value: number
}

/**CarbonPieChartProps is the props for the CarbonPieChart component. */
interface CustomPieChartProps {
    entries: PieData[]
}

/**CarbonPieChart is a customizable template for pie chart. */
const CustomPieChart = (props: CustomPieChartProps) => {
    return (
        <Grid item xs={12}>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie dataKey="value" data={props.entries} fill="#82ca9d">
                        {props.entries.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Grid>
    )
}

const round = (num: number) => Math.round(num * 100) / 100

const CalculatorGraph = (props: CalculatorGraphProps) => {
    const [selectedChart, setSelectedChart] = useState(0)

    // convert all items to the same unit of measurement
    const formattedItems = props.items.map((item) => {
        return {
            category: item.category,
            value: item.value * CONVERSIONS[item.modifier.id]
        }
    })

    interface ChartData {
        name: string
        total: number
        entries: PieData[]
    }

    /**charts is the array of information needed for each chart. */
    const charts: ChartData[] = [
        {
            name: "Carbon Footprint",
            total: formattedItems.reduce((total, item) => {
                return total + item.value * item.category.carbon_footprint
            }, 0),
            entries: formattedItems.map((item) => {
                return {
                    name: item.category.name,
                    value: round(item.value * item.category.carbon_footprint)
                }
            })
        },
        {
            name: "Energy Consumption",
            total: formattedItems.reduce((total, item) => {
                return total + item.value * item.category.energy_consumption
            }, 0),
            entries: formattedItems.map((item) => {
                return {
                    name: item.category.name,
                    value: round(item.value * item.category.energy_consumption)
                }
            })
        },
        {
            name: "Methane Production",
            total: formattedItems.reduce((total, item) => {
                return total + item.value * item.category.methane_production
            }, 0),
            entries: formattedItems.map((item) => {
                return {
                    name: item.category.name,
                    value: round(item.value * item.category.methane_production)
                }
            })
        }
    ]

    /**handleBackButton is the callback function for the back button. It switched to previous chart */
    const handleBackButton = () => {
        if (selectedChart > 0) {
            setSelectedChart(selectedChart - 1)
        }
    }

    /**handleNextButton is the callback function for the next button. It switches to next chart */
    const handleNextButton = () => {
        if (selectedChart < charts.length - 1) {
            setSelectedChart(selectedChart + 1)
        }
    }

    return (
        <div>
            <Grid container spacing={0} maxWidth="sm" mt={2}>
                {props.items.length > 0 ?
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}} alignContent="center">
                            <IconButton aria-label="back" onClick={handleBackButton} disabled={selectedChart-1 < 0}>
                                <ArrowBackIosNew fontSize="small" />
                            </IconButton>

                            <Typography variant="h6" color="text.secondary">
                                Total {charts[selectedChart].name}: {charts[selectedChart].total.toFixed(2)} 
                            </Typography>
                            
                            <IconButton aria-label="next" onClick={handleNextButton} disabled={selectedChart+1 >= charts.length}>
                                <ArrowForwardIos fontSize="small" />
                            </IconButton>
                        </Box>
                    </Grid>
                    :
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.secondary" align="center">
                            Enter some items to see the carbon footprint.
                        </Typography>
                    </Grid>
                }
                <Grid item xs={12}>
                    <CustomPieChart entries={charts[selectedChart].entries} />
                </Grid>
            </Grid>
        </div>
    )
}

export default CalculatorGraph