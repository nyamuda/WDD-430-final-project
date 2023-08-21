import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  WritableSignal,
  signal,
} from '@angular/core';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-image-item',
  templateUrl: './file-image-item.component.html',
  styleUrls: ['./file-image-item.component.scss'],
})
export class FileImageItemComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  @Input() currentImageUrl = '';
  @Input() editMode = false;
  @Input() imageName = '';
  imagePreview;
  subscription: Subscription;
  //control for image upload
  fileUploadControl = new FormControl<File[]>(null, [
    FileUploadValidators.filesLimit(1),
    FileUploadValidators.accept(['image/*']),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    //file upload
    this.subscription = this.fileUploadControl.valueChanges.subscribe(
      (values: Array<File>) => {
        this.readImage(values[0]);
        this.fileService.isFileInvalid.set(this.fileUploadControl.invalid);
        this.fileService.currentUpload.set([values[0]]);
      }
    );
    //file form group
    this.formGroup = this.formBuilder.group({
      //image upload control
      file: this.fileUploadControl,
    });
  }

  //Preview the new uploaded image
  readImage(file: File) {
    //Make sure its the right file(an image) and it exists
    if (
      this.fileUploadControl.valid &&
      this.fileUploadControl.value.length > 0
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target?.result;
      };
      reader.readAsDataURL(file);
    }
    //else preview the original image
    else {
      this.imagePreview = this.currentImageUrl;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
