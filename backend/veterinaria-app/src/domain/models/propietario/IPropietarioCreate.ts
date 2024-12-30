export interface IPropietarioCreate {
    _id?: string,
    primerNombre: string,
    segundoNombre?: string|null,
    primerApellido: string,
    segundoApellido?: string|null,
    correo: string,
    numero_telefono: string,
    numero_identificacion: string,
    created_at?: string,
    updated_at?: string
}