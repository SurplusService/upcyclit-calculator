import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts"
import { CalculationDetails } from "./CalculatorInput"
import { Grid, Typography } from "@mui/material"

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

/**COLORS is the colors for each category. The index of the array is the category id. */
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/**CONVERSIONS is the conversion factors for each modifier. The index of the array is the modifier id. 
 * For example, the conversion factor for the Quantity modifier is 1.
 * For gaylords, the conversion factor is 2.5.
 * For weight, the conversion factor is 0.8.
*/
const CONVERSIONS = [1, 0.8, 2.5]

const CalculatorGraph = (props: CalculatorGraphProps) => {
    // convert all items to the same unit of measurement
    const formattedItems = props.items.map((item) => {
        return {
            category: item.category,
            value: item.value * CONVERSIONS[item.modifier.id]
        }
    })

    // Calculate the total carbon footprint, energy consumption, and methane production.
    const totalCarbonFootprint = formattedItems.reduce((total, item) => {
        return total + item.value * item.category.carbon_footprint
    }, 0)

    // Calculate the carbon impact for each category.
    const carbonImpact: PieData[] = formattedItems.map((item) => {
        return {
            name: item.category.name,
            value: item.value * item.category.carbon_footprint
        }
    })

    return (
        <div>
            <Grid container spacing={2} maxWidth="sm" mt={0}>
                {props.items.length > 0 ?
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="text.secondary" align="center">
                                Total Carbon Footprint: {totalCarbonFootprint}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie dataKey="value" data={carbonImpact} innerRadius="40%" fill="#82ca9d">
                                        {carbonImpact.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Grid>
                    </Grid>
                    :

                    <Grid item xs={12}>
                        <Typography variant="h6" color="text.secondary" align="center">
                            Enter some values to see a graph.
                        </Typography>
                    </Grid>
                }
            </Grid>
        </div>
    )
}

export default CalculatorGraph