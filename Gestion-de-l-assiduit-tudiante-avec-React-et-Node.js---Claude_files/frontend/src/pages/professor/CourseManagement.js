import React from 'react';
import { 
  Container, Typography, Box, Grid, Paper, Button, 
  LinearProgress, Card, CardContent, IconButton, Divider 
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const CourseManagement = () => {
  // Données fictives orientées Mathématiques
  const courses = [
    {
      id: 1,
      titre: "Algèbre Linéaire",
      classe: "Groupe A",
      progression: 75,
      moyenne: 14.2,
      etudiants: 45,
      couleur: "#1976d2"
    },
    {
      id: 2,
      titre: "Analyse Complexe",
      classe: "Groupe B",
      progression: 40,
      moyenne: 11.5,
      etudiants: 38,
      couleur: "#4caf50"
    },
    {
      id: 3,
      titre: "Probabilités & Statistiques",
      classe: "Groupe A",
      progression: 90,
      moyenne: 15.8,
      etudiants: 45,
      couleur: "#ff9800"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header avec action */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Gestion des Cours
          </Typography>
          <Typography color="textSecondary">
            Professeur : Mohamed Badr | Mathématiques
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2 }}>
          Nouveau Cours
        </Button>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                {/* En-tête du cours */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <AvatarIcon couleur={course.couleur} />
                  <IconButton size="small"><MoreVertIcon /></IconButton>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{course.titre}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Classe : {course.classe}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Statistiques rapides */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PeopleAltIcon fontSize="small" color="action" />
                    <Typography variant="body2">{course.etudiants} élèves</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AssessmentIcon fontSize="small" color="action" />
                    <Typography variant="body2">Moy: <strong>{course.moyenne}</strong></Typography>
                  </Box>
                </Box>

                {/* Barre de progression du programme */}
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Progression du programme</Typography>
                    <Typography variant="caption">{course.progression}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progression} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 5, 
                      bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { bgcolor: course.couleur }
                    }} 
                  />
                </Box>
                
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ mt: 3, borderRadius: 2, textTransform: 'none' }}
                >
                  Voir les détails
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Petit composant interne pour l'icône colorée
const AvatarIcon = ({ couleur }) => (
  <Box sx={{ 
    width: 40, 
    height: 40, 
    borderRadius: 2, 
    bgcolor: `${couleur}15`, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <MenuBookIcon sx={{ color: couleur }} />
  </Box>
);

export default CourseManagement;