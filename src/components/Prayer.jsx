import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Prayer({salatName, salatTime, salatImg}) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={salatImg}
        // "fajr.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {salatName}
        </Typography>
        <Typography variant="h2" sx={{ color: 'text.secondary' }}>
          {salatTime}
          </Typography>
      </CardContent>
    </Card>
  )
}
