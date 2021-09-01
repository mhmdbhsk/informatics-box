import { AppContextType } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import ArrowLeftIcon from '../assets/ArrowLeftIcon';
import useSWR, { SWRConfig, SWRConfiguration } from 'swr';
import Images from 'next/image';
import Link from 'next/link';

const RecordedLecture = () => {
  const router = useRouter();

  const { data: initialData } = useSWR('recorded-lecture');

  return (
    <div>
      <div className='flex flex-col space-y-3 md:space-y-4'>
        <div
          className='flex space-x-2 cursor-pointer back-button'
          onClick={() => router.push('/')}
        >
          <ArrowLeftIcon className='w-3 md:w-4' />
          <span className='text-xs md:text-sm font-bold'>Back</span>
        </div>
        <span className='text-lg md:text-2xl font-bold'>Recorded Lecture</span>

        <div className='grid gap-4 sm:grid-cols-2'>
          {initialData.items?.map((item: { id: string; snippet: any }) => {
            const { id, snippet } = item;
            const { thumbnails, title } = snippet;
            return (
              <Link
                key={id}
                href={`https://www.youtube.com/playlist?list=${id}`}
              >
                <a target='_blank'>
                  <div className='playlist-card'>
                    <Images
                      src={`${thumbnails.medium.url}`}
                      alt={title}
                      width={512}
                      height={290}
                    />
                    <span>{title}</span>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: AppContextType) => {
  // prettier-ignore
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlists?key=${process.env.YOUTUBE_API_KEY}&part=snippet&channelId=UC3xU-2w9A0KtSWL3VXRpRtQ`);

  const data = await response.json();

  return {
    props: {
      fallback: {
        'recorded-lecture': data,
      },
    },
  };
};

export default function RecordedLecturePage({ fallback }: SWRConfiguration) {
  return (
    <SWRConfig value={{ fallback }}>
      <RecordedLecture />
    </SWRConfig>
  );
}
