import { NextPage } from 'next';
import MenuCard from '../components/home/MenuCard';

const Home: NextPage = ({}) => {
  return (
    <div>
      <MenuCard title='Assignments' href='/assignments' />
    </div>
  );
};

export default Home;
