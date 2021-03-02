import FakeAvisosRepository from '@modules/avisos/repositories/fakes/FakeAvisosRepository';

import ListAvisosService from './ListAvisosService';

let fakeAvisosRepository: FakeAvisosRepository;

let listAvisos: ListAvisosService;

describe('ListAvisoService', () => {
  beforeEach(() => {
    fakeAvisosRepository = new FakeAvisosRepository();

    listAvisos = new ListAvisosService(fakeAvisosRepository);
  });

  it('should not be able to List the providers', async () => {
    const aviso1 = await fakeAvisosRepository.create({
      titulo: 'AVISO',
      conteudo: 'dfdsf',
      slug: 'aviso',
      imagem: '',
      status: true,
    });
    const aviso2 = await fakeAvisosRepository.create({
      titulo: 'AVISO 2',
      conteudo: 'dfdsf',
      slug: 'aviso2',
      imagem: '',
      status: true,
    });

    const avisos = await listAvisos.execute({ titulo: 'A' });

    expect(avisos).toEqual([aviso1, aviso2]);
  });
});
