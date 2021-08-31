import { NextPage } from 'next';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { AssignmentsList } from '../types/notion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CardAssignments from '../components/assignments/Card';
import ArrowLeftIcon from '../assets/ArrowLeftIcon';
import Dialog from '../components/assignments/Dialog';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const Home: NextPage<AssignmentsList> = ({ assignments }) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({
    title: '',
    subject: '',
    statusTitle: '',
    statusColor: '',
    deadline: '',
    info: '',
    link: '',
    submitPlace: '',
  });

  const { data, isValidating } = useSWR(`/api/blocks/${id}`, fetcher);

  const handleClose = () => {
    setIsOpen(false);
    router.replace(router.pathname, '/assignments', { shallow: true });
  };
  const handleOpen = () => setIsOpen(true);
  const handleSelectedData = (data: any) => setSelectedData(data);

  return (
    <div>
      <Dialog
        data={{ content: data, contentData: selectedData }}
        isLoading={isValidating}
        isOpen={isOpen}
        handleClose={handleClose}
      />

      <div className='flex flex-col space-y-3 md:space-y-4'>
        <div
          className='flex space-x-2 cursor-pointer back-button'
          onClick={() => router.push('/')}
        >
          <ArrowLeftIcon className='w-3 md:w-4' />
          <span className='text-xs md:text-sm font-bold'>Back</span>
        </div>
        <span className='text-lg md:text-2xl font-bold'>Assignments</span>
        <div className='flex space-y-4 flex-col'>
          {assignments.map((item) => {
            if (item.properties.Name.title[0]) {
              return (
                <CardAssignments
                  data={item}
                  key={item.id}
                  handleOpen={handleOpen}
                  handleData={handleSelectedData}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: AppContextType) => {
  const response = await fetch(
    `${process.env.URL_PATH}/api/databases/133890145a3240ccb973b5b42ef439ee`
  );

  const data = await response.json();

  return {
    props: {
      assignments: data,
    },
  };
};

export default Home;
