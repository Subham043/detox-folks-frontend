import React, { createContext, useEffect, useState } from "react";
import { ChildrenType } from "../helper/types";
import { useSession } from "next-auth/react";
import Modal from 'react-modal';
import LoginModal from "@/components/LoginModal";
import { useRouter } from "next/router";

Modal.setAppElement('#body');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
  
export type LoginModalContextType = {
  showLogin: boolean;
  displayLogin: () => void;
  hideLogin: () => void;
}

const loginModalDefaultValues: LoginModalContextType = {
  showLogin: false,
  displayLogin: () => {},
  hideLogin: () => {},
};

export const LoginModalContext = createContext<LoginModalContextType>(loginModalDefaultValues);

const LoginModalProvider: React.FC<ChildrenType> = ({children}) => {
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      setShowLogin(false)
    }, [router]);
    

    const displayLogin = () => {
        if(status==='unauthenticated'){
          setShowLogin(true)
        }
    }
    
    const hideLogin = () => {
        setShowLogin(false)
    }

    return (
      <LoginModalContext.Provider value={{showLogin, displayLogin, hideLogin}}>
          {children}
          <Modal
            isOpen={showLogin}
            // onAfterOpen={afterOpenModal}
            onRequestClose={hideLogin}
            contentLabel="Login"
            style={customStyles}
          >
            <div className="row justify-content-center">
                <div className="col-12 p-relative clse-btn">
                  <button onClick={hideLogin} className="cart-close"><i className="icofont-close"></i></button>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <LoginModal />
                </div>
            </div>
          </Modal>
      </LoginModalContext.Provider>
    );
}

export default LoginModalProvider;