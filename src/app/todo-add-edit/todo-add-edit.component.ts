import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-todo-add-edit',
  templateUrl: './todo-add-edit.component.html',
  styleUrls: ['./todo-add-edit.component.css']
})
export class TodoAddEditComponent implements OnInit{
  todoForm: FormGroup;

  degree: string[] = [
    "very important",
    "important",
    "medium important",
    "It is not necessary"
  ];
 


  constructor(
    private _fb: FormBuilder,
    private _todoService: TodoService,
    private _dialogRef: MatDialogRef<TodoAddEditComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService

  ) {
    this.todoForm = this._fb.group({
      todo: '',
      whattimeisit: ''
    });
  }

  ngOnInit(): void {
    this.todoForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.todoForm.valid) {
      if(this.data){
        this._todoService.updateTask(this.data.id, this.todoForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Task detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._todoService.addTask(this.todoForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Task added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
     
    }
  }
}




