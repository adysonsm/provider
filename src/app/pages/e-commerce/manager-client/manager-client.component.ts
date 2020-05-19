import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { Manager } from '../model/manager.model';
import { ManagerService } from './manager-service';

@Component({
  selector: 'app-manager-client',
  templateUrl: './manager-client.component.html',
  styleUrls: ['./manager-client.component.sass']
})
export class ManagerClientComponent implements OnInit {

  names: string[] = [];
  managers
  @Input() client : any;
  
  constructor(
    private dialogService: NbDialogService,
    private managerService : ManagerService,
  ) { }

  ngOnInit(): void {
    console.log(this.client);
    this.listManagers();
  }

  listManagers() {
    this.managerService.listManager(this.client.cnpj).subscribe(data => {
      console.log(data)
      this.managers = data
    })
  }

  open() {
    this.dialogService.open(ModalConfirmationComponent, {
      context: {
   
      },
    });
  }

  open3(manager ?: any) {
    console.log(manager, "testando")
    this.managerService.manager = manager;
    this.dialogService
      .open(FormModalComponent, {
        context: {
          manager: manager,
          cnpj: this.client.cnpj
        }
      } )
      .onClose.subscribe(() => this.listManagers());
  }

}
