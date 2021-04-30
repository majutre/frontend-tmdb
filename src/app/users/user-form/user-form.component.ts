import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './../user.model';

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
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];

        this.userForm = this.formBuilder.group({
            userName: ['', Validators.required],
            userEmail: ['', [Validators.required, Validators.email]],
            userCpf: ['', Validators.required]
        })

        
    }

    get f() {
        return this.userForm.controls;
    }

    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }

        const user = this.userForm.getRawValue() as User;
    }

    redirectTo() {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/']));
    }

    resetForm() {
        this.userForm.reset();
    }

    private blankForm(): User {
        return {
            _id: null,
            userName: null,
            userCpf: null,
            userEmail: null
        } as User;
    }

    // private save(cliente: Cliente): void {
    //     this.service.addCliente(cliente).subscribe();
    // }

    // private edit(cliente: Cliente): void {
    //     this.service.editCliente(cliente).subscribe();
    // }
}