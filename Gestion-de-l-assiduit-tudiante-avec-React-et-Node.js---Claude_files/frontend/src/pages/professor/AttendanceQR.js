import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const AttendanceQR = () => {
  const [sessionData, setSessionData] = useState('');
  const [qrValue, setQrValue] = useState('');

  // Génère uniquement une clé courte style UG3WG
  const generateRandomCode = (length = 5) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generateQRCode = () => {
    // On génère la clé courte uniquement
    const codeSimple = generateRandomCode(5); 
    setQrValue(codeSimple);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Générateur de Présence
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <TextField
            fullWidth
            label="Nom du cours"
            variant="outlined"
            value={sessionData}
            onChange={(e) => setSessionData(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Button 
            variant="contained" 
            fullWidth 
            onClick={generateQRCode}
            disabled={!sessionData.trim()}
            size="large"
          >
            Générer le Code
          </Button>
        </Paper>

        {qrValue && (
          <Box sx={{ mt: 4, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 2 }}>
            <QRCodeCanvas value={qrValue} size={256} level={"H"} includeMargin={true} />
            
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary">Code à transmettre :</Typography>
              <Typography variant="h1" sx={{ fontWeight: 900, color: '#1a237e', letterSpacing: 5 }}>
                {qrValue}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AttendanceQR;