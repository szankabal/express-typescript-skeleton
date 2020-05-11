exports.seed = function (knex) {
  return knex('flats').insert([
    {
      id: 1,
      title: 'First flat',
      price: 50000,
      floorArea: '3',
      country: 'Hungary',
      zip: 6753,
      city: 'Szeged',
      street: 'Zágráb'
    },
    {
      id: 2,
      title: 'Second flat',
      price: 30000,
      floorArea: '1',
      country: 'Hungary',
      zip: 6253,
      city: 'Kecskemét',
      street: 'Göndör'
    },
    {
      id: 3,
      title: 'Third flat',
      price: 80000,
      floorArea: '8',
      country: 'Hungary',
      zip: 6783,
      city: 'Hódmezővásárhely',
      street: 'Vadas Márton'
    }
  ]);
};
