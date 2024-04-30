import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  PieElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph(props){
    const graphData =()=>{
        const array = []
        for(let i =0; i<12;i++){
            array[i] = props.posts
            .filter(post => new Date(post.date).getMonth() === i)
            .reduce((total, post) => total + post.price, 0);
        }
        return arr;
    }
}