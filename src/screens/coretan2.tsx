import AsyncStorage from '@react-native-async-storage/async-storage';

// ...

function onRelease(panName: string) {
  // ...

  // 5. spring current pan into nearest point
  // ...

  // 6. Save the updated panOrder to AsyncStorage
  AsyncStorage.setItem('panOrder', JSON.stringify(panOrder))
    .then(() => {
      console.log('Preferensi pengguna telah disimpan');
    })
    .catch(error => {
      console.log('Gagal menyimpan preferensi pengguna:', error);
    });
}

// ...

useEffect(() => {
  // Load the saved panOrder from AsyncStorage
  AsyncStorage.getItem('panOrder')
    .then(savedOrder => {
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        if (Array.isArray(parsedOrder) && parsedOrder.length === 5) {
          panOrder = parsedOrder;
          // Update the positions of the animated views based on the saved panOrder
          // You may need to call the appropriate animation methods here
        }
      }
    })
    .catch(error => {
      console.log('Gagal memuat preferensi pengguna:', error);
    });
}, []);
