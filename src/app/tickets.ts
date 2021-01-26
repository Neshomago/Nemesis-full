export interface Tickets {
    
 createdBy:string;
 type:string;
 customerId:string;
 status:string;
 priority:string;
 agencyId:string;
 description:string;
 ids:string;
 version:number;
 code:string;
 tech_assing?:string;
 assigned_tags?:string;
 assignedDate?: Date;
 closedDate?: Date;
 id?:number;
}

export interface Ticket_update{
    status:string;
    description:string;
    tech_assign?:string;
    assigned_tags?:string;
    assignedDate?: Date;
    //closedDate?: Date;
}