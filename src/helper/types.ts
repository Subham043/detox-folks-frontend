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

export interface BlogType<> {
    id: number;
    slug: string
    description: string | TrustedHTML;
    heading: string;
    name: string;
    description_unfiltered: string;
    image: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface MetaLinkType<> {
    active: boolean;
    url: string|null;
    label: string;
}

export interface MetaType<> {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    path: string;
    links: MetaLinkType[];
}

export interface BlogResponseType<> {
    meta: MetaType;
    data: BlogType[];
}

export interface CategoryType<> {
    id: number;
    slug: string
    description: string | TrustedHTML;
    heading: string;
    name: string;
    description_unfiltered: string;
    image: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
    sub_categories: SubCategoryType[];
}

export interface CategoryResponseType<> {
    meta: MetaType;
    data: CategoryType[];
}

export interface SubCategoryType<> {
    id: number;
    slug: string
    description: string | TrustedHTML;
    heading: string;
    name: string;
    description_unfiltered: string;
    image: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface SubCategoryResponseType<> {
    meta: MetaType;
    data: SubCategoryType[];
}