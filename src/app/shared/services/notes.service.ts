import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  // Get All Items
  getAll() {
    return this.http.get(`${environment.apiUrl}/notes`);
  }

  // Delete Item
  deleteItem(id: number) {
    return this.http.delete(`${environment.apiUrl}/notes/${id}`);
  }

  // Add New Item
  addPost(data: any) {
    return this.http.post(`${environment.apiUrl}/notes`, data);
  }

  // Get item by id
  getItem(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/notes/${id}`);
  }

  // Edit item
  updatePost(data: any, id: number) {
    return this.http.put(`${environment.apiUrl}/notes/${id}`, data);
  }
}
