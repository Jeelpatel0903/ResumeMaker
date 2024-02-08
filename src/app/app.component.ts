import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { customevalidator } from './validators/noSpaceAllow.validator';
import { Education, formdatamodel } from './formmodel';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rformpro';
  reactiveForm!: FormGroup
  formdata!:formdatamodel
  skilldata:string[]=[]
  frontent!:string[]
  backend!:string[]
  databse!:string[]
  originalArray = ['C', 'JAVA', 'Angular', 'React', 'MongoDB', 'FireBase'];

  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   this.skilldata.forEach((e)=>{
  //     console.log(e);
      
  //   })
  // }
  @ViewChild('userDetail', { static: false }) userDetail!: ElementRef;

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
        postal: new FormControl(null, Validators.required),
      }),
      Educationsection: new FormArray([

      ]),
      skills: new FormArray([]),
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
    // this.formdata.experience.forEach(e=>{
    //   console.log(e);
    // })
    // this.formdata.skills.forEach((e1)=>{
    //   this.skilldata.push(e1)
    // })
    // this.skilldata.forEach((e)=>{
      
    // })

    // this.originalArray.forEach(value => {
    //   this.categorizeValues(value);
    // });

   
  
    


    // console.log(this.skilldata);
    
    // console.log(this.frontent);
    // console.log(this.backend);
    // console.log(this.databse);

    

    

  

    
    
  


  }

  data() {
    return (this.reactiveForm.get('skills') as FormArray).controls
  }

  expform() {
    return (this.reactiveForm.get('experience') as FormArray).controls
  }
  educatiofun(){
    return (this.reactiveForm.get('Educationsection') as FormArray).controls
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

  OnAddEduction(){
    const eductionformgroup = new FormGroup({
      schoolcollagename:new FormControl(null),
      education: new FormControl(null),
      perecentage:new FormControl(null),
      PassingYear:new FormControl(null)
    });
    (<FormArray>this.reactiveForm.get('Educationsection')).push(eductionformgroup)
  }

  deleteskill(index: number) {
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index)
  }
  ondeleteExpercience(index: number) {
    const controls = <FormArray>this.reactiveForm.get('experience');
    controls.removeAt(index)
  }
  onDeleteEdcation(index:number){
    const detetecomponent = <FormArray>this.reactiveForm.get('Educationsection');
    detetecomponent.removeAt(index)
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

isselected(cource:string){
  return this.reactiveForm.get('skills')?.value.find((e:string)=>{
    console.log(e);
    
  })

}

downloadAsPDF(): void {
  var data = document.getElementById("userDetail");
    html2canvas(data!).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
}



}
