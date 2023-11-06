import { SWRConfig } from 'swr';
import { useAxiosPrivate } from '@/hook/useAxiosPrivate';

export default function SwrLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const axiosPrivate = useAxiosPrivate();
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data);

    return (
      <SWRConfig
        value={{
        fetcher
        }}
      >
        {children}
      </SWRConfig>
    )
}