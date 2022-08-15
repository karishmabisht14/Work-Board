import Swal, { SweetAlertPosition } from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor() { }

  showLoading(title = 'Please wait...', subTitle = '', boldWord = '') {
    Swal.fire({
      title: title,
      html: `${subTitle} <b>${boldWord}</b>.`,
      showConfirmButton: false,
      //   onBeforeOpen: () => {
      //     Swal.showLoading();
      //   },
    });
  }

  close() {
    Swal.close();
  }

  showErrorAlert(title: string, subTitle: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: subTitle,
    });
  }

  showSuccessAlert(
    title: string,
    subTitle: string,
    confirButton: boolean = true,
    cancelBtn: boolean = false,
    timer: number = 0,
    position: SweetAlertPosition = 'center'
  ) {
    Swal.fire({
      position: position,
      icon: 'success',
      title: title,
      html: subTitle,
      showConfirmButton: confirButton,
      showCancelButton: cancelBtn,
      timer: timer || undefined,
    });
  }

  showWarningAlert(
    title: string,
    subTitle: string,
    confirButton: boolean = false,
    timer: number = 3000
  ) {
    Swal.fire({
      icon: 'warning',
      title: title,
      html: subTitle,
      showConfirmButton: confirButton,
      timer: timer,
    });
  }

  confirm(
    title: string = 'Are you sure?',
    text: string = "You won't be able to revert this!",
    confirmBtnTxt: string = 'Yes',
    cancelBtnTxt: string = 'No, Cancel'
  ) {
    return new Promise<boolean>((resolve, reject) => {
      Swal.fire({
        title: title,
        html: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: cancelBtnTxt,
        confirmButtonText: confirmBtnTxt,
      })
        .then((result: any) => {
          if (result.value) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  showOption() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.value) {
          // Okay action
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Cancel action
        }
      });
  }
}
