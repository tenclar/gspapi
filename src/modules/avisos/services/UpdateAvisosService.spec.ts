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
      titulo: 'AVISO 1',
      conteudo: 'dfdsf',
      imagem: '',
      status: true,
    });

    expect(updateAviso.titulo).toBe('Rios Brancos');
    expect(updateAviso.slug).toBe('rios-brancos');
  });

  it('should not be able  update the cidades from non-existing cidades', async () => {
    expect(
      updateAvisos.execute({
        id: 'non-existing-cidades-id',
        titulo: 'AVISO 1',
        conteudo: 'dfdsf',
        imagem: '',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
