import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoAddEditComponent } from './todo-add-edit/todo-add-edit.component';
import { TodoService } from './service/todo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { CoreService } from './core/core.service';
import {MatTableDataSource} from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
   
    'todo',
     'whattimeisit',
     'action',
     'addtask'
    ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title: any;


  constructor( 
    private _dialog: MatDialog, 
    private _todoService:TodoService,
    private _coreService: CoreService,
    private confirmService: NgConfirmService

    ){}

    ngOnInit(): void {
      this.getTodoList();
    }

    openAddEditTodoForm() {
      const dialogRef = this._dialog.open(TodoAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getTodoList();
          }
        },
      });
    }

  getTodoList(){
    this._todoService.getTaskList().subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteTask (id:number){
this.confirmService.showConfirm("Are you sure want to delete?",
()=>{
  this._todoService.deleteTask(id).subscribe(res=>{
 
      this._coreService.openSnackBar('Task deleted!', 'done');
      this.getTodoList();
    })
},
()=>{
alert("done")

}
)
  }

   
  

  openEditTodoForm(data:any){
   const dialogRef= this._dialog.open(TodoAddEditComponent, {
      data,
    } ) ;

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if (val){
          this.getTodoList();
        }
      },
    });
     
  }
}

