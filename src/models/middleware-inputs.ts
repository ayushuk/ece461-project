/**
 * Defines the models representing the data inputs to the middleware for calculations.
 */

export interface BusFactorData {
  criticalContrubitorCommits: number
  totalCommits: number
  criticalContributorPullRequests: number
  totalPullRequests: number
}

export interface CorrectnessData {
  closedIssues: number
  openIssues: number
}

export interface ResponsesivenessData {
  linesOfReadme: number
  linesOfCode: number
}
