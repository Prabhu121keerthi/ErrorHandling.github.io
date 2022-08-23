import { Component } from '@angular/core';
import { from, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ErrorCallback';

  srcArray = from([1, 2, 'A', 4]);

  obs = this.srcArray
  .pipe(
    map( val => { 
      let res = val as number * 2;
      if(Number.isNaN(res)) {
        console.log("Errors occured in Stream");
        throw new Error("NaN Error");
        
      }
      return res;
    })
  )

  ngOnInit() {
    this.obs.subscribe(val => {console.log("Value recieved " + val)},
    err => { console.log("Caught error at Subscriber " + err)},
    () => { console.log("Processing complete")});
  }

}
