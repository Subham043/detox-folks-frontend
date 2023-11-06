import { axiosPublic } from "../../axios";
import { useSession } from "next-auth/react";

export function useAxiosPrivate(){
    const { status, data: session } = useSession();
    
    axiosPublic.interceptors.request.use(
        config => {
            if(!config.headers['authorization'] && status==='authenticated'){
                config.headers['authorization'] = `Bearer ${session?.user.token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    
    return axiosPublic;
}