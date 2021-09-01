import OpenIcon from '../../assets/OpenIcon';
import { AssignmentItem } from '../../types/notion';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { dateFormatter, datePastChecker, dateRenderer } from '../../utils/date';
import Badge from '../Badge';

type CardAssignmentsProps = {
  data: AssignmentItem;
  handleOpen: () => void;
  handleData: (data: {
    title: string;
    subjectTitle: string;
    subjectColor: string;
    statusTitle: string;
    deadline: string;
    info: string;
    link: string | null;
    submitPlace: string;
  }) => void;
};

const CardAssignments = ({
  data,
  handleOpen,
  handleData,
}: CardAssignmentsProps) => {
  const router = useRouter();
  const dateNow = new Date();

  const title = data.properties['Name'].title[0]?.text.content;
  const subjectColor = data.properties['Mata Pelajaran'].select?.color;
  const subjectTitle = data.properties['Mata Pelajaran'].select?.name;
  const statusTitle = data.properties['Status'].formula?.string;
  const deadline = data.properties['Deadline'].date?.start;
  const info = data.properties['Keterangan']?.rich_text[0]?.text.content;
  const link = data.properties['Link Pengumpulan']?.url;
  const submitPlace = data.properties['Tempat Pengumpulan'].select?.name;

  const handleClick = () => {
    router.push(
      {
        pathname: '/assignments',
        query: { id: data.id },
      },
      undefined,
      { shallow: true }
    );
    handleData({
      title,
      subjectTitle,
      subjectColor,
      statusTitle,
      deadline,
      info,
      link,
      submitPlace,
    });
    handleOpen();
  };

  return (
    <div
      key={data.id}
      className={clsx(
        'assignment-card group',
        datePastChecker(dateFormatter(deadline), dateNow) &&
          'opacity-50 bg-black'
      )}
      onClick={handleClick}
    >
      <div className='flex-1 flex cursor-pointer mr-4 overflow-hidden whitespace-nowrap '>
        <span className='group-hover:underline truncate'>{title}</span>
        <OpenIcon className='w-4 ml-2 opacity-0 text-gray-400 group-hover:opacity-100' />
      </div>
      <div className='flex space-x-2 md:mr-4'>
        <Badge value={subjectTitle} color={subjectColor} />
        <Badge value={statusTitle} />
      </div>
      <div
        className={`flex flex-col ${
          datePastChecker(dateFormatter(deadline), dateNow) && 'text-red-500'
        }`}
      >
        <span className='text-xs'>Terakhir Pengumpulan</span>
        <span>{dateRenderer(deadline)}</span>
      </div>
    </div>
  );
};

export default CardAssignments;
