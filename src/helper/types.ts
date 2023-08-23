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
    is_popular: boolean;
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

export interface ProductImageType<> {
    id: number;
    image: string;
    image_title: string;
    image_alt: string;
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
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    sub_categories: SubCategoryType[];
    categories: CategoryType[];
    product_specifications: ProductSpecificationType[];
    product_prices: ProductPriceType[];
    product_images: ProductImageType[];
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

export interface CartType<> {
    product: ProductType;
    product_price: ProductPriceType;
    created_at: string;
    updated_at: string;
    id: number;
    quantity: number;
    amount: number;
}


export interface LegalType<> {
    id: number;
    heading: string;
    description: string | TrustedHTML;
    description_unfiltered: string;
    page_name: string;
    slug: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
}

export interface LegalResponseType<> {
    message: string;
    legal: LegalType[];
}

export interface FeatureType<> {
    id: number;
    title: string;
    description: string;
    image: string;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface FeatureResponseType<> {
    message: string;
    feature: FeatureType[];
}

export interface CounterType<> {
    id: number;
    title: string;
    counter: number;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface CounterResponseType<> {
    message: string;
    counter: CounterType[];
}