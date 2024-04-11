"use client"

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, (error) => {
        reject(error);
      });
    } else {
      reject(new Error('Geolocation is not supported.'));
    }
  });
};

export default getUserLocation;
