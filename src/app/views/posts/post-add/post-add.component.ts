import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from './../../../shared/services/posts.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
})
export class PostAddComponent implements OnInit {
  addForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private postsService: PostsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bulidAddForm();
  }

  onSubmit() {
    this.submitted = true;

    // check if form is invalid , if invalid return nothing
    if (this.addForm.invalid) {
      return;
    }

    this.postsService.addPost(this.addForm.value).subscribe(
      (res) => {
        res;
        this.router.navigate(['../admin/posts']);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  // to access inputs
  get title() {
    return this.addForm.get('title');
  }
  get description() {
    return this.addForm.get('description');
  }

  // submit on form
  bulidAddForm() {
    this.addForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
}
