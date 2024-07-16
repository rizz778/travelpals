import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import { Icon, Style } from 'ol/style';
import marker from '../Assests/marker.png';
import UserProfileModal from '../UserProfileModal/UserProfileModal';
import { Link } from 'react-router-dom';
import notification from '../Assests/notification.png';
import './MyMap.css'; // Import the CSS file

const MyMap = ({ center, zoom, metroCoordinates, nearbyStudents, loggedInUser }) => {
  const mapRef = useRef();
  const overlayRef = useRef(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const overlayElement = document.createElement('div');
    overlayElement.className = 'custom-overlay';
    overlayRef.current = new Overlay({
      element: overlayElement,
      offset: [0, -15],
      positioning: 'bottom-center',
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
      overlays: [overlayRef.current],
    });

    const vectorSource = new VectorSource();

    const addFeature = (coordinates, src, student) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
      });
      feature.setStyle(new Style({
        image: new Icon({
          src: src,
          scale: 0.1,
        }),
      }));
      feature.set('student', student); // Attach student data to the feature
      vectorSource.addFeature(feature);
      return feature;
    };

    addFeature(center, marker, { name: 'You', type: 'user' });

    nearbyStudents.forEach(student => {
      const feature = addFeature(student.location.coordinates, marker, student);
      feature.setId(student._id);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    map.on('click', function (event) {
      const feature = map.getFeaturesAtPixel(event.pixel)[0];
      if (feature) {
        const student = feature.get('student');
        if (student) {
          const { name, college, metro } = student;
          const overlayContent = `
            <div>
              <strong>Name:</strong> ${name}<br>
              <strong>College:</strong> ${college}<br>
              <strong>Address:</strong> ${metro.name}<br>
              <button class="profile-button" data-id="${student._id}">Profile</button>
            </div>
          `;
          overlayElement.innerHTML = overlayContent;
          overlayRef.current.setPosition(feature.getGeometry().getCoordinates());
          overlayElement.style.display = 'block';
        } else {
          overlayElement.style.display = 'none';
        }
      } else {
        overlayElement.style.display = 'none';
      }
    });

    const handleResize = () => {
      map.updateSize();
    };
    window.addEventListener('resize', handleResize);

    document.body.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('profile-button')) {
        const studentId = e.target.getAttribute('data-id');
        const student = nearbyStudents.find(s => s._id === studentId);
        setSelectedStudent(student);
        setIsModalOpen(true);
      }
    });

    return () => {
      if (map) {
        map.setTarget(null);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [center, zoom, metroCoordinates, nearbyStudents]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="map-container">
      <Link to='/notification'>
        <button className="notification-button">
          <img src={notification} alt="Notification" />
        </button>
      </Link>
      <div ref={mapRef} className="map" />
      <UserProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedStudent}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default MyMap;

