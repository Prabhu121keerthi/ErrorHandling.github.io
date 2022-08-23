import { Component } from '@angular/core';
import { map, catchError, from, observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ThrowError';
  srcArray = from([1, 2, 'A', 4]);

  obs = this.srcArray
  .pipe(
    map(val => {
      let res = val as number * 2;
      if(Number.isNaN(res)) {
        console.log("Error occured in Stream");
        throw new Error("Result is NaN");
      }
      return res;
    }),
    catchError(err => {
      console.log("Caught in CatchError. Throwing Error")
      throw new Error(err);
    })
  )

  ngOnInit() {
    this.obs.subscribe(val => console.log("Value recieved " + val),
                      err => console.log("Error " + err),
                      () => console.log("Process completed")
                      )
  }
}
