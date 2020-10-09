import React, { useEffect, useState } from 'react';
import { ComposedChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line } from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import { Typography, Select, MenuItem, InputLabel } from '@material-ui/core';
import lib from '../../lib';
import styles from './monthGraph.module.css';

function MonthGraph(props) {
  const theme = useTheme();
  const { perMonth } = props;
  // The months are the same every year
  perMonth.forEach(cont => {
    cont.month = lib.monthName[cont.date.split('-')[1]];
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonths, setSelectedMonths] = useState(0);

  useEffect(() => {
    const filtered = perMonth.filter(cont => cont.date.includes(year));
    const avg = lib.avgCount(filtered);
    filtered.forEach(cont => {
      cont.avg = avg;
    });
    setSelectedMonths(filtered);
  }, [year]);

  function renderBarLabel({ x, y, width, value }) {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill={theme.palette.text.primary}
        textAnchor='middle'
        dy={-6}
      >
        {value}
      </text>
    );
  }

  let prevXLine;
  function renderLineLabel({ x, y, index, value }) {
    if (index === Math.floor(selectedMonths.length / 2)) {
      return (
        <text
          x={(x + prevXLine) / 2}
          y={y}
          dy={-6}
          dx={-56}
          fill={theme.palette.text.primary}
        >
          Average {value}
        </text>
      );
    }
    prevXLine = x;
    return null;
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  const selectOptions = [];
  for (let year = parseInt(perMonth[0].date.split('-')[0]); year <= new Date().getFullYear(); year++) {
    selectOptions.push(<MenuItem value={year}>{year}</MenuItem>);
  }
  return (
    <>
      <div className={styles.title}>
        <Typography variant='h3'>
          Per Month
        </Typography>
        <div className={styles.selectContainer}>
          <InputLabel id='yearSelectLabel'>Year</InputLabel>
          <Select
            className='fullWidth'
            labelId='yearSelectLabel'
            id='yearSelect'
            value={year}
            onChange={handleYearChange}
          >
            {selectOptions}
          </Select>
        </div>
      </div>

      <div className='graphContainer'>
        <ResponsiveContainer width='80%' height={300}>
          <ComposedChart
            data={selectedMonths}
            margin={{ top: 30, right: 5, left: -16, bottom: 5 }}
          >
            <CartesianGrid stroke={theme.palette.secondary.main} />
            <XAxis dataKey='month' stroke={theme.palette.text.primary} />
            <YAxis
              dataKey='count'
              stroke={theme.palette.text.primary}
            />
            <Bar
              dataKey='count'
              barSize={30}
              fill={theme.palette.primary.main}
              label={renderBarLabel}
            />
            <Line dot={false} label={renderLineLabel} dataKey='avg' stroke={theme.palette.text.primary} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default MonthGraph;
