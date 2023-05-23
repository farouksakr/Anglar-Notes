import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  // Get All Items
  getAll() {
    return this.http.get(`${environment.apiUrl}/posts`);
  }

  // Delete Item
  deleteItem(id: number) {
    return this.http.delete(`${environment.apiUrl}/posts/${id}`);
  }

  // Add New Item
  addPost(data: any) {
    return this.http.post(`${environment.apiUrl}/posts`, data);
  }

  // Get item by id
  getItem(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/posts/${id}`);
  }

  // Edit item
  updatePost(data: any, id: number) {
    return this.http.put(`${environment.apiUrl}/posts/${id}`, data);
  }
}
