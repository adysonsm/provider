import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-form-modal",
  templateUrl: "./form-modal.component.html",
  styleUrls: ["./form-modal.component.scss"],
})
export class FormModalComponent {
  checked = false;
  constructor(protected ref: NbDialogRef<FormModalComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close();
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }
}
