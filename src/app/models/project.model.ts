export interface Project {
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
