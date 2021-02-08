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

export interface Ticket_equipment
{
    item: any;
    quantity: any;
    ticketId: any;
    version:number | undefined;
    createdBy?:string;
    type?:string;
    status?:string;
    priority?:string;
    agencyId?:string;
    description?:string;
    ids?:string;
    code?:string;
    tech_assing?:string;
    assigned_tags?:string;
    assignedDate?: any;
    closedDate?: any;
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