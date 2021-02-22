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

export interface ItemWarehouse {
    name: string;
    code: string;
    supplier: string;
    condition: string;
    warranty_period: number;
    dateofRegister: Date;
    userId: number;
    location: string;
    isMoving: number;
    isDeleted: number;
    warehouseId: number;
    transportId: number;
    transportDriver: string;
    itemStatus: string;
    invoice_buy: string;
    agencyId: number;
    customerId: number;
    dateofArrive?: Date;
    dateofRemoval?: Date;
}