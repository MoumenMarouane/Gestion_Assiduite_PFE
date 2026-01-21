import React from 'react';
import { 
  Container, Typography, Box, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Avatar, Chip 
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const GradeAdaptation = () => {
  const eleves = [
    { id: 1, nom: 'Badr Zouine', note: 14.5, assiduite: 95, modif: '+1.5', status: 'up' },
    { id: 2, nom: 'Marouane Moumen', note: 12.0, assiduite: 60, modif: '-2.0', status: 'down' },
    { id: 3, nom: 'John Doe', note: 15.0, assiduite: 88, modif: '+0.5', status: 'up' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Notes & Adaptation IA
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Étudiant</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Note Initiale</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Assiduité</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Adaptation IA</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Note Finale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eleves.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>{row.nom.charAt(0)}</Avatar>
                    {row.nom}
                  </Box>
                </TableCell>
                <TableCell align="center">{row.note} / 20</TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontWeight: 'bold', color: row.assiduite > 80 ? '#4caf50' : '#f44336' }}>
                    {row.assiduite}%
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: row.status === 'up' ? '#4caf50' : '#f44336' }}>
                    {row.status === 'up' ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                    <Typography sx={{ ml: 1, fontWeight: 'bold' }}>{row.modif}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={`${(row.note + parseFloat(row.modif)).toFixed(1)} / 20`} 
                    variant="outlined" 
                    sx={{ fontWeight: 'bold', fontSize: '1rem' }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GradeAdaptation;