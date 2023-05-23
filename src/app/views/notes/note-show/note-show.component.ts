import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from './../../../shared/services/notes.service';

@Component({
  selector: 'app-note-show',
  templateUrl: './note-show.component.html',
  styleUrls: ['./note-show.component.css'],
})
export class NoteShowComponent implements OnInit {
  @Input() noteId: any;
  noteForm!: FormGroup;
  noteDetails: any = {};
  @Output() notes = new EventEmitter<any>();

  constructor(private notesService: NotesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bulidAddForm();
    this.getNoteDetails(this.noteId);
  }

  //  note form
  bulidAddForm() {
    this.noteForm = this.fb.group({
      id: '',
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  // get note details
  getNoteDetails(id: any) {
    this.notesService.getItem(id).subscribe((res) => {
      this.noteDetails = res;
      this.noteForm.patchValue({
        title: res.title,
        description: res.description,
      });
    });
  }

  // submit form
  onSubmit(id: any) {
    if (id === ' ') {
      this.addNote(this.noteForm.value);
    } else {
      this.updateNote(this.noteForm.value, id);
    }
  }

  // add note
  addNote(data: any) {
    this.notesService.addPost(data).subscribe(
      (res) => {
        console.log('res', res);
        this.getItems();
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  // update note
  updateNote(data: any, id: any) {
    this.notesService.updatePost(data, id).subscribe(
      (res) => {
        console.log(res);
        this.getItems();
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  // get items after on submit
  getItems() {
    this.notesService.getAll().subscribe((res) => {
      this.notes.emit(res);
    });
  }
}
