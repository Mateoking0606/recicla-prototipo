export type Plastico = {
  slug: string;
  codigo: number;
  sigla: string;
  nombre: string;
  descripcion: string;
  productos: string;
  caracteristicas: string;
};

export const plasticos: Plastico[] = [
  { slug:"pet", codigo:1, sigla:"PET", nombre:"Polietilentereftalato", descripcion:"Poliéster termoplástico utilizado ampliamente en envases y productos de consumo.", productos:"Botellas y envases para bebidas y alimentos.", caracteristicas:"Ligero, resistente y con propiedades de barrera." },
  { slug:"hdpe", codigo:2, sigla:"HDPE", nombre:"Polietileno de alta densidad", descripcion:"Polietileno utilizado en envases y diferentes productos plásticos.", productos:"Envases de leche, detergentes, champú, tapas y recipientes.", caracteristicas:"Rígido, resistente y con buena resistencia química." },
  { slug:"pvc", codigo:3, sigla:"PVC", nombre:"Policloruro de vinilo", descripcion:"Material plástico usado en construcción y otras aplicaciones.", productos:"Tuberías, accesorios y algunos envases.", caracteristicas:"Puede ser rígido o flexible según su formulación." },
  { slug:"ldpe", codigo:4, sigla:"LDPE", nombre:"Polietileno de baja densidad", descripcion:"Polietileno utilizado principalmente en productos flexibles.", productos:"Bolsas, películas, envolturas y algunas botellas flexibles.", caracteristicas:"Flexible y resistente." },
  { slug:"pp", codigo:5, sigla:"PP", nombre:"Polipropileno", descripcion:"Termoplástico utilizado ampliamente en envases y productos de consumo.", productos:"Envases de alimentos, tapas, recipientes y botellas de salsas.", caracteristicas:"Ligero, resistente y con buena resistencia química." },
  { slug:"ps", codigo:6, sigla:"PS", nombre:"Poliestireno", descripcion:"Termoplástico que puede presentarse rígido o expandido.", productos:"Envases, bandejas, vasos y empaques protectores.", caracteristicas:"Puede ser rígido o presentarse como espuma." },
  { slug:"otros", codigo:7, sigla:"OTROS", nombre:"Otros", descripcion:"Categoría para plásticos que no corresponden a los códigos 1–6.", productos:"Diversos productos y algunos materiales combinados.", caracteristicas:"Las características dependen de la composición." }
];
