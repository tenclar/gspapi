import AppError from '@shared/errors/AppError';
import FakeServicosRepository from '../repositories/fakes/FakeServicosRepository';

import ShowServicosService from './ShowServicosService';

let fakeServicosRepository: FakeServicosRepository;

let showServicos: ShowServicosService;

describe('ShowServicosService', () => {
  beforeEach(() => {
    fakeServicosRepository = new FakeServicosRepository();
    showServicos = new ShowServicosService(fakeServicosRepository);
  });

  it('should be able to show the Servicos', async () => {
    const servicoShow = await fakeServicosRepository.create({
      titulo: 'Identidade',
      slug: 'identidade',
      orgao_id: '12',
      categoria_id: '1',
      informacao: 'dados da identidade',
    });

    const servico = await showServicos.execute({
      id: servicoShow.id,
    });

    expect(servico.titulo).toBe('Identidade');
    expect(servico.slug).toBe('identidade');
    expect(servico.orgao_id).toBe('12');
    expect(servico.categoria_id).toBe('1');
    expect(servico.informacao).toBe('dados da identidade');
  });

  it('should not be able show the Servicos from non-existing Servicos', async () => {
    expect(
      showServicos.execute({
        id: 'non-existing-servico-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
