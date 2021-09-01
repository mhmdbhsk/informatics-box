import { AppContextType } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import ArrowLeftIcon from '../assets/ArrowLeftIcon';
import useSWR, { SWRConfig, SWRConfiguration } from 'swr';
import CardContributor from '../components/contributors/CardContributor';

const Contributors = () => {
  const router = useRouter();

  const { data: initialData } = useSWR('contributors');

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
        <span className='text-lg md:text-2xl font-bold'>Contributors</span>

        <div className='flex space-y-4 flex-col'>
          {initialData.results?.results.map((item: any, index: number) => (
            <CardContributor data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: AppContextType) => {
  const response = await fetch(
    `${process.env.URL_PATH}/api/databases/636054ff33c946a6aa22afd98351c754?sorts=true&sorts_property=Order&sorts_direction=ascending`
  );

  const data = await response.json();

  return {
    props: {
      fallback: {
        contributors: data,
      },
    },
  };
};

export default function ContributorsPage({ fallback }: SWRConfiguration) {
  return (
    <SWRConfig value={{ fallback }}>
      <Contributors />
    </SWRConfig>
  );
}
