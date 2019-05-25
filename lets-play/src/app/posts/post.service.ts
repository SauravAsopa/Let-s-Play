import { Post } from './post';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection: AngularFirestoreCollection<Post>
  postDocument: AngularFirestoreDocument<Post>

  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('post', ref =>
    ref.orderBy('published', 'desc'))
  }

  getPosts() {
    return this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post
        const id = a.payload.doc.id
        return {id, ...data}
      })
    }))
  }

  getPostData(id: string) {
    this.postDocument = this.afs.doc<Post>(`post/${id}`);
    return this.postDocument.valueChanges();
  }

  create(data: Post) {
    this.postCollection.add(data);
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`)
  }

  delete(id: string) {
    return this.getPost(id).delete()
  }

  update(id: string, formData) {
    return this.getPost(id).update(formData)
  }
}
