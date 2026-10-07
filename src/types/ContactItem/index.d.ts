import { SocialLink } from '@/types/SocialLink';

export interface ContactItem {
  email: string;
  social: {
    GitHub: SocialLink;
    LinkedIn: SocialLink;
    X: SocialLink;
    email: SocialLink;
  };
}
