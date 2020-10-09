import React from 'react';
import { ComposedChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line } from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import lib from '../../lib';

function YearGraph(props) {
  const theme = useTheme();
  const { perYear } = props;

  const avg = lib.avgCount(perYear);
  perYear.forEach(cont => {
    cont.avg = avg;
  });

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
    if (index === Math.floor(perYear.length / 2)) {
      return (
        <text
          x={(perYear.length % 2) ? x : (x + prevXLine) / 2}
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

  return (
    <>
      <Typography variant='h3'>
        Per year
      </Typography>
      <div className='graphContainer'>
        <ResponsiveContainer width='80%' height={300}>
          <ComposedChart
            data={perYear}
            margin={{ top: 30, right: 5, left: -16, bottom: 5 }}
          >
            <CartesianGrid stroke={theme.palette.secondary.main} />
            <XAxis dataKey='date' stroke={theme.palette.text.primary} />
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

export default YearGraph;
