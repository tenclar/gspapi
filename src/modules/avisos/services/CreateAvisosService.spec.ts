import FakeAvisosRepository from '../repositories/fakes/FakeAvisosRepository';
import CreateAvisosService from './CreateAvisosService';

import AppError from '../../../shared/errors/AppError';

let fakeAvisosRepository: FakeAvisosRepository;
let createAvisos: CreateAvisosService;

describe('CreateAvisos', () => {
  beforeEach(() => {
    fakeAvisosRepository = new FakeAvisosRepository();
    createAvisos = new CreateAvisosService(fakeAvisosRepository);
  });
  it('should be able to create a new AVISO', async () => {
    const aviso = await createAvisos.execute({
      titulo: 'AVISO 1',
      conteudo: 'dfdsf',
      imagem: '',
      status: true,
    });
    expect(aviso).toHaveProperty('id');
  });

  it('should not be able to create AVISO with nome match', async () => {
    await createAvisos.execute({
      titulo: 'AVISO 2',
      conteudo: 'dfdsf',
      imagem: '',
      status: true,
    });

    expect(
      createAvisos.execute({
        titulo: 'AVISO 2',
        conteudo: 'dfdsf',
        imagem: '',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
