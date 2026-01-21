import React from 'react';
import { Container, Typography, Box, Paper, LinearProgress, Grid } from '@mui/material';

const MyGrades = () => {
  const grades = [
    { subject: 'Base de Données', score: 16, max: 20 },
    { subject: 'Algorithmique', score: 14.5, max: 20 },
    { subject: 'Programmation Web', score: 18, max: 20 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Mes Résultats
        </Typography>
        
        <Grid container spacing={3}>
          {grades.map((item) => (
            <Grid item xs={12} key={item.subject}>
              <Paper sx={{ p: 3 }} elevation={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">{item.subject}</Typography>
                  <Typography variant="h6" color="primary">{item.score} / {item.max}</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(item.score / item.max) * 100} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyGrades;