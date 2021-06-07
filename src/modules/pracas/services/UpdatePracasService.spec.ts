import AppError from '../../../shared/errors/AppError';
import FakePracasRepository from '../repositories/fakes/FakePracasRepository';

import UpdatePracasService from './UpdatePracasService';

let fakePracasRepository: FakePracasRepository;

let updatePracas: UpdatePracasService;

describe('UpdatePracas', () => {
  beforeEach(() => {
    fakePracasRepository = new FakePracasRepository();

    updatePracas = new UpdatePracasService(fakePracasRepository);
  });

  it('should be able to Update Pracas', async () => {
    const praca = await fakePracasRepository.create({
      nome: 'Rio Branco',
      slug: 'rio-branco',
      status: true,
    });

    const updatePraca = await updatePracas.execute({
      id: praca.id,
      nome: 'Rios Brancos',
      status: true,
    });

    expect(updatePraca.nome).toBe('Rios Brancos');
    expect(updatePraca.slug).toBe('rios-brancos');
  });

  it('should not be able  update the pracas from non-existing pracas', async () => {
    expect(
      updatePracas.execute({
        id: 'non-existing-pracas-id',
        nome: 'Test',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
