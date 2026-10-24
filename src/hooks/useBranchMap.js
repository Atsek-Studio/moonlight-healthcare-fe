import { useState } from 'react';
export function useBranchMap() {
  const [mapBranch, setMapBranch] = useState('Ho Chi Minh City Vietnam');
  return {
    mapBranch,
    setMapBranch,
    mapUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapBranch)}&z=12&output=embed`
  };
}
