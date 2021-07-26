import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
  })
export class DialogService {  
  
    constructor() {  } 

    public showSimpleAlert(message: string) {
        swal.fire(message);
    }

    public showConfirmAlert(title: string, message: string, confirm: string, decline: string, callback: () => void) {
      swal.fire({
        title: title,
        text: message,
        //icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirm,
        cancelButtonText: decline
      }).then((result) => {
        if (result.isConfirmed) {
          /* swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ) */
          callback();
        }
      })
    }

    public showTimedAlert(message: string, duration: number) {
        let timerInterval: any;
        swal.fire({
            title: message,
            html: '<b></b>',
            timer: duration,
            timerProgressBar: true,
            didOpen: () => {
              swal.showLoading()
              timerInterval = setInterval(() => {
                const content = swal.getHtmlContainer()
                if (content) {
                  /* const b: HTMLElement | null = content.querySelector('b');
                  if (b) {
                    b.textContent = String(swal.getTimerLeft())
                  } */
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === swal.DismissReason.timer) {
              //console.log('Closed')
            }
          })
    }
} 