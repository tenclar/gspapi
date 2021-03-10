import Publico from '../infra/typeorm/entities/Publico';

export default interface ICreatePublicoDTO {
  nome: string;
  slug: string;
  create_at: string;
  update_at: string;
  status: boolean;
}
