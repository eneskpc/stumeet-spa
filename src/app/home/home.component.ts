import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-service/post.service';

@Component({
  selector: 'app-home.ks-column.ks-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService) { }

  public postList: Array<any> = [];

  ngOnInit() {
    this.postService.getAllPosts().subscribe((response: Array<any>) => {
      this.postList = response;
    });
  }

}
