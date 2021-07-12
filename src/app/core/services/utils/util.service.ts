import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { RestResponse } from './../../../shared/domain/http/rest-response';
import { Injectable } from '@angular/core';
import { ToastMessageService } from './toast-message.service';
import { Message } from 'src/app/shared/domain/http/message';
import { TranslateService } from '@ngx-translate/core';
import { ModalMessageService } from './modal-message.service';
import { Subject } from 'rxjs';

@Injectable()
export class UtilService {

  private _logoutSubject$: Subject<string> = new Subject<string>();

  constructor(private toastMessageService: ToastMessageService,
    private translateService: TranslateService,
    private modalMessageService: ModalMessageService,
    private httpClient: HttpClient) { }

  get logoutSubjectAsObservable() {
    return this._logoutSubject$.asObservable();
  }

  public logout() {
    this.httpClient.get('/pkmslogout').subscribe(
      res => {
        console.log('response success on LOGOUT OPERATION', res);
        this._logoutSubject$.next('success');
      },
      err => {
        console.error('reponse error on LOGOUT OPERATION', err);
        // nella response è presente l'html della pagina di login
        // l'errore scaturisce dal tentativo di effettuare il parsing del json atteso (sostituito dall'html)
        // ma la response, ovviamente, contiene un 200
        if (err.status && err.status === 200) {
          this._logoutSubject$.next('success');
        } else {
          this._logoutSubject$.next('failed');
        }
      });
  }

  public manageRestResponseError(err: any) {
    let severity: string = null;
    let summary: string = null;
    let messages: Message[] = null;

    let messageWrapper: any;

    if (!this.checkSession(err)) {
      this.modalMessageService.showSessionExpired();
    }
    else {
      if (err instanceof RestResponse) {
        messageWrapper = err;
      } else if (err instanceof HttpErrorResponse) {
        messageWrapper = err.error;
      } else {
        console.error('error response type not managed', err);
      }

      if (messageWrapper?.errors) {
        severity = 'error';
        summary = 'Error';
        messages = messageWrapper.errors;
      } else if (messageWrapper?.warnings) {
        severity = 'warn';
        summary = 'Warn';
        messages = messageWrapper.warnings;
      } else if (messageWrapper?.info) {
        severity = 'info';
        summary = 'Info';
        messages = messageWrapper.info;
      } else {
        severity = 'error';
        summary = 'Error';
        messages = [{ description: this.translateService.instant('message.error.genericError') }];
      }

      this.showMessages(severity, summary, messages);
    }
  }

  private showMessages(severity, summary, messages: Message[]) {
    if (messages && messages.length > 0) {
      for (const message of messages) {
        this.toastMessageService.next({ severity, summary, detail: message.description });
      }
    }
  }

  public showError(detail: string) {
    this.toastMessageService.next({ severity: 'error', summary: 'Error', detail });
  }

  public showWarn(detail: string) {
    this.toastMessageService.next({ severity: 'warn', summary: 'Warn', detail });
  }

  public showInfo(detail: string) {
    this.toastMessageService.next({ severity: 'info', summary: 'Info', detail });
  }

  /*
  * checkSession:
  * - true = session OK
  * - false = session expired
  */
  private checkSession(res: any): boolean {
    let session = true;
    if (res != null && res.headers != null) {
      console.log('checkSession - header', res.headers)

      let rsp: string = res.headers.get('rsp');
      console.log('checkSession - rsp', rsp)
      if (rsp === 'login') {
        session = false;
      }
    }
    console.log('checkSession - session', session)
    return session;
  }
  
}
