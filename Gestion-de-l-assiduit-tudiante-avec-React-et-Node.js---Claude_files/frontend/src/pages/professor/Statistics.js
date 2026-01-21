import React from 'react';
import { Container, Typography, Box, Grid, Paper, LinearProgress, Divider } from '@mui/material';

const Statistics = () => {
  const statsMatières = [
    { nom: 'Base de Données', taux: 92, couleur: '#4caf50' },
    { nom: 'Algorithmique', taux: 78, couleur: '#ff9800' },
    { nom: 'Programmation Web', taux: 85, couleur: '#2196f3' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Statistiques de Présence
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 4 }}>
          Analyse détaillée par module pour le semestre actuel.
        </Typography>

        <Grid container spacing={4}>
          {statsMatières.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.nom}</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.taux}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={item.taux} 
                sx={{ 
                  height: 12, 
                  borderRadius: 5, 
                  backgroundColor: '#eeeeee',
                  '& .MuiLinearProgress-bar': { backgroundColor: item.couleur }
                }} 
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 'bold' }}>12</Typography>
            <Typography variant="body2" color="textSecondary">Étudiants exemplaires</Typography>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 'bold' }}>5</Typography>
            <Typography variant="body2" color="textSecondary">Alertes absentéisme</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Statistics;