import { Observable } from 'rxjs';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

import {Post}  from '../post';
import { AuthService } from 'src/app/core/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content :string;
  buttonText: string = "Create Post"
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      author: this.authService.authState.displayName || this.authService.authState.email,
      authorId: this.authService.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };

    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.buttonText = "Post Created";

    setTimeout(() => {
      this.buttonText = "Create Post"
    }, 2000);
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if(file.type.split('/')[0] !== 'image') {
      return alert("only image accepted");
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);

      this.uploadPercent = task.percentageChanges();
      console.log("image uploaded")
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => (this.image = url));
        })
      ).subscribe()
      // this.downloadUrl.subscribe(url => this.image = url)
    }
  }

}
