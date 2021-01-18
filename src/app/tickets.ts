// export class Tickets {
//     constructor (
//         public createdBy:string,
//         public type:string,
//         public customerId:string,
//         public creationDate:Date,
//         public status:string,
//         public priority:string,
//         public agencyId:string,
//         public description:string,
//         public ids:string,
//         public version:number,
//         public code:string,
//         public id?:number,
//         ){}
// }

export interface Tickets {
    
 createdBy:string;
 type:string;
 customerId:string;
 //creationDate:Date;
 status:string;
 priority:string;
 agencyId:string;
 description:string;
 ids:string;
 version:number;
//  code:string;
 id?:number;
}