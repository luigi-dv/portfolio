export interface Testimonial {
  /** Excerpt quoted word for word; "…" marks trimmed text */
  quote: string;
  name: string;
  role: string;
  relationship: string;
  /** `YYYY-MM` of the recommendation */
  date: string;
}
