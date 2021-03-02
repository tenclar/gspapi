import AppError from '@shared/errors/AppError';
import FakeAvisosRepository from '../repositories/fakes/FakeAvisosRepository';

import ShowAvisosService from './ShowAvisosService';

let fakeAvisosRepository: FakeAvisosRepository;

let showAvisos: ShowAvisosService;

describe('ShowAvisosService', () => {
  beforeEach(() => {
    fakeAvisosRepository = new FakeAvisosRepository();
    showAvisos = new ShowAvisosService(fakeAvisosRepository);
  });

  it('should be able to show the AVISO', async () => {
    const avisoShow = await fakeAvisosRepository.create({
      titulo: 'AVISO 1',
      conteudo: 'aviso-1',
      slug: 'aviso-1',
      imagem: 'imagem',
      status: true,
    });

    const aviso = await showAvisos.execute({
      id: avisoShow.id,
    });

    expect(aviso.titulo).toBe('AVISO 1');
    expect(aviso.slug).toBe('aviso-1');
    expect(aviso.conteudo).toBe('aviso-1');
    expect(aviso.imagem).toBe('imagem');
    expect(aviso.status).toBe(true);
  });

  it('should not be able show the AVISOS from non-existing AVISOS', async () => {
    expect(
      showAvisos.execute({
        id: 'non-existing-aviso-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
