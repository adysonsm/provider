import { Component } from "@angular/core";
import { NbDialogService } from '@nebular/theme';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
import { FormModalComponent } from './form-modal/form-modal.component';

@Component({
  selector: "ngx-ecommerce",
  templateUrl: "./e-commerce.component.html",
  styleUrls: ["./e-commerce.component.scss"],
})
export class ECommerceComponent {
  public step: number = 0;
  frag = false;
  names: string[] = [];

  constructor(private dialogService: NbDialogService) {}

  advanceStep(hideen?: true) {
    if (hideen) {
      this.frag = true;
    }
    this.step++;
  }

  backStep() {
    this.step--;
  }

  open() {
    this.dialogService.open(ModalConfirmationComponent, {
      context: {
        title: "This is a title passed to the dialog component",
      },
    });
  }

  open3() {
    this.dialogService.open(FormModalComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }
}
