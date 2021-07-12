import {Component, Inject} from '@angular/core';  
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  
@Component({  
    selector: 'spinner',  
    templateUrl: 'spinner.component.html',  
  })  
  export class SpinnerComponent {  
    
    constructor(public dialogRef: MatDialogRef<SpinnerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}  
  
  }  