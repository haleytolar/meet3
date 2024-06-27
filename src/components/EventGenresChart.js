import { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

const EventGenresChart = ({events}) =>{
    const [data, setData] = useState([]);

    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const colors = ['rgb(227, 115, 131)', 'rgb(224, 191, 184)', 'rgb(159, 43, 104)', 'rgb(255, 127, 80)', 'rgb(169, 92, 104)'];

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);
    
    const getData = () => {
        const data = genres.map((genre, index) => {
        const filteredEvents = events.filter(event => event.summary.includes(genre))
        return {
            name: genre,
            value: filteredEvents.length,
            color: colors[index]
          }
        })
        return data;
      };  
    
      const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, innerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return percent ? (
          <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null;
      };


      return (
        <ResponsiveContainer width="99%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              fill="rgb(227, 11, 92)"
              labelLine={false}
              label = {renderCustomizedLabel}
              outerRadius={120}           
            >
             {
                data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                }
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    export default EventGenresChart