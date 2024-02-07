export class formdatamodel{
    firstname:string | null = null
    lastname: string | null = null
    email: string | null = null
    username: string | null = null
    dob: Date | null = null
    gender: string | null = null
    address:  Address | null = null
    skills:string[]=[]
    experience: experienceclass[]=[]
}

export class Address{
    street: string | null = null
    country: string | null = null
    city: string | null = null
    region: string | null = null
    postal: number | null = null
}

export class experienceclass {
    company:string | null = null
    position:string | null = null
    totalexp:string | null = null
    start: Date | null = null
    end: Date | null = null
}