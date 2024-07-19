import React from 'react';
import Banner from './Banner';
import HomeContent from './HomeContent';
import SearchbarRestaurant from '../../components/widgets/SearchbarRestaurant';
function Home() {
  return (
    <div className='site-background'>
      <Banner />
      <HomeContent />
    </div>
  );
}

export default Home;
