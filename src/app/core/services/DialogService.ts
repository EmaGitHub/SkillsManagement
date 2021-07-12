import { Injectable } from "@angular/core";
import swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
  })
export class DialogService {  
  
    constructor() {  } 

    public showSimpleAlert(message: string) {
        swal.fire(message);
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
              console.log('Closed by the timer')
            }
          })
    }
} 