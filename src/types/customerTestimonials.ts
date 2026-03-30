export interface CustomerTestimonialCover {
    logo: String;
    text: String;
    backgroundColor: String;
    author: String;
    authorLegend: String;
}

export interface CustomerTestimonialPage{
    img: String;
    arrowColor?: String;
}


export type SlideItem = CustomerTestimonialCover | CustomerTestimonialPage;