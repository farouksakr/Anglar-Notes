import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './../../../shared/services/posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  editForm!: FormGroup;
  submitted: boolean = false;
  id!: number;
  itemData: any = {};

  constructor(
    private postsService: PostsService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get id
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.postsService.getItem(this.id).subscribe((res) => {
        this.itemData = res;
        this.editForm.patchValue({
          title: res.title,
          description: res.description,
        });
      });
    });

    this.bulidEditForm();
  }

  onSubmit() {
    this.submitted = true;

    // check if form is invalid , if invalid return nothing
    if (this.editForm.invalid) {
      return;
    }

    this.postsService.updatePost(this.editForm.value, this.id).subscribe(
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
    return this.editForm.get('title');
  }
  get description() {
    return this.editForm.get('description');
  }

  // submit on form
  bulidEditForm() {
    this.editForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
}
