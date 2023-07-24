import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { passwordMatchValidator } from '../../../shared/custom-validations/passwords-validations';
import { shortenBlankSpaces, validationPatternEmail, validationPatternNames, validationPatternPassword, validationPatternUserName } from 'src/app/shared/utils/utils';
@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

  public userForm: UntypedFormGroup;
  public hasAccount: boolean = false;
  public changePasswordFields: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private snakBar: MatSnackBar,
    public dialogRef: MatDialogRef<UsersCreateComponent>,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', 
        [
          Validators.required, 
          Validators.minLength(6),
          Validators.maxLength(10), 
          Validators.pattern(validationPatternUserName)
        ]
      ],
      email: ['', 
        [
          Validators.required,  
          Validators.pattern(validationPatternEmail)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern(validationPatternPassword),
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
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
  }

  public saveUser() {  
    if( this.userForm.valid ) {
        this.trimValues();
        this.shortenBlankSpaces();
        this.userService.createUser(this.userForm.value).subscribe(
          (data) => {
            this.openSnakBar('Usuario creado', 'Aceptar');
            this.dialogRef.close(data);
          },
          (error) => this.openSnakBar('Usuario existente, verifique el usuario o email', 'Aceptar')
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
    })
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
