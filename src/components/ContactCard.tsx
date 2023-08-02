import { FC } from "react";

type ContactCardProps = {
    icon: string;
    heading: string;
    description: string;
    active: boolean;
};

const ContactCard:FC<ContactCardProps> = ({icon, heading, description, active}) => {
    return <div className={`contact-card ${active ? 'active': ''}`}>
        <i className={icon}></i>
        <h4>{heading}</h4>
        <p>{description}</p>
    </div>
}

export default ContactCard