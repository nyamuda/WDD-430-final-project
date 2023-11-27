import { Component, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FaqService } from '../faq.service';
import { FAQ } from '../faq.model';
@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.scss'],
})
export class FaqEditComponent {
  formGroup: FormGroup;
  editMode: boolean = false;
  id: string;
  faq: FAQ;

  constructor(
    public modalRef: MdbModalRef<FaqEditComponent>,
    private formBuilder: FormBuilder,
    private faqService: FaqService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
    });
    //close the modal or not
    this.faqService.closeModal.subscribe((closeModal: boolean) => {
      if (closeModal) {
        this.modalRef.close();
      }
    });

    //if we want to edit the questions
    if (this.editMode) {
      //get the company information by id
      this.faqService.getQuestionById(this.id).subscribe((question: FAQ) => {
        this.faq = question;

        //populate the form
        this.formGroup.patchValue({
          question: question.question,
          answer: question.answer,
        });
      });
    }
  }

  //submit form
  submit() {
    if (this.formGroup.valid) {
      let question = this.formGroup.get('question').value;
      let answer = this.formGroup.get('answer').value;

      let faq = new FAQ();

      faq.question = question;
      faq.answer = answer;

      //if the info is being edited
      if (this.editMode) {
        this.faqService.updateQuestion(this.id, faq);
      }
      //else new info is being added
      else {
        this.faqService.addQuestion(faq);
      }
    }
  }

  //is processing a CRUD request or not
  isProcessingRequest: Signal<boolean> = computed(() =>
    this.faqService.isProcessingRequest()
  );
}
