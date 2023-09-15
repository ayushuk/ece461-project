export class Urlmetrics {
   URL!: string;
   BusFactor!: number;
   Correctness!: number;
   RampUp!: number;
   Responsiveness!: number;
   License!: number;
   NetScore!: number;

   constructor(URL: string) {
     this.URL = URL
   }

   makeNDJSON(): string {
     return JSON.stringify(this)
   }
}
