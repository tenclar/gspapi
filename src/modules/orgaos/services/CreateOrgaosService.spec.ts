import FakeOrgaosRepository from '../repositories/fakes/FakeOrgaosRepository';
import CreateOrgaosService from './CreateOrgaosService';

import AppError from '../../../shared/errors/AppError';

let fakeOrgaosRepository: FakeOrgaosRepository;
let createOrgaos: CreateOrgaosService;

describe('CreateOrgaos', () => {
  beforeEach(() => {
    fakeOrgaosRepository = new FakeOrgaosRepository();
    createOrgaos = new CreateOrgaosService(fakeOrgaosRepository);
  });
  it('should be able to create a new orgao', async () => {
    const orgao = await createOrgaos.execute({
      nome: 'Instituto de Identificacao',
      superiores_id: '12',
      status: true,
    });
    expect(orgao).toHaveProperty('id');
  });

  it('should not be able to create orgao with nome match', async () => {
    await createOrgaos.execute({
      nome: 'Instituto de Identificacao',
      superiores_id: '12',
      status: true,
    });

    expect(
      createOrgaos.execute({
        nome: 'Instituto de Identificacao',
        superiores_id: '12',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
