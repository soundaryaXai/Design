import React, { useState } from 'react';
import { getCurrentLocation, createMapUrl } from '../utils/locationUtils';

interface LocationPickerProps {
  address: string;
  onAddressChange: (address: string) => void;
  onLocationChange: (lat: number, lng: number) => void;
  onCurrentLocationClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  address,
  onAddressChange,
  onLocationChange,
  onCurrentLocationClick,
  loading = false,
  disabled = false
}) => {
  const [showMapLink, setShowMapLink] = useState(false);

  const handleUseCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      onAddressChange(location.address || '');
      onLocationChange(location.lat, location.lng);
      onCurrentLocationClick();
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700 mb-1">Location Address:</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g., 123 Main St, Anytown, USA"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          disabled={disabled}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={loading || disabled}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '📍 Getting Location...' : '📍 Use My Location'}
        </button>
      </div>
      
      {address && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMapLink(!showMapLink)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showMapLink ? 'Hide Map Link' : 'Show Map Link'}
          </button>
          {showMapLink && (
            <a
              href={createMapUrl(0, 0)} // You might want to pass actual coordinates here
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View on OpenStreetMap
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationPicker; 