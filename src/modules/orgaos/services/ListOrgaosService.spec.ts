import FakeOrgaosRepository from '@modules/orgaos/repositories/fakes/FakeOrgaosRepository';

import ListOrgaosService from './ListOrgaosService';

let fakeOrgaosRepository: FakeOrgaosRepository;

let listOrgaos: ListOrgaosService;

describe('ListOrgaoService', () => {
  beforeEach(() => {
    fakeOrgaosRepository = new FakeOrgaosRepository();

    listOrgaos = new ListOrgaosService(fakeOrgaosRepository);
  });

  it('should not be able to List the providers', async () => {
    const orgao1 = await fakeOrgaosRepository.create({
      nome: 'Instituto de Identificacao',
      slug: 'instituto-de-identificacao',
      superiores_id: '12',
      status: true,
    });
    const orgao2 = await fakeOrgaosRepository.create({
      nome: 'Instituto de Identificações',
      slug: 'instituto-de-identificações',
      superiores_id: '123',
      status: true,
    });

    const orgaos = await listOrgaos.execute({ nome: 'I' });
    expect(orgaos).toEqual([orgao1, orgao2]);
  });
});
