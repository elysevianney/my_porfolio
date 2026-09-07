export interface Project {
  readonly platform: 'web' | 'mobile';
  readonly title: string;
  readonly description: string;
  readonly githubUrl?: string;
  readonly demoUrl?: string;
  readonly tools: readonly string[];
  readonly skills: readonly string[];
  readonly image?: string;
  readonly imageAlt?: string;
  readonly featured?: boolean;
  /** Affiche le badge « En développement » lorsque true. */
  readonly indev?: boolean;
}
