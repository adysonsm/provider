import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-modal-confirmation",
  templateUrl: "./modal-confirmation.component.html",
  styleUrls: ["./modal-confirmation.component.scss"],
})
export class ModalConfirmationComponent implements OnInit {
  @Input() title: string;
  constructor(protected ref: NbDialogRef<ModalConfirmationComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
