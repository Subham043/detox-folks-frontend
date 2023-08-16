export interface BannerType<> {
    id: number;
    title: string
    description: string;
    button_link: string;
    button_text: string;
    banner_image_alt: string;
    banner_image_title: string;
    banner_image: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface AboutSectionType<> {
    id: number;
    slug: string
    description: string | TrustedHTML;
    heading: string;
    description_unfiltered: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface PartnerType<> {
    id: number;
    image_alt: string;
    image_title: string;
    image: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface PartnerResponseType<> {
    message: string;
    partner: PartnerType[];
}

export interface TestimonialType<> {
    id: number;
    star: number;
    name: string;
    message: string;
    designation: string;
    image: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface TestimonialResponseType<> {
    message: string;
    testimonial: TestimonialType[];
}