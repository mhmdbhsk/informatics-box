import OpenIcons from '../../assets/OpenIcons';
import { AssignmentItem } from '../../types/notion';
import clsx from 'clsx';
import { useRouter } from 'next/router';

type CardAssignmentsProps = {
  data: AssignmentItem;
  handleOpen: () => void;
  handleData: (data: {
    title: string;
    subject: string;
    statusTitle: string;
    statusColor: string;
    deadline: string;
  }) => void;
};

const CardAssignments = ({
  data,
  handleOpen,
  handleData,
}: CardAssignmentsProps) => {
  const router = useRouter();
  const dateNow = new Date();
  const dateFormatter = (date: string) => new Date(date);
  const dateRenderer = (date: string) =>
    new Date(date).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  const isPastDate = (firstDate: any, secondDate: any) =>
    firstDate - secondDate < 0;

  const title = data.properties['Name'].title[0].text.content;
  const subject = data.properties['Mata Pelajaran'].select.name;
  const statusTitle = data.properties['Status'].select.name;
  const statusColor = data.properties['Status'].select.color;
  const deadline = data.properties['Deadline'].date.start;

  const badgeColorStyles = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleClick = () => {
    router.push(
      {
        pathname: '/assignments',
        query: { id: data.id },
      },
      undefined,
      { shallow: true }
    );
    handleData({ title, subject, statusTitle, statusColor, deadline });
    handleOpen();
  };

  return (
    <div key={data.id} className='assignment-card group' onClick={handleClick}>
      <div className='flex-1 flex cursor-pointer'>
        <span className='group-hover:underline '>{title}</span>
        <OpenIcons className='w-4 ml-2 opacity-0 text-gray-400 group-hover:opacity-100' />
      </div>
      <div className='flex space-x-2 md:mr-4'>
        <div
          className={clsx(
            'rounded text-xs text-white px-2 py-1 flex items-center',
            badgeColorStyles(statusColor)
          )}
        >
          <span>{subject}</span>
        </div>
        <div
          className={clsx(
            'rounded text-xs text-white px-2 py-1 flex items-center',
            badgeColorStyles(statusColor)
          )}
        >
          <span>{statusTitle}</span>
        </div>
      </div>
      <div
        className={`flex flex-col ${
          isPastDate(dateFormatter(deadline), dateNow) && 'text-red-500'
        }`}
      >
        <span className='text-xs'>Terakhir Pengumpulan</span>
        <span>{dateRenderer(deadline)}</span>
      </div>
    </div>
  );
};

export default CardAssignments;
