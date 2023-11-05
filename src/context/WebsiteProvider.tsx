import React, { createContext, useEffect, useState } from "react";
import { ChildrenType, WebsiteSettingResponseType, WebsiteSettingType } from "../helper/types";
import { api_routes } from "../helper/routes";
import useSWR from 'swr'

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
      website_favicon: '/images/logo.png',
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
      website_favicon: '/images/logo.png',
      website_footer_logo: '/images/logo.png',
      website_logo: '/images/logo.png',
      website_logo_alt: 'DetoxFolks',
      website_logo_title: 'DetoxFolks',
      website_name: 'DetoxFolks',
      phone: 0,
      created_at: '',
      updated_at: '',
    }});

    const { data, isLoading:websiteLoading } = useSWR<WebsiteSettingResponseType>(api_routes.website_detail);

    useEffect(() => {
      if(!websiteLoading && data){
        setWebsiteDetails({website: {...data.general}});
      }else{
        setWebsiteDetails({website:{
          id: 1,
          email: '',
          facebook: '',
          address: '',
          instagram: '',
          linkedin: '',
          youtube: '',
          website_favicon: '/images/logo.png',
          website_footer_logo: '/images/logo.png',
          website_logo: '/images/logo.png',
          website_logo_alt: 'DetoxFolks',
          website_logo_title: 'DetoxFolks',
          website_name: 'DetoxFolks',
          phone: 0,
          created_at: '',
          updated_at: '',
        }});
      }
      return () => {}
    }, [websiteLoading])

    return (
      <WebsiteContext.Provider value={{website, websiteLoading}}>
          {children}
      </WebsiteContext.Provider>
    );
}

export default WebsiteProvider;