/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

/**
 * Defines the models representing a Module
 */

interface Module {
  url: string;
}

export interface NpmModule extends Module {
  license: string;
  githubUrl: string;
}

export interface GithubModule extends Module {
  closedIssues: number;
  totalIssues: number;
  monthlyCommits: number;
  anualCommits: number;
  topContributorWeight: number;
  totalContributorWeight: number;
  license: string;
}

export interface SourceCode extends Module {
  readmeLines: number;
  codeLines: number;
}
