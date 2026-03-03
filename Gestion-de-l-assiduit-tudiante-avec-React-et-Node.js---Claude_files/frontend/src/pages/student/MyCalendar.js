import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, 
  Avatar, IconButton, Chip, Tooltip, Fab,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from '@mui/material';
import { 
  ChevronLeft, ChevronRight, School, Assignment, 
  Today, BeachAccess, Mosque, Add, AccessTime
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  
  // États pour la modale d'ajout
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Devoir',
    time: '08:00',
    importance: 'Moyenne'
  });

  // --- BASE DE DONNÉES DYNAMIQUE ---
  const [events, setEvents] = useState([
    { start: '2026-01-25', end: '2026-02-01', title: 'Vacances de mi-année', type: 'Vacances', category: 'Scolaire' },
    { date: '2026-01-11', title: 'Manifeste de l\'Indépendance', type: 'Férié', category: 'National' },
    { date: '2026-02-02', title: 'Examen Réseaux', type: 'Examen', category: 'Études' },
  ]);

  // --- LOGIQUE CALENDRIER ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate);

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => 
      e.date === dateStr || (e.start && (new Date(dateStr) >= new Date(e.start) && new Date(dateStr) <= new Date(e.end)))
    );
  };

  // --- ACTIONS ---
  const handleOpen = () => {
    if (!selectedDate) alert("Veuillez d'abord sélectionner un jour sur le calendrier !");
    else setOpen(true);
  };

  const handleSaveEvent = () => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    const eventToAdd = {
      ...newEvent,
      date: dateStr,
      category: 'Personnel'
    };
    setEvents([...events, eventToAdd]);
    setOpen(false);
    setNewEvent({ title: '', type: 'Devoir', time: '08:00', importance: 'Moyenne' });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 9 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="900" sx={{ color: 'primary.main', textTransform: 'capitalize' }}>
          {monthName} {year}
        </Typography>
        <Box>
          <IconButton onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ChevronLeft /></IconButton>
          <IconButton onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ChevronRight /></IconButton>
        </Box>
      </Box>

      {/* Grille du Calendrier */}
      <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: 'background.paper' }}>
        <Grid container sx={{ bgcolor: 'action.hover' }}>
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
            <Grid item xs={1.71} key={d} sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="caption" fontWeight="bold" color="textSecondary">{d}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container>
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <Grid item xs={1.71} key={`empty-${i}`} sx={{ height: 90, bgcolor: 'action.hover', opacity: 0.5 }} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDate(day);
            const isVacation = dayEvents.some(e => e.type === 'Vacances' || e.type === 'Férié');
            const isSelected = selectedDate === day;

            return (
              <Grid item xs={1.71} key={day} onClick={() => setSelectedDate(day)}
                sx={{ 
                  height: 90, border: '0.1px solid', borderColor: 'divider', cursor: 'pointer',
                  bgcolor: isSelected ? 'primary.light' : (isVacation ? 'warning.light' : 'background.paper'),
                  '&:hover': { bgcolor: 'action.selected' }, transition: '0.2s'
                }}
              >
                <Typography sx={{ m: 1, fontWeight: isSelected ? 'bold' : 'normal' }}>{day}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                  {dayEvents.map((e, idx) => (
                    <Box key={idx} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: e.type === 'Examen' ? 'error.main' : 'success.main' }} />
                  ))}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Détails du jour sélectionné */}
      <Box sx={{ mt: 3 }}>
        <AnimatePresence mode="wait">
          {selectedDate && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Événements du {selectedDate} {monthName}</Typography>
              {getEventsForDate(selectedDate).map((e, idx) => (
                <Paper key={idx} sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2 }}>
                   <Avatar sx={{ bgcolor: 'primary.main' }}><AccessTime /></Avatar>
                   <Box sx={{ flexGrow: 1 }}>
                     <Typography fontWeight="bold">{e.title}</Typography>
                     <Typography variant="body2" color="textSecondary">{e.time} • {e.type}</Typography>
                   </Box>
                </Paper>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* BOUTON AJOUTER (Style Google Calendar) */}
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleOpen}
        sx={{ position: 'fixed', bottom: 30, right: 30, boxShadow: 4 }}
      >
        <Add />
      </Fab>

      {/* MODALE D'AJOUT */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Nouvel événement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus margin="dense" label="Titre de l'événement" fullWidth variant="outlined"
            value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            select label="Type" fullWidth value={newEvent.type}
            onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Devoir">Devoir / TP</MenuItem>
            <MenuItem value="Examen">Révision Examen</MenuItem>
            <MenuItem value="Autre">Autre</MenuItem>
          </TextField>
          <TextField
            label="Heure" type="time" fullWidth
            value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSaveEvent} variant="contained" disabled={!newEvent.title}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyCalendar;