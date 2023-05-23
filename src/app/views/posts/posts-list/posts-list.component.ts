import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../shared/services/posts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: any = [];

  constructor(
    private postsService: PostsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  // Get All Posts
  getAll() {
    this.postsService.getAll().subscribe((res) => {
      this.posts = res;
    });
  }

  // Delete Post
  deleteItem(deleteModal: any, id: number) {
    // before calling api , open modal
    this.modalService.open(deleteModal).result.then(
      (result) => {
        // calling api (delete post)
        this.postsService.deleteItem(id).subscribe(
          (res) => {
            console.log(res);
            this.getAll();
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (reson) => {
        console.log(reson);
      }
    );
  }
}


