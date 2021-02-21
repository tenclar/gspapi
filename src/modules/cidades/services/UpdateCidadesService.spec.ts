import AppError from '../../../shared/errors/AppError';
import FakeCidadesRepository from '../repositories/fakes/FakeCidadesRepository';

import UpdateCidadesService from './UpdateCidadesService';

let fakeCidadesRepository: FakeCidadesRepository;

let updateCidades: UpdateCidadesService;

describe('UpdateCidades', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();

    updateCidades = new UpdateCidadesService(fakeCidadesRepository);
  });

  it('should be able to Update Cidades', async () => {
    const cidade = await fakeCidadesRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
    });

    const updateCidade = await updateCidades.execute({
      id: cidade.id,
      nome: 'Rios Brancos',
    });

    expect(updateCidade.nome).toBe('Rios Brancos');
    expect(updateCidade.slug).toBe('rios-brancos');
  });

  it('should not be able  update the cidades from non-existing cidades', async () => {
    expect(
      updateCidades.execute({
        id: 'non-existing-cidades-id',
        nome: 'Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
