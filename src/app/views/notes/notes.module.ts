import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';

import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteShowComponent } from './note-show/note-show.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [NotesListComponent, NoteShowComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
})
export class NotesModule {}
