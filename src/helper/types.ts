import { ReactNode } from "react";

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
    current_page?: number | undefined;
    from?: number | undefined;
    last_page?: number | undefined;
    per_page?: number | undefined;
    to?: number | undefined;
    total?: number | undefined;
    path?: string | undefined;
    links?: MetaLinkType[] | undefined;
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

export interface ProductSpecificationType<> {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ProductPriceType<> {
    id: number;
    discount: number;
    discount_in_price: number;
    min_quantity: number;
    price: number;
    created_at: string;
    updated_at: string;
}

export interface ProductType<> {
    id: number;
    slug: string
    description: string | TrustedHTML;
    brief_description: string;
    name: string;
    description_unfiltered: string;
    image: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    is_draft: boolean;
    is_new: boolean;
    is_on_sale: boolean;
    created_at: string;
    updated_at: string;
    sub_categories: SubCategoryType[];
    categories: CategoryType[];
    product_specifications: ProductSpecificationType[];
    product_prices: ProductPriceType[];
}

export interface ProductResponseType<> {
    meta: MetaType;
    data: ProductType[];
}

export interface ChildrenType<> {
    children: ReactNode
}

export interface WishlistType<> {
    product: ProductType;
    created_at: string;
    updated_at: string;
    id: number;
}