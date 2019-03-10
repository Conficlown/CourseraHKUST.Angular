import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { AnimationEvent} from '@angular/animations';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { FeedbackService } from '../services/feedback.service';

import { expand, showSubmission } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@showSubmission]': 'showSubmission',
    '(@showSubmission.start)': 'captureStartEvent($event)',
    '(@showSubmission.done)': 'captureDoneEvent($event)'
  },
   // tslint:disable-next-line:use-host-property-decorator
  //  host: {
  //   '[@showSubmission]': 'true',
  //   'style': 'display: block;'
  // },
  animations: [
    showSubmission(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  contactType = ContactType;
  showSubmission: string;
  AnimationEnd: boolean;

  errMess: string;
  submitted: boolean;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackservice: FeedbackService,
    @Inject('BaseURL') private BaseURL ) { 
    this.createForm();  
  }

  ngOnInit() {
    this.submitted = false;
    this.AnimationEnd = false;
    this.showSubmission = 'shown';
 }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.feedbackCopy = this.feedbackForm.value;
    // console.log(this.feedback);
    this.submitted = true;
    this.feedbackservice.submitFeedback(this.feedbackCopy).subscribe(
      feedback => { this.feedback = feedback; this.submitted = false; this.showSubmission='hidden';}, 
      errmess => { this.feedback = null; this.errMess = <any>errmess; }
    );
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  captureStartEvent(event: AnimationEvent) {
    // the toState, fromState and totalTime data is accessible from the event variable
    console.log(event);
  }

  captureDoneEvent(event: AnimationEvent) {
    // the toState, fromState and totalTime data is accessible from the event variable
    if (event.fromState==='shown' && event.toState === 'hidden'){
      this.AnimationEnd = true;
    }
    console.log(event);
  }
}
