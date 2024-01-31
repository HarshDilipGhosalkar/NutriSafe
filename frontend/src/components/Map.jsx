// components/Map.js
import React, { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import ImageCarousel from './ImageCarousel';

const Map = ({ foodItem }) => {
  const mapRef = useRef(null);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 19.07283000, lng: 72.88261000 },
        zoom: 13,
      });

      const placesService = new window.google.maps.places.PlacesService(map);
      const infowindow = new window.google.maps.InfoWindow({});
      setInfoWindow(infowindow);

      const searchNearby = () => {
        const request = {
          location: map.getCenter(),
          radius: 5000,
          type: 'supermarket',
          keyword: foodItem,
        };

        placesService.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
              });

              // Attach click event to marker
              marker.addListener('click', () => {
                // Fetch additional details for the clicked place
                placesService.getDetails({ placeId: place.place_id }, (placeDetails, status) => {
                  if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    // Convert JSX to HTML string
                    const contentString = ReactDOMServer.renderToString(
                      <div>
                        <h3>{placeDetails.name}</h3>
                        <ImageCarousel images={images} />
                      </div>
                    );

                    // Display store name in the infowindow
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                  }
                });
              });
            });
          }
        });
      };

      searchNearby();
    };

    if (window.google) {
      initMap();
    } else {
      // Load the Google Maps JavaScript API script dynamically
      const script = document.createElement('script');
      // Replace YOUR_API_KEY with your actual API key
      //AIzaSyDLZNl80n5ZScKutQsU7_PXcP1fw2511Js
      script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [foodItem]);

  return <div ref={mapRef} style={{ height: '500px' }} />;
};

export default Map;
