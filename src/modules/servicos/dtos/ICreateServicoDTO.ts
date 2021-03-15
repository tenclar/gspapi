interface IPublico {
  publico_id: string;
}

export default interface ICreateServicoDTO {
  titulo: string;
  slug: string;
  informacao: string;
  orgao_id: string;
  categoria_id: string;
  publicos: IPublico[];
}
