import { AppContextType } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CardAssignments from '../components/assignments/CardAssignments';
import ArrowLeftIcon from '../assets/ArrowLeftIcon';
import Dialog from '../components/assignments/Dialog';
import useSWR, { SWRConfig, SWRConfiguration } from 'swr';
import SelectBox from '../components/assignments/SelectBox';
import CircularLoading from '../components/CircularLoading';
import { AssignmentItem } from '../types/notion';

const option = [
  {
    id: 'b2fd4e3ab46d4363b369136fb6e3b2a5',
    title: 'Kelas A',
    value: 'classA',
  },
  {
    id: '133890145a3240ccb973b5b42ef439ee',
    title: 'Kelas B',
    value: 'classB',
  },
];

const Assignments = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(option[0]);
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

  const { data: initialData } = useSWR('assignments');
  const { data: assignments, isValidating: isAssignmentsValidating } = useSWR(
    `/api/databases/${selectedClass.id}?sorts=true&sorts_property=Deadline&sorts_direction=descending`,
    { fallbackData: initialData }
  );
  const { data: blocks, isValidating: isBlockValidating } = useSWR(() =>
    id ? `/api/blocks/${id}` : null
  );

  const handleClose = () => {
    setIsOpen(false);
    router.replace(router.pathname, '/assignments', { shallow: true });
  };
  const handleOpen = () => setIsOpen(true);
  const handleSelectedData = (data: any) => setSelectedData(data);

  return (
    <div>
      <Dialog
        data={{ content: blocks, contentData: selectedData }}
        isLoading={isBlockValidating}
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

        <div>
          <SelectBox
            selected={selectedClass}
            setSelected={setSelectedClass}
            option={option}
          />
        </div>

        <div className='flex space-y-4 flex-col'>
          {isAssignmentsValidating ? (
            <CircularLoading />
          ) : assignments.results?.results.length > 0 ? (
            assignments.results?.results.map((item: AssignmentItem) => {
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
            })
          ) : (
            <span className='text-xs sm:text-sm text-gray-500'>
              Belum ada tugas
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: AppContextType) => {
  const response = await fetch(
    `${process.env.URL_PATH}/api/databases/b2fd4e3ab46d4363b369136fb6e3b2a5?sorts=true&sorts_property=Deadline&sorts_direction=descending`
  );

  const data = await response.json();

  return {
    props: {
      fallback: {
        assignments: data,
      },
    },
  };
};

export default function AssignmentsPage({ fallback }: SWRConfiguration) {
  return (
    <SWRConfig value={{ fallback }}>
      <Assignments />
    </SWRConfig>
  );
}
