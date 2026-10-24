import { useState } from 'react';
import { useContactInfo } from './useContactInfo';
import { locationQuery, directionsUrl } from '../content/contact';
export function useBranchMap() {
  const {
    locations
  } = useContactInfo();
  const [selectedId, setSelectedId] = useState('');
  const selectedLocation = locations.find(location => location.id === selectedId) || locations[0];
  return {
    locations,
    selectedLocation,
    mapBranch: selectedLocation?.id || '',
    setMapBranch: setSelectedId,
    mapUrl: `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery(selectedLocation))}&z=${selectedLocation ? 16 : 11}&output=embed`,
    directionsHref: selectedLocation ? directionsUrl(selectedLocation) : ''
  };
}
