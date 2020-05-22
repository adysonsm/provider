import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "provider-produtividade";

  constructor(public http: HttpClient) {}

  makeHttpCall() {
    this.http
      .get("https://jsonplaceholder.typicode.com/comments")
      .subscribe((r) => {
        console.log(r);
      });
  }
}
