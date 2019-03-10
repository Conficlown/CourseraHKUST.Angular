import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { trigger, state, style, animate, transition } from '@angular/animations';

import { visibility, expand } from '../animations/app.animation';

import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
// import { from } from 'rxjs';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {

  @ViewChild('fform') rateCommentFormDirective;

  @Input()
  dish: Dish;
  dishcopy: Dish;
  errMess: string;

  visibility = 'shown';

  dishIds: string[];
  prev: string;
  next: string;

  //add new rating comment to dish
  rateCommentForm: FormGroup;
  rateComment: Comment;

  formErrors = {
    'author': '',
    'comment': '',
    'rating': 5
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'Rating is required.',
    },
    'comment': {
      'required':      'Comment is required if rating is lower than 5 stars.',
      'maxlength':     'Comment cannot be more than 255 characters long.'
    }
  };

  // dish = DISH;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL ) {
        this.createForm(); 
     }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    // this.dish = this.dishservice.getDish(id);
    this.dishservice.getDish(id).subscribe( dish => this.dish = dish);

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); } ))
    .subscribe( dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; });
    // this.ratingSetCommentRequired();
    // this.onValueChanged(); // (re)set validation messages now
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  //rateCommentForm
  createForm(): void {
    this.rateCommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [5, [Validators.required] ],
      comment: ['', [ Validators.maxLength(255)] ]
    });

    this.rateCommentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    // this.ratingSetCommentRequired();
    this.onValueChanged(); // (re)set validation messages now
    // this.onValueChanged(); // (re)set validation messages now
  }

  getToday () {
    let today = new Date();
    return today.toISOString();
  }

  onSubmit() {
    this.rateComment = this.rateCommentForm.value;
    this.rateComment['date'] = this.getToday();
    // this.dishcopy.comments.push(this.rateComment);
    this.dish.comments.push(this.rateComment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    // console.log(this.rateComment);
    this.rateCommentForm.reset({
      rating: 5,
      comment: '',
      author: ''
    });
    
    // console.log(today.);
    // console.log(this.dish.comments);
    // this.rateComment.reset();
    // this.rateComment['author'] = '';
    // this.rateComment['comment'] = '';
    // this.rateComment['date'] = '';
    // this.rateComment['rating'] = 0;
    this.rateCommentFormDirective.resetForm();

  }

  onValueChanged(data?: any) {
    if (!this.rateCommentForm) { return; }
    const form = this.rateCommentForm;
    const CommentTxtCtrl = this.rateCommentForm.get('comment');
    this.rateCommentForm.get('rating').valueChanges
      .subscribe(rating => {
        if (rating < 5) {
          CommentTxtCtrl.setValidators([Validators.maxLength(255), Validators.required]);
        }else {
          CommentTxtCtrl.setValidators([ Validators.maxLength(255) ]);
        }

        CommentTxtCtrl.updateValueAndValidity();
      })

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        // console.log(control);
        // if (control && control.dirty && !control.valid) {
          // console.log(field);
        let condition = control && control.dirty && !control.valid;
        // if ( field === 'comment' ){
        //   // console.log(field);
        //   condition = control && control.untouched && !control.valid;
        // }
        if (condition) {
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
}
