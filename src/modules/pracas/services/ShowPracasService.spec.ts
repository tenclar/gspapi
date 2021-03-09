import AppError from '@shared/errors/AppError';
import FakePracasRepository from '../repositories/fakes/FakePracasRepository';

import ShowPracasService from './ShowPracasService';

let fakePracasRepository: FakePracasRepository;

let showPracas: ShowPracasService;

describe('ShowPracasService', () => {
  beforeEach(() => {
    fakePracasRepository = new FakePracasRepository();
    showPracas = new ShowPracasService(fakePracasRepository);
  });

  it('should be able to show the Pracas', async () => {
    const pracashow = await fakePracasRepository.create({
      nome: 'Rio Branco',
      status: true,
    });

    const praca = await showPracas.execute({
      id: pracashow.id,
    });

    expect(praca.nome).toBe('Rio Branco');
    expect(praca.slug).toBe('rio-branco');
  });

  it('should not be able show the Pracas from non-existing Pracas', async () => {
    expect(
      showPracas.execute({
        id: 'non-existing-praca-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
