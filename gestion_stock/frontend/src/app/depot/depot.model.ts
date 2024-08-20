export class Depot{
  id_dep: number
  nom_dep?: string
  limite_dep?: number

  constructor(id_dep:number, nom_dep:string,limite_dep:number ){
    this.id_dep = id_dep
    this.nom_dep = nom_dep
    this.limite_dep = limite_dep
  }
}
