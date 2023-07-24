import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../service/user-service.service';
import { User } from '../interface/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UsersCreateComponent } from '../users-create/users-create.component';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = [ 'username', 'email', 'state', 'userActions' ];
  public users = new MatTableDataSource<User>();
  usersList: User[];
  constructor( 
    private readonly userService: UserService,
    private snakBar: MatSnackBar,
    public dialog: MatDialog
  ) { 

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  ngAfterViewInit(): void {
    this.users.paginator = this.paginator;
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe( (res:any) => {
      this.users.data = res.data; 
    } )
  }

  public goToCreateUser() {
    const dialogCreateRef = this.dialog.open(UsersCreateComponent);
    dialogCreateRef.afterClosed().subscribe(result => {
      result && this.getAllUsers();
    });
  }

  public goToEditUser(user: User) {
    const dialogEditRef = this.dialog.open(UsersEditComponent,{
      data: user
    });
    dialogEditRef.afterClosed().subscribe(result => {
      result && this.getAllUsers();
    });
  }

  public updateStatus(user: User) {
    const message = user.isActive ? `Do you want to change the status to INACTIVE for the user  ${user.email} ?` 
                                  : `Do you want to change the status to ACTIVE for the user  ${user.email} ?`;
    const confirm = user.isActive ? 'Disable' : 'Enable';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '430px',
      data: {
        title: 'Update status',
        description: message,
        btnCancel: { text: 'Cancel',  },
        btnConfirm: { text: confirm,  },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.changeStatusUser(user.id).subscribe(
          () => {
            this.openSnakBar('Updated Status', 'OK');
            this.getAllUsers();
          },
          (error) => this.openSnakBar('Error: Usuario existente, verifique el usuario o email', 'Aceptar')
        );
      }
    });
  }

  openSnakBar( message: string, action: string ): void {
    this.snakBar.open(message, action, { duration: 3000 });
  }
}
