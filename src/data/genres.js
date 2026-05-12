export const GENRES = [
  { id: 'house', label: 'House' },
  { id: 'deep-house', label: 'Deep House' },
  { id: 'tech-house', label: 'Tech House' },
  { id: 'techno', label: 'Techno' },
  { id: 'melodic-techno', label: 'Melodic Techno' },
  { id: 'afro', label: 'Afro House' },
  { id: 'amapiano', label: 'Amapiano' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'hip-hop', label: 'Hip-hop' },
  { id: 'drum-and-bass', label: 'Drum & Bass' },
  { id: 'disco', label: 'Disco / Funk' },
  { id: 'psytrance', label: 'Psytrance' },
  { id: 'singalong', label: 'Sing-along' },
  { id: 'jazz', label: 'Jazz / Soul' },
]

export const getGenre = (id) => GENRES.find((g) => g.id === id)
