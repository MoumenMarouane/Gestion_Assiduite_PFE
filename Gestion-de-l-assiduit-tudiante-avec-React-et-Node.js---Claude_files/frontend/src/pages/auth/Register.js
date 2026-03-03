import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Link, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Animation variants for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container component="main" maxWidth="xs">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Paper
            elevation={20}
            sx={{
              padding: 4,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            <Typography component="h1" variant="h4" align="center" fontWeight="800" sx={{ mb: 3, color: '#764ba2' }}>
              Rejoignez-nous
            </Typography>

            <Box component="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemVariants}>
                    <TextField name="prenom" fullWidth label="Prénom" variant="filled" />
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemVariants}>
                    <TextField name="nom" fullWidth label="Nom" variant="filled" />
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <motion.div variants={itemVariants}>
                    <TextField name="email" fullWidth label="Email" variant="filled" />
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <motion.div variants={itemVariants}>
                    <TextField name="password" fullWidth label="Mot de passe" type="password" variant="filled" />
                  </motion.div>
                </Grid>
              </Grid>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 4, mb: 2, py: 1.5,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    boxShadow: '0 4px 15px rgba(118, 75, 162, 0.4)'
                  }}
                >
                  S'inscrire
                </Button>
              </motion.div>

              <Box textAlign="center">
                <Link href="/login" variant="body2" sx={{ textDecoration: 'none' }}>
                  Déjà membre? Connectez-vous ici
                </Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;