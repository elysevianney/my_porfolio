export interface Project {
  readonly platform: 'web' | 'mobile';
  readonly visual: 'home' | 'connect' | 'opportunity' | 'conversation' | 'stock';
  readonly title: string;
  readonly description: string;
  readonly githubUrl?: string;
  readonly demoUrl?: string;
  readonly tools: readonly string[];
  readonly skills: readonly string[];
  readonly image?: string;
  readonly imageAlt?: string;
  readonly featured?: boolean;
}
