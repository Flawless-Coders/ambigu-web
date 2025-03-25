import { Box, Typography } from '@mui/material'
import React from 'react'
import PedidosChart from '../components/PedidosChart'
import CategoriasChart from '../components/CategoriasChart'
import ComidasPopularesChart from '../components/ComidasPopularesChart'
import MainGrid from '../components/MainGrid'

export const DashboardPage = () => {
  return (
    <Box sx={{p:3}}>
       {/* <Typography variant="h4">Dashboard</Typography> */}
       <MainGrid />
    </Box>
  )
}
