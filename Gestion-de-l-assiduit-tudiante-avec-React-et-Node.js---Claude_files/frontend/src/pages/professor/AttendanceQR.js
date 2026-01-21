import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const AttendanceQR = () => {
  const [sessionData, setSessionData] = useState('');
  const [qrValue, setQrValue] = useState('');

  const generateQRCode = () => {
    // On crée un objet contenant les infos de la session et un timestamp
    // pour éviter que les élèves ne réutilisent un vieux code.
    const data = {
      course: sessionData,
      timestamp: Date.now(),
      teacherId: "PROF_001" // Id statique pour l'exemple
    };
    
    setQrValue(JSON.stringify(data));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Générateur de Présence
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <TextField
            fullWidth
            label="Nom du cours ou ID de session"
            variant="outlined"
            value={sessionData}
            onChange={(e) => setSessionData(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={generateQRCode}
            disabled={!sessionData}
          >
            Générer le Code QR
          </Button>
        </Paper>

        {qrValue && (
          <Box sx={{ mt: 4, p: 3, bgcolor: 'white', display: 'inline-block' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Scannez pour valider la présence
            </Typography>
            
            <QRCodeCanvas 
              value={qrValue} 
              size={256}
              level={"H"} // Niveau de correction d'erreur élevé
              includeMargin={true}
            />
            
            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
              Données encodées : {sessionData}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AttendanceQR;