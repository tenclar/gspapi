import AppError from '../../../shared/errors/AppError';
import FakeServicosRepository from '../repositories/fakes/FakeServicosRepository';
import UpdateServicosService from './UpdateServicosService';

let fakeServicosRepository: FakeServicosRepository;

let updateServicos: UpdateServicosService;

describe('UpdateServicos', () => {
  beforeEach(() => {
    fakeServicosRepository = new FakeServicosRepository();

    updateServicos = new UpdateServicosService(fakeServicosRepository);
  });

  it('should be able to Update Servicos', async () => {
    const servico = await fakeServicosRepository.create({
      titulo: 'Titulo 1',
      slug: 'titulo-1',
      informacao: 'dados do servico',
      orgao_id: '1',
      categoria_id: '1',
    });

    const updateServico = await updateServicos.execute({
      id: servico.id,
      titulo: 'Titulo 11',

      informacao: 'dados servico',
      orgao_id: '2',
      categoria_id: '2',
    });

    expect(updateServico.titulo).toBe('Titulo 11');
    expect(updateServico.slug).toBe('titulo-11');
    expect(updateServico.informacao).toBe('dados servico');
    expect(updateServico.orgao_id).toBe('2');
    expect(updateServico.categoria_id).toBe('2');
  });

  it('should not be able  update the servicos from non-existing servicos', async () => {
    expect(
      updateServicos.execute({
        id: 'non-existing-servicos-id',
        titulo: 'Test',

        informacao: 'Test',
        orgao_id: 'none',
        categoria_id: 'none',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
