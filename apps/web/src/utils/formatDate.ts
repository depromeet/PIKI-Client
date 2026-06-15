export const formatTimeKo = (dateString: string) =>
  new Date(dateString).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit', hour12: true });
