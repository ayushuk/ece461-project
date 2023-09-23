// class to be used for the frontend and outputting of metrics
export class Urlmetrics {
  // fields to store the different metrics and URL
  URL!: string
  BusFactor!: number
  Correctness!: number
  RampUp!: number
  Responsiveness!: number
  License!: number
  NetScore!: number

  // fill in the field for the URL when creating the class
  constructor(URL: string) {
    this.URL = URL
  }
}
