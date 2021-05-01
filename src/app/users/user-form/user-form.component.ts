import { AuthService } from './../../core/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './../user.model';
import { UserService } from './../user.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {
    id: string;
    userForm: FormGroup;
    editMode: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private userService: UserService,
                private authService: AuthService) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];

        this.userForm = this.formBuilder.group({
            userName: ['', Validators.required],
            userEmail: ['', [Validators.required, Validators.email]],
            userCpf: ['', Validators.required]
        })

        if (this.id) {
            this.editMode = true;
            this.userService.getUser(this.id)
                .subscribe((user: User) => this.createForm(user));
        } else {
            this.editMode = false;
            this.createForm(this.blankForm());
        }
    }

    get f() {
        return this.userForm.controls;
    }

    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }

        const user = this.userForm.getRawValue() as User;

        if (this.id) {
            user._id = this.id;
            this.edit(user);
        } else {
           this.save(user);
           this.authService.createUser(user);
        }

        this.editMode = false;
        this.resetForm()
        this.redirectTo();
    }

    redirectTo() {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/']));
    }

    resetForm() {
        this.userForm.reset();
    }

    createForm(user: User) {
        this.userForm = this.formBuilder.group({
            userName: [user.userName, Validators.required],
            userEmail: [user.userEmail, [Validators.required, Validators.email]],
            userCpf: [user.userCpf, Validators.required]
        })
    }

    private blankForm(): User {
        return {
            _id: null,
            userName: null,
            userCpf: null,
            userEmail: null
        } as User;
    }

    private save(user: User): void {
        this.userService.addUser(user);
    }

    private edit(user: User): void {
        this.userService.editUser(user);
    }
}