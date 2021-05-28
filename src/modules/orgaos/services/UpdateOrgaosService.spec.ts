import AppError from '../../../shared/errors/AppError';
import FakeOrgaosRepository from '../repositories/fakes/FakeOrgaosRepository';

import UpdateOrgaosService from './UpdateOrgaosService';

let fakeOrgaosRepository: FakeOrgaosRepository;

let updateOrgaos: UpdateOrgaosService;

describe('UpdateOrgaos', () => {
  beforeEach(() => {
    fakeOrgaosRepository = new FakeOrgaosRepository();

    updateOrgaos = new UpdateOrgaosService(fakeOrgaosRepository);
  });

  it('should be able to Update Orgaos', async () => {
    const orgao = await fakeOrgaosRepository.create({
      nome: 'Estado do Acre',
      slug: 'estado-do-acre',
      superiores_id: '1',
      status: true,
    });

    const updateOrgao = await updateOrgaos.execute({
      id: orgao.id,
      nome: 'Secretaria do Acre',
      superiores_id: '2',
      status: true,
    });

    expect(updateOrgao.nome).toBe('Secretaria do Acre');
    expect(updateOrgao.slug).toBe('secretaria-do-acre');
    expect(updateOrgao.superiores_id).toBe('2');
  });

  it('should not be able  update the orgaos from non-existing orgaos', async () => {
    expect(
      updateOrgaos.execute({
        id: 'non-existing-orgaos-id',
        nome: 'Test',
        superiores_id: 'test',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
