interface IPublico {
  publico_id: string;
}

interface ILocal {
  local_id: string;
}

interface IPraca {
  praca_id: string;
}

interface ITema {
  tema_id: string;
}

interface IEtapa {
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
  locais: ILocal[];
  pracas: IPraca[];
  temas: ITema[];
  etapas: IEtapa[];
}
