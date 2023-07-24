import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interface/user';
import { shortenBlankSpaces, validationPatternEmail, validationPatternPassword, validationPatternUserName } from 'src/app/shared/utils/utils';
import { passwordMatchValidator } from 'src/app/shared/custom-validations/passwords-validations';
import { UpdateUserDto } from '../interface/dto/update-user-dto';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  public userForm: UntypedFormGroup;
  public hasAccount: boolean = false;
  public changePasswordFields: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<UsersEditComponent>,
    private userService: UserService,
    private snakBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) { 
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', 
        [
          Validators.minLength(6),
          Validators.maxLength(10), 
          Validators.pattern(validationPatternUserName)
        ]
      ],
      email: ['', 
        [
          Validators.pattern(validationPatternEmail)
        ]
      ],
      password: ['',
        [
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern(validationPatternPassword),
        ]
      ],
      confirmPassword: ['',
        [
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern(validationPatternPassword)
        ]
      ],
    },
    {
      validator: passwordMatchValidator(
       'password',
       'confirmPassword'
      )
    });
    this.setUserValues();
  }

  private setUserValues() {
    this.userForm.patchValue({
      username: this.user.username,
      email: this.user.email,
    })
  }
  public saveUser() {  
    if( this.userForm.valid ) {
        this.trimValues();
        this.shortenBlankSpaces();
        const newUser: UpdateUserDto = this.userForm.value;
        delete newUser['confirmPassword'];
        
        const nonEmptyProperties = Object.entries(newUser).filter(([_, value]) => value !== "");
        const newUserWithoutEmptyValues = Object.fromEntries( nonEmptyProperties) as UpdateUserDto;
        
        if( newUserWithoutEmptyValues.email === this.user.email ) delete newUserWithoutEmptyValues.email;

        this.userService.updateUser(this.user.id, newUserWithoutEmptyValues).subscribe(
          (data) => {
            this.openSnakBar('Updated User', 'OK');
            this.dialogRef.close(data);
          },
          (error) => this.openSnakBar('Verify user or email', 'OK')
        );
        return;
    }
    else {
      this.userForm.markAllAsTouched();
      return;
    }
  }

  openSnakBar( message: string, action: string ): void {
    this.snakBar.open(message, action, { duration: 3000 });
  }

  private trimValues(): void {
    this.userForm.patchValue({
      username: this.userForm.get('username')?.value.trim(),
      email: this.userForm.get('email')?.value.trim(),
      password: this.userForm.get('password')?.value.trim(),
    });
  }

  private shortenBlankSpaces(): void {
    this.userForm.patchValue({
      username: shortenBlankSpaces(this.userForm.get('username')?.value),
    });
  }

  public get username() {
    return this.userForm.get('username');
  }
  
  public get email() {
    return this.userForm.get('email');
  }

  public get password() {
    return this.userForm.get('password');
  }

  public get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
}
