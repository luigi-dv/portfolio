import testimonialData from '@/data/testimonials.json';

import { Testimonial } from '@/types/Testimonial';

export const getTestimonialData = async () =>
  testimonialData as { sourceUrl: string; testimonials: Testimonial[] };
