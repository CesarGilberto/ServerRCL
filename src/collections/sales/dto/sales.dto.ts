export class SaleDto{
    corte_caja_id:string;
    fecha:string;
    productos:[{
        cantidad:number;
        categoria:string;
        color:string;
        marca:string;
        nombre:string;
        precio:number;
        producto_id:string;
        tam:string;
    }];
    venta_id:string;
}