import { Component, OnInit } from '@angular/core';
import { NotesService } from './../../../shared/services/notes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  notes: any = [];
  noteId: any;
  searchText = '';

  constructor(
    private notesService: NotesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  // Get All Posts
  getAll() {
    this.notesService.getAll().subscribe((res) => {
      this.notes = res;
    });
  }

  // Delete Post
  deleteItem(deleteModal: any, id: number) {
    // before calling api , open modal
    this.modalService.open(deleteModal).result.then(
      (result) => {
        // calling api (delete post)
        this.notesService.deleteItem(id).subscribe(
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

  // add or edit
  open(content: any, id: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(result, id);
        },
        (reason) => {
          console.log(reason);
        }
      );
    this.noteId = id;
  }

  // after add or edit import this function
  getUpdatedNotes(updatedNotes: any) {
    this.notes = updatedNotes;
    this.modalService.dismissAll();
  }
}
