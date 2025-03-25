import { Card, CardContent, Stack, Typography } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import React from 'react'

export default function EvaluationDayCard() {
  return (
    <Card variant="outlined" sx={{ width: '100%', height:'100%', justifyItems:'center' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Rendimiento actual
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="h4" component="p">
            ¡Excelente trabajo!
          </Typography>
          <TagFacesIcon fontSize='large' color='success'/>
        </Stack>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontSize:13}}>
          Tu venta subió el 5% al día anterior
        </Typography>
      </CardContent>
    </Card>
  );
}
