type api_routes = {
    login: string,
    logout: string,
    register: string,
    forgot_password: string,
    enquiry: string,
    products: string,
    categories: string,
    sub_categories: string,
    home_page_banner: string,
    about_section: string,
    partner: string,
    testimonial: string,
    blog: string,
    profile: string,
    profile_update: string,
    password_update: string,
    website_detail: string,
    wishlist_paginate: string,
    wishlist_all: string,
    wishlist_create: string,
    wishlist_update: string,
    wishlist_delete: string,
    cart_paginate: string,
    cart_all: string,
    cart_create: string,
    cart_update: string,
    cart_delete: string,
    billing_address_all: string,
    billing_address_create: string,
    billing_address_update: string,
    billing_address_delete: string,
    billing_information_all: string,
    billing_information_create: string,
    billing_information_update: string,
    billing_information_delete: string,
    cart: string,
    rating: string,
    coupon_apply: string,
    coupon_remove: string,
    place_order: string,
    place_order_paginate: string,
    place_order_detail: string,
    legal: string,
    feature: string,
    counter: string,
}

export const api_routes: api_routes = {
    login: '/api/v1/auth/login',
    logout: '/api/v1/auth/logout',
    register: '/api/v1/auth/register',
    forgot_password: '/api/v1/auth/forgot-password',
    enquiry: '/api/v1/contact-form',
    products: '/api/v1/product',
    categories: '/api/v1/category',
    sub_categories: '/api/v1/sub-category',
    home_page_banner: '/api/v1/home-page-banner',
    about_section: '/api/v1/about-section',
    partner: '/api/v1/partner',
    testimonial: '/api/v1/testimonial',
    blog: '/api/v1/blog',
    profile: '/api/v1/profile',
    profile_update: '/api/v1/profile/update',
    password_update: '/api/v1/profile/update-password',
    website_detail: '/api/v1/website-detail',
    wishlist_paginate: '/api/v1/wishlist',
    wishlist_all: '/api/v1/wishlist/all',
    wishlist_create: '/api/v1/wishlist/create',
    wishlist_update: '/api/v1/wishlist/update',
    wishlist_delete: '/api/v1/wishlist/delete',
    cart_paginate: '/api/v1/cart',
    cart_all: '/api/v1/cart/all',
    cart_create: '/api/v1/cart/create',
    cart_update: '/api/v1/cart/update',
    cart_delete: '/api/v1/cart/delete',
    billing_address_all: '/api/v1/billing-address/all',
    billing_address_create: '/api/v1/billing-address/create',
    billing_address_update: '/api/v1/billing-address/update',
    billing_address_delete: '/api/v1/billing-address/delete',
    billing_information_all: '/api/v1/billing-information/all',
    billing_information_create: '/api/v1/billing-information/create',
    billing_information_update: '/api/v1/billing-information/update',
    billing_information_delete: '/api/v1/billing-information/delete',
    cart: '/api/v1/cart',
    rating: '/api/v1/product/main/reviews',
    coupon_apply: '/api/v1/coupon/apply',
    coupon_remove: '/api/v1/coupon/remove',
    place_order: '/api/v1/order/place',
    place_order_paginate: '/api/v1/order',
    place_order_detail: '/api/v1/order/detail',
    legal: '/api/v1/legal',
    feature: '/api/v1/feature',
    counter: '/api/v1/counter',
}