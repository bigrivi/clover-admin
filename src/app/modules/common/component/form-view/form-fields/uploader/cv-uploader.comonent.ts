import { Component, Input, forwardRef,Inject } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';


export interface FileObject {
  id?: string,
  filetype?: string;
  filename?: string;
  filesize?: string;
  base64?: string;
}


const FORM_UPLOAD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileUploaderComponent),
  multi: true
};


@Component({
  selector: 'file-uploader',
  styleUrls: ['./file-uploader.less'],
  providers: [FORM_UPLOAD_VALUE_ACCESSOR],
  template: `
  <ul class="thumb" *ngIf="!isAtachment">
   <li  class="thumb-item" *ngFor="let item of fileObjects;let i=index">
   <div  [innerHtml]="item | to_upload_file_thumb"></div>
   <i (click)="remove(i)" class="fa remove fa-minus-circle" aria-hidden="true"></i>
   </li>
    <li class="thumb-item">
        <input  type="file" (change)="fileChangeHandler($event)">
        <a><i class="fa fa-plus" aria-hidden="true"></i> </a>
    </li>
  </ul>
  <div class="atachments" *ngIf="isAtachment">
    <ul *ngIf="fileObjects.length>0">
        <li  *ngFor="let item of fileObjects;let i=index">
            <i (click)="remove(i)" class="fa remove fa-minus-circle" aria-hidden="true"></i>
            <span class="icon"><i class="fa fa-file-o" aria-hidden="true"></i></span>
            <div class="info">
                <div>
                    <h1>{{item.filename}}</h1>
                    <span>{{item.filesize | to_upload_file_size}}</span>
                </div>
            </div>
        </li>
    </ul>
    <div class="thumb-item">
        <input  type="file" (change)="fileChangeHandler($event)">
        <a><i class="fa fa-plus" aria-hidden="true"></i> </a>
    </div>
 </div>
  `
})
export class FileUploaderComponent implements ControlValueAccessor {
  @Input() config;
  @Input() group;

  @Input() multiple = true;
  @Input() isAtachment = false;

  constructor(@Inject("DataApiService") private dataApiService) {
      this.fileObjects = [];
  }

  private onTouched: any = () => { }
  private valueChange: any = (value: any) => { }

  rawFiles = [];
  fileObjects = [];

  remove(index){
    var fileObject = this.fileObjects[index]

    let resource = this.dataApiService.get("uploader.attachmentDataApi").resource

    if(fileObject.id){
       resource.delete(fileObject.id).subscribe(()=>{})
    }
    this.fileObjects.splice(index,1);
    this.valueChange(this.getFinalResult())
  }

  writeValue(value: any) {
    if(value){
      let valueArr = value.split(",")
       let resource = this.dataApiService.get("uploader.attachmentDataApi").resource
      if(valueArr.length>0){
        this.fileObjects = [];
        valueArr.forEach((attachemtId)=>{
          resource.get({},"/"+attachemtId).subscribe((res)=>{
            var attachmentObject = res.json().data
            this.fileObjects.push({id:attachmentObject._id,filetype:attachmentObject.file_mime,filename:attachmentObject.source_name,filesize:attachmentObject.file_size})
            this.valueChange(this.getFinalResult())
          })
        })
      }
    }

  }

  registerOnChange(fn: any) {
    this.valueChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  fileChangeHandler(event) {
    if (!event.target.files.length) {
      return;
    }
    if(!this.isAtachment){
        var mimes = ['image/jpeg', 'image/png', 'image/gif'];
        if(mimes.indexOf(event.target.files[0].type)<0){
            alert("错误的图片文件格式")
            return;
        }
    }
    this.rawFiles = event.target.files;
    if(!this.multiple){
      this.fileObjects = []
    }
    this.readFiles();
  }


  readFiles() {
    for (let i = this.rawFiles.length - 1; i >= 0; i--) {
      var reader = new FileReader();
      var file = this.rawFiles[i];
      var fileObject: FileObject = {}
      fileObject.filetype = file.type;
      fileObject.filename = file.name;
      fileObject.filesize = file.size;
      reader.onload = this.readerOnLoad(reader, file, fileObject).bind(this)
      reader.readAsArrayBuffer(file);
    }
  }


  readerOnLoad(fReader, file, fileObject) {
    return function(e) {
      var buffer = e.target.result;
      fileObject.base64 = this.arrayBufferToBase64(buffer);
      this.fileObjects.push(fileObject);
      this.valueChange(this.getFinalResult())
    }

  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  getFinalResult(){
    if(this.fileObjects.length<=0){
      return "";
    }
    else{
      return this.fileObjects;
    }
  }

}
