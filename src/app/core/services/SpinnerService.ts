import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

@Injectable({
    providedIn: 'root',
  })
export class SpinnerService {  

    dialogRef?: MatDialogRef<SpinnerComponent>;
  
    constructor(private dialog: MatDialog) {  } 
  
    start(message?: string) {    
        this.dialogRef = this.dialog.open(SpinnerComponent,{  
            disableClose: true ,  
            data: message == ''|| message == undefined ? "Loading..." : message  
        });  
      };  
  
    stop(){  
        this.dialogRef?.close();  
    }    
} 