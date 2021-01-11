export class Tickets {
    constructor (
        public createdBy:string,
        public type:string,
        public customerId:string,
        //public creationDate:Date,
        public status:string,
        public priority:string,
        public agencyId:string,
        public description:string,
        //public id:number,
        public version:number,
        public code:string,
        ){}
}
