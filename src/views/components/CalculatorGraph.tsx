import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts"
import { CalculationDetails } from "./CalculatorInput"
import { Grid } from "@mui/material"

interface CalculatorGraphProps {
    /**
     * Callback function to handle the selection of a category with modifier.
     * @param details The details of the calculation.
     */
    items: CalculationDetails[]
}

interface PieData {
    name: string
    value: number
}

const CalculatorGraph = (props: CalculatorGraphProps) => {
    const pieData: PieData[] = props.items.map((item) => {
        return {
            name: item.category.name,
            value: item.value
        }
    })

    return (
        <Grid container spacing={2} maxWidth="sm">
            {props.items.length > 0 ?
            <Grid item xs={12}>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie dataKey="value" data={pieData} innerRadius="40%" fill="#82ca9d" />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Grid>
            : 
            <div>
                <h2>
                    Add an UpCycleable item to the calculator to see a graph.
                </h2>
            </div>
            }
        </Grid>
    )
}

export default CalculatorGraph