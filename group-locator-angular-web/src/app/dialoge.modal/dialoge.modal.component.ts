import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialoge.modal.html',
  styleUrls: ['./dialoge.modal.css']
})
export class DialogeModalComponent {
  javascriptContent;
  iframeContent;

  constructor(
    public dialogRef: MatDialogRef<DialogeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.javascriptContent = '<script type="text/javascript"> var url="' + this.data + '",d=document,w=window,b="body",i="iframe",a=d.createElement(i);a.src=url,a.width="100%",a.height="100%",w.setTimeout(function(){d.getElementsByTagName(b)[0].appendChild(a)}, 1000);</script>';
    this.iframeContent = '<iframe src="' + this.data + '" width="100%" height="100%"></iframe>';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyToClipBoard() {
    let copyText: any;
    copyText = document.getElementsByTagName('textarea')[0];
    copyText.select();
    document.execCommand('copy');
    alert('Code has been copied to your clipboard.');
    this.dialogRef.close(true);
  }

}
