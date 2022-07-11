import { Badge } from "@mantine/core";

export const StatusBadge = (level) => {
  // Ultimate status
  if (level === 7) return (<Badge variant="gradient" gradient={{ from: '#c5b358', to: '#d4af37', deg: 35 }}>Ultimate</Badge>)
  // Legendary status
  if (level >= 6) return (<Badge variant="gradient" gradient={{ from: 'yellow', to: 'orange', deg: 35 }}>Legendary</Badge>)
  // Pro status
  if (level >= 4) return (<Badge variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Pro</Badge>)
  // Intermediate status
  if (level >= 2) return (<Badge variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Intermediate</Badge>)
  // Beginner status as fallback
  return (<Badge>Beginner</Badge>)
}