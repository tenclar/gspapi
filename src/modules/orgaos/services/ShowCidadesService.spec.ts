import AppError from '@shared/errors/AppError';
import FakeCidadesRepository from '../repositories/fakes/FakeCidadesRepository';

import ShowCidadesService from './ShowCidadesService';

let fakeCidadesRepository: FakeCidadesRepository;

let showCidades: ShowCidadesService;

describe('ShowCidadesService', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();
    showCidades = new ShowCidadesService(fakeCidadesRepository);
  });

  it('should be able to show the Cidades', async () => {
    const cidadeShow = await fakeCidadesRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
    });

    const cidade = await showCidades.execute({
      id: cidadeShow.id,
    });

    expect(cidade.nome).toBe('Rio Branco');
    expect(cidade.slug).toBe('rio-branco');
  });

  it('should not be able show the Cidades from non-existing Cidades', async () => {
    expect(
      showCidades.execute({
        id: 'non-existing-cidade-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
