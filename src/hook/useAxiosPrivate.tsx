import { useEffect } from "react";
import { axiosPublic } from "../../axios";
import { useSession } from "next-auth/react";

export function useAxiosPrivate(){
    const { status, data: session } = useSession();
    
    useEffect(() => {

        const requestInterceptor = axiosPublic.interceptors.request.use(
            config => {
                if(!config.headers['authorization'] && status==='authenticated'){
                    config.headers['authorization'] = `Bearer ${session?.user.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    
      return () => {
          axiosPublic.interceptors.request.eject(requestInterceptor);
      }
    }, [status, session?.user])
    
    return axiosPublic;
}