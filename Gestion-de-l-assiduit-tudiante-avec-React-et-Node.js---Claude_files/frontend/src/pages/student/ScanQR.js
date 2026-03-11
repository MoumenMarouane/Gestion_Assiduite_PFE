import React, { useState } from 'react';
import {
  Container, Paper, Typography, Box, Button, TextField,
  Card, CardContent, Grid, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import { 
  AssignmentInd as AttendanceIcon, 
  CheckCircle, 
  Cancel, 
  ContentPaste as PasteIcon 
} from '@mui/icons-material';

const ScanQR = () => {
  const [qrCode, setQrCode] = useState('');
  const [message, setMessage] = useState('');
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  
  // Historique factice pour l'exemple
  const [scanHistory, setScanHistory] = useState([
    { cours: 'Base de données', date: '2024-01-10T08:30:00', statut: 'PRESENT' },
    { cours: 'Algorithmique', date: '2024-01-09T10:00:00', statut: 'RETARD' }
  ]);

  const handleValidation = () => {
    // Nettoyage du code (enlève les espaces inutiles)
    const cleanedCode = qrCode.trim();

    if (!cleanedCode) {
      setMessage('Le champ est vide. Veuillez coller le code affiché par le professeur.');
      setErrorDialog(true);
      return;
    }

    // Ici, vous pourriez ajouter une vérification réelle (ex: longueur ou format)
    if (cleanedCode.length < 4) {
      setMessage('Le code saisi semble trop court ou invalide.');
      setErrorDialog(true);
      return;
    }
    
    // Simulation d'un enregistrement réussi
    const newScan = {
      cours: 'Cours Actuel', // Idéalement récupéré via le code
      date: new Date().toISOString(),
      statut: 'PRESENT'
    };
    
    setScanHistory([newScan, ...scanHistory]);
    setSuccessDialog(true);
    setQrCode(''); // On vide le champ après succès
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' - ' + 
           date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  const getStatusColor = (status) => {
    const colors = { 'PRESENT': 'success', 'RETARD': 'warning', 'ABSENT': 'error' };
    return colors[status] || 'info';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
        Validation de Présence
      </Typography>
      
      <Grid container spacing={3}>
        {/* SECTION SAISIE DU CODE */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                <AttendanceIcon sx={{ fontSize: 80, color: 'primary.main', mb: 1 }} />
                
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Enregistrer ma présence
                </Typography>
                
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
                  Collez ci-dessous le code aléatoire généré par le professeur.
                </Typography>
                
                <TextField
                  fullWidth
                  label="Code de présence"
                  variant="filled"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  placeholder="Ex: A7k9L2..."
                  InputProps={{
                    startAdornment: <PasteIcon sx={{ color: 'action.active', mr: 1 }} />,
                  }}
                  sx={{ 
                    mb: 2,
                    '& .MuiInputBase-input': { 
                      fontSize: '1.5rem', 
                      textAlign: 'center', 
                      letterSpacing: 2,
                      fontWeight: 'bold',
                      textTransform: 'uppercase' // Force majuscules visuellement si besoin
                    } 
                  }}
                />
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleValidation}
                  disabled={!qrCode.trim()}
                  sx={{ 
                    py: 1.5, 
                    fontSize: '1.1rem',
                    borderRadius: 2,
                    boxShadow: 3
                  }}
                >
                  Valider ma présence
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* SECTION HISTORIQUE */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                Historique récent
              </Typography>
              
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                {scanHistory.map((scan, index) => (
                  <Paper 
                    key={index} 
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      mb: 1.5, 
                      bgcolor: '#f8f9fa',
                      borderLeft: `5px solid`,
                      borderColor: `${getStatusColor(scan.statut)}.main`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">{scan.cours}</Typography>
                      <Typography variant="caption" color="textSecondary">{formatDate(scan.date)}</Typography>
                    </Box>
                    <Chip label={scan.statut} color={getStatusColor(scan.statut)} size="small" />
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* DIALOGUES DE RETOUR */}
      <Dialog open={successDialog} onClose={() => setSuccessDialog(false)}>
        <DialogTitle sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
          <Box display="flex" alignItems="center">
            <CheckCircle sx={{ mr: 1 }} /> Présence validée !
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>Votre présence a été enregistrée avec succès pour ce cours.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="success" variant="contained">Parfait</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorDialog} onClose={() => setErrorDialog(false)}>
        <DialogTitle sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
          <Box display="flex" alignItems="center">
            <Cancel sx={{ mr: 1 }} /> Erreur
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialog(false)} color="error">Réessayer</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ScanQR;