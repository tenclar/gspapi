import AppError from '../../../shared/errors/AppError';
import FakeAvisosRepository from '../repositories/fakes/FakeAvisosRepository';

import UpdateAvisosService from './UpdateAvisosService';

let fakeAvisosRepository: FakeAvisosRepository;

let updateAvisos: UpdateAvisosService;

describe('UpdateAvisos', () => {
  beforeEach(() => {
    fakeAvisosRepository = new FakeAvisosRepository();

    updateAvisos = new UpdateAvisosService(fakeAvisosRepository);
  });

  it('should be able to Update AVISOS without the field conteudo and imagem', async () => {
    const aviso = await fakeAvisosRepository.create({
      titulo: 'AVISO 1',
      conteudo: '',
      slug: 'fdsf',
      imagem: '',
      status: true,
    });

    const updateAviso = await updateAvisos.execute({
      id: aviso.id,
      titulo: 'AVISO 12',
      status: false,
    });

    expect(updateAviso.titulo).toBe('AVISO 12');
    expect(updateAviso.conteudo).toBe('');
    expect(updateAviso.imagem).toBe('');
    expect(updateAviso.status).toBe(false);
  });

  it('should be able to Update AVISOS', async () => {
    const aviso = await fakeAvisosRepository.create({
      titulo: 'AVISO 1',
      conteudo: 'dfdsf',
      slug: 'fdsf',
      imagem: '',
      status: true,
    });

    const updateAviso = await updateAvisos.execute({
      id: aviso.id,
      titulo: 'AVISO 12',
      conteudo: 'novo',
      imagem: 'none',
      status: false,
    });

    expect(updateAviso.titulo).toBe('AVISO 12');
    expect(updateAviso.conteudo).toBe('novo');
    expect(updateAviso.imagem).toBe('none');
    expect(updateAviso.status).toBe(false);
  });

  it('should not be able  update the cidades from non-existing cidades', async () => {
    expect(
      updateAvisos.execute({
        id: 'non-existing-aviso-id',
        titulo: 'nonexist',
        conteudo: 'none',
        imagem: 'none',
        status: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
