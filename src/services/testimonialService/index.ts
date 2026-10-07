import { Testimonial } from '@/types/Testimonial';
import testimonialData from '@/data/testimonials.json';

export const getTestimonialData = async () =>
  testimonialData as { sourceUrl: string; testimonials: Testimonial[] };
