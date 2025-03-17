import {useEffect} from 'react'
import { Button, Typography, Box, Alert, Card, CardContent, CardActions } from "@mui/material";

export default function TableCard() {
  const bull = <span style={{ margin: '0 2px' }}>•</span>;
  useEffect(() => {
    console.log("TableCard montado");
}, []);

  return (
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small">Learn More</Button>
    </CardActions>
</Card>
  )
}
