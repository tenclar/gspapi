interface ICentral {
  id: string;
}
export default interface ICreatePracaDTO {
  nome: string;
  slug: string;
  status: boolean;
  centrais: ICentral[];
}
