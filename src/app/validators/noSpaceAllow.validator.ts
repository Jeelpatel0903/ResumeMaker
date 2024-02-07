import { AbstractControl, FormControl } from "@angular/forms";
import { Resolve } from "@angular/router";

// export const noSpaceAllowed = (control : FormControl) :{[s:string]:boolean}|null   => {
//     if(control.value != null && control.value.indexOf(' ') != -1){
//         return {noSpaceAllowed:true}
//     }
//     return null
// }

export class customevalidator{
   static  noSpaceAllowed(control : FormControl) :{[s:string]:boolean}|null {
        if(control.value != null && control.value.indexOf(' ') != -1){
            return {noSpaceAllowed:true}
        }
        return null
    }

    static checkusername(control:AbstractControl):Promise<any>{
       return usernameallowed(control.value)
    }

}

function usernameallowed(username:string){
    const takenusername = ["jeel","manthan","arjun"];
    return new Promise((res,rej)=> {
        setTimeout(() => {
            if(takenusername.includes(username)){
                res({checkusername:true});
            } 
            else{
                res(null);
            }
        }, 5000);
    })
}