import { Badge } from "@mantine/core";

export const StatusBadge = (level) => {
  // Legendary status
  if (level >= 100) {
    return (<Badge variant="gradient" gradient={{ from: 'yellow', to: 'orange', deg: 35 }}>Legendary</Badge>)
  }
  // Pro status
  if (level >= 10) {
    return (<Badge variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Pro</Badge>)
  }
  // Intermediate status
  if (level >= 5) {
    return (<Badge variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Intermediate</Badge>)
  }
  // Beginner status as fallback
  return (<Badge>Beginner</Badge>)
}