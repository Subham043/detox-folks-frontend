import React, { createContext, useEffect, useState } from "react";
import { ChildrenType, WebsiteSettingType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";

export type WebsiteType = {
    website: WebsiteSettingType;
}
  
export type WebsiteContextType = {
    website: WebsiteType;
    websiteLoading: boolean;
}

const websiteDefaultValues: WebsiteContextType = {
    website: {website:{
      id: 1,
      email: '',
      facebook: '',
      address: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      website_favicon: '/images/favicon.png',
      website_footer_logo: '/images/logo.png',
      website_logo: '/images/logo.png',
      website_logo_alt: 'DetoxFolks',
      website_logo_title: 'DetoxFolks',
      website_name: 'DetoxFolks',
      phone: 0,
      created_at: '',
      updated_at: '',
    }},
    websiteLoading: false
};

export const WebsiteContext = createContext<WebsiteContextType>(websiteDefaultValues);

const WebsiteProvider: React.FC<ChildrenType> = ({children}) => {
    const [website, setWebsiteDetails] = useState<WebsiteType>({website:{
      id: 1,
      email: '',
      facebook: '',
      address: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      website_favicon: '/images/favicon.png',
      website_footer_logo: '/images/logo.png',
      website_logo: '/images/logo.png',
      website_logo_alt: 'DetoxFolks',
      website_logo_title: 'DetoxFolks',
      website_name: 'DetoxFolks',
      phone: 0,
      created_at: '',
      updated_at: '',
    }});
    const [websiteLoading, setWebsiteLoading] = useState<boolean>(false);
  
    useEffect(() => {
      getWebsite()
      return () => {}
    }, [])
    
    const getWebsite = async () => {
        setWebsiteLoading(true);
        try {
            const response = await axiosPublic.get(api_routes.website_detail);
            setWebsiteDetails({website: {...response.data.general}});
        } catch (error: any) {
          console.log(error);
        }finally{
          setWebsiteLoading(false);
        }
    }

    return (
      <WebsiteContext.Provider value={{website, websiteLoading}}>
          {children}
      </WebsiteContext.Provider>
    );
}

export default WebsiteProvider;