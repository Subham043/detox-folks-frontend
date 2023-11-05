import { SWRConfig, preload } from 'swr';
import { useAxiosPrivate } from '@/hook/useAxiosPrivate';
import { useEffect } from 'react';
import { api_routes } from '@/helper/routes';
import { useSession } from 'next-auth/react';

export default function SwrLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const axiosPrivate = useAxiosPrivate();
    const { status } = useSession();
    const fetcher = (url: string) => axiosPrivate.get(url).then((res) => res.data);

    useEffect(() => {
      if(status==='authenticated'){
        preload(api_routes.cart_all, fetcher)
      }
    }, [status])

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