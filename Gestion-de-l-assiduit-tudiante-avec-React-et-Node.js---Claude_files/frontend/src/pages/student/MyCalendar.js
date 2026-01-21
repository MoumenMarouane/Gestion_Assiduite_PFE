import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, 
  Chip, Stack, Avatar, Divider, IconButton, Tooltip 
} from '@mui/material';
import { 
  EventNote, Assignment, School, 
  FilterList, NotificationsActive, CalendarMonth 
} from '@mui/icons-material';

const MyCalendar = () => {
  // État pour filtrer les événements
  const [filter, setFilter] = useState('Tous');

  const events = [
    { 
      id: 1, 
      title: 'Examen Final - Algorithmique', 
      date: '25 Janvier 2026', 
      time: '09:00 - 11:00',
      type: 'Examen', 
      location: 'Amphi B',
      importance: 'Critique'
    },
    { 
      id: 2, 
      title: 'Rendu Projet Web (React/Node)', 
      date: '30 Janvier 2026', 
      time: 'Avant 23:59',
      type: 'Devoir', 
      location: 'Plateforme en ligne',
      importance: 'Élevée'
    },
    { 
      id: 3, 
      title: 'Quiz Surprise - Base de Données', 
      date: '02 Février 2026', 
      time: '14:30',
      type: 'Examen', 
      location: 'Salle 102',
      importance: 'Moyenne'
    },
    { 
      id: 4, 
      title: 'Atelier Pratique Architecture Cloud', 
      date: '05 Février 2026', 
      time: '10:00 - 12:00',
      type: 'Atelier', 
      location: 'Labo Info 4',
      importance: 'Optionnel'
    }
  ];

  const filteredEvents = filter === 'Tous' 
    ? events 
    : events.filter(e => e.type === filter);

  const getImportanceColor = (level) => {
    switch(level) {
      case 'Critique': return '#d32f2f';
      case 'Élevée': return '#ed6c02';
      case 'Moyenne': return '#0288d1';
      default: return '#757575';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      {/* Header avec Statistiques rapides */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a237e', display: 'flex', alignItems: 'center', gap: 2 }}>
            <CalendarMonth fontSize="large" /> Mon Agenda
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Vous avez {events.filter(e => e.type === 'Examen').length} examens prévus ce mois-ci.
          </Typography>
        </Box>
        <Tooltip title="Rappels activés">
          <IconButton color="primary" sx={{ border: '1px solid', borderColor: 'divider' }}>
            <NotificationsActive />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Barre de Filtres */}
      <Stack direction="row" spacing={1} sx={{ mb: 4, overflowX: 'auto', pb: 1 }}>
        <Chip 
          icon={<FilterList />} 
          label="Tous" 
          onClick={() => setFilter('Tous')} 
          variant={filter === 'Tous' ? 'filled' : 'outlined'}
          color="primary"
        />
        {['Examen', 'Devoir', 'Atelier'].map((category) => (
          <Chip 
            key={category}
            label={category} 
            onClick={() => setFilter(category)} 
            variant={filter === category ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Stack>

      {/* Liste des événements style Timeline */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} key={event.id}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0, 
                borderRadius: 4, 
                overflow: 'hidden', 
                border: '1px solid #e0e0e0',
                transition: '0.3s',
                '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.1)', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                {/* Barre latérale de couleur selon l'importance */}
                <Box sx={{ width: '8px', bgcolor: getImportanceColor(event.importance) }} />
                
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar sx={{ bgcolor: event.type === 'Examen' ? '#fff0f0' : '#e3f2fd', color: event.type === 'Examen' ? '#d32f2f' : '#1976d2', width: 56, height: 56 }}>
                        {event.type === 'Examen' ? <School /> : <Assignment />}
                      </Avatar>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{event.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <EventNote fontSize="small" /> {event.date} • {event.time}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ textAlign: { sm: 'right' } }}>
                      <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>{event.location}</Typography>
                      <Chip 
                        label={event.importance} 
                        size="small" 
                        sx={{ 
                          bgcolor: getImportanceColor(event.importance), 
                          color: 'white',
                          fontWeight: 'bold'
                        }} 
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 10, opacity: 0.5 }}>
          <Typography variant="h6">Aucun événement trouvé pour cette catégorie.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default MyCalendar;