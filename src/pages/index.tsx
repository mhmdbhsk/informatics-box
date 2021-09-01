import MenuCard from '../components/home/MenuCard';

const Home = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <MenuCard title='Assignments' href='/assignments' />
      <MenuCard title='Contributors' href='/contributors' />
    </div>
  );
};

export default Home;
