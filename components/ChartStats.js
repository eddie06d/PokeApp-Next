import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartStats({ stats, color }) {
    const options = {
        responsive: true
    };

    const labels = ['Stamina', 'Ataque', 'Defensa'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Stats',
            data: stats,
            backgroundColor: color,
          },
        ],
    };

    return (
        <Bar 
            data={ data }
            options={ options }
        />
    )
}