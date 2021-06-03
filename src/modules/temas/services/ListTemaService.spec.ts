import FakeTemaRepository from '@modules/temas/repositories/fakes/FakeTemaRepository';

import ListTemaService from './ListTemaService';

let fakeTemaRepository: FakeTemaRepository;

let listTema: ListTemaService;

describe('ListTemaervice', () => {
  beforeEach(() => {
    fakeTemaRepository = new FakeTemaRepository();

    listTema = new ListTemaService(fakeTemaRepository);
  });

  it('should not be able to List the providers', async () => {
    const tema1 = await fakeTemaRepository.create({
      nome: 'CAC',
      slug: 'cac',
      status: true,
    });
    const tema2 = await fakeTemaRepository.create({
      nome: 'CAC2',
      slug: 'cac2',

      status: true,
    });

    const tema = await listTema.execute({ nome: 'C' });
    expect(tema).toEqual([tema1, tema2]);
  });
});
