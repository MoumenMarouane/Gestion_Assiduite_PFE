import React from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Grid, Card, CardContent } from '@mui/material';

const MyAbsences = () => {
  const absences = [
    { id: 1, date: '2026-01-15', cours: 'Base de Données', type: 'CM', statut: 'Justifiée' },
    { id: 2, date: '2026-01-10', cours: 'Algorithmique', type: 'TP', statut: 'Non Justifiée' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Mes Absences
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#f5f5f5' }}>
              <CardContent>
                <Typography color="textSecondary">Taux de Présence</Typography>
                <Typography variant="h4">92%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#fff4e5' }}>
              <CardContent>
                <Typography color="textSecondary">Total Absences</Typography>
                <Typography variant="h4" color="error">2</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Cours</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Statut</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absences.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.cours}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.statut} 
                      color={row.statut === 'Justifiée' ? 'success' : 'error'} 
                      size="small" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default MyAbsences;