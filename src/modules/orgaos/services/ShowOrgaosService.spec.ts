import AppError from '@shared/errors/AppError';
import FakeOrgaosRepository from '../repositories/fakes/FakeOrgaosRepository';

import ShowOrgaosService from './ShowOrgaosService';

let fakeOrgaosRepository: FakeOrgaosRepository;

let showOrgaos: ShowOrgaosService;

describe('ShowOrgaosService', () => {
  beforeEach(() => {
    fakeOrgaosRepository = new FakeOrgaosRepository();
    showOrgaos = new ShowOrgaosService(fakeOrgaosRepository);
  });

  it('should be able to show the Orgaos', async () => {
    const orgaoShow = await fakeOrgaosRepository.create({
      nome: 'Estado do Acre',
      slug: 'estado-do-acre',
      superiores_id: '1',
    });

    const orgao = await showOrgaos.execute({
      id: orgaoShow.id,
    });

    expect(orgao.nome).toBe('Estado do Acre');
    expect(orgao.slug).toBe('estado-do-acre');
    expect(orgao.superiores_id).toBe('1');
  });

  it('should not be able show the Orgaos from non-existing Orgaos', async () => {
    expect(
      showOrgaos.execute({
        id: 'non-existing-orgao-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
