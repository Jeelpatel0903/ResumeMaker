import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { customevalidator } from './validators/noSpaceAllow.validator';
import { formdatamodel } from './formmodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rformpro';
  reactiveForm!: FormGroup
  formdata!:formdatamodel

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, customevalidator.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, customevalidator.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required],customevalidator.checkusername),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India'),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null, Validators.required),
        postal: new FormControl(null, Validators.required)
      }),
      skills: new FormArray([
        new FormControl(null, Validators.required),
      ]),
      experience: new FormArray([
        // new FormControl(null)
      ])

    })
    // this.reactiveForm.get('firstname')?.valueChanges.subscribe((s)=>{ is detact only particular fild chnages 
    //   console.log(s);

    // })
    // this.reactiveForm.valueChanges.subscribe((s)=>{  // when run time user enter any fild in text box any text box in the form is detect
    //   console.log(s['firstname']);

    // })
    // this.reactiveForm.get('email')?.statusChanges.subscribe((status)=>{    // help to cheak status chneges run time 
    //   console.log(status);

    // })
  }

  OnFormSubmit() {
    console.log(this.reactiveForm);
    console.log(this.reactiveForm.controls['firstname'].value)
    console.log(this.reactiveForm.status)
    console.log(this.reactiveForm.valid)
    console.log(this.reactiveForm.invalid)
    this.formdata = this.reactiveForm.value
    console.log(this.formdata);
    this.formdata.experience.forEach(e=>{
      console.log(e);
      
    })
    


  }

  data() {
    return (this.reactiveForm.get('skills') as FormArray).controls
  }

  expform() {
    return (this.reactiveForm.get('experience') as FormArray).controls

  }

  OnAddSkills() {
    return (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required))
  }

  onAddExpercience() {
    const formgroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalexp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null)
    });

    (<FormArray>this.reactiveForm.get('experience')).push(formgroup)
  }
  deleteskill(index: number) {
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index)
  }
  ondeleteExpercience(index: number) {
    const controls = <FormArray>this.reactiveForm.get('experience');
    controls.removeAt(index)
  }

  OncrateUserName() {
    let username = "";
    const fname: string = this.reactiveForm.get('firstname')?.value;
    const lname: string = this.reactiveForm.get('lastname')?.value;
    const dob: string = this.reactiveForm.get('dob')?.value;

    if (fname.length >= 3) {
      username += fname.slice(0, 3)
    }
    else {
      username += fname
    }

    if (lname.length >= 3) {
      username += lname.slice(0, 3)
    }
    else {
      username += lname
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();
    username += Math.floor(Math.random() * 100)
    username = username.toLowerCase();

  //   this.reactiveForm.setValue({
  //     firstname: this.reactiveForm.get('firstname')?.value,
  //     lastname: this.reactiveForm.get('lastname')?.value,
  //     email: this.reactiveForm.get('email')?.value,
  //     username: username,
  //     dob: this.reactiveForm.get('dob')?.value,
  //     gender: this.reactiveForm.get('gender')?.value,
  //     address: {
  //       street: this.reactiveForm.get('street')?.value,
  //       country: this.reactiveForm.get('country')?.value,
  //       city: this.reactiveForm.get('city')?.value,
  //       region: this.reactiveForm.get('region')?.value,
  //       postal: this.reactiveForm.get('postal')?.value,
  //     },
  //     skills: this.reactiveForm.get('skills')?.value,
  //     experience: this.reactiveForm.get('experience')?.value,

  // })
// this.reactiveForm.get('username')?.setValue(username)

  this.reactiveForm.patchValue({
    username:username
  })
}
  
}
