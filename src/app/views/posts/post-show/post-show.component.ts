import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../shared/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css'],
})
export class PostShowComponent implements OnInit {
  id!: number;
  itemData: any = {};

  constructor(
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.postsService.getItem(this.id).subscribe((res) => {
        this.itemData = res;
      });
    });
  }

  goBack(){
    this.router.navigate(['../admin/posts']);
  }
}
