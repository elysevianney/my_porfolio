export type SocialLinkKind = 'email' | 'github' | 'linkedin';

export interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly kind: SocialLinkKind;
  readonly external: boolean;
}
