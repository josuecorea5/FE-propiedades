export const formatDate = (date: string) => {
  const newDate = date.split('T')[0];
  return new Date(newDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
