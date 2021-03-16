interface IPublico {
  publico_id: string;
}

interface ILocais {
  local_id: string;
}

interface IPracas {
  praca_id: string;
}

interface ITemas {
  tema_id: string;
}

interface IEtapas {
  titulo: string;
  slug: string;
  informacao: string;
}

export default interface ICreateServicoDTO {
  titulo: string;
  slug: string;
  informacao: string;
  orgao_id: string;
  categoria_id: string;
  publicos: IPublico[];
  locais: ILocais[];
  pracas: IPracas[];
  temas: ITemas[];
  etapas: IEtapas[];
}
