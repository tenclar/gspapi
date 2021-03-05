import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/passowords.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import categoriasRouter from '@modules/categorias/infra/http/routes/categorias.routes';
import servicosRouter from '@modules/servicos/infra/http/routes/servicos.routes';
import cidadesRouter from '@modules/cidades/infra/http/routes/cidades.routes';
import orgaosRouter from '@modules/orgaos/infra/http/routes/orgaos.routes';
import superioresRouter from '@modules/superiores/infra/http/routes/superiores.routes';
import locaisRouter from '@modules/local/infra/http/routes/local.routes';
import avisosRouter from '@modules/avisos/infra/http/routes/avisos.routes';
import informacoesRouter from '@modules/informacoes/infra/http/routes/informacoes.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'ok' });
});

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/categorias', categoriasRouter);
routes.use('/servicos', servicosRouter);
routes.use('/superiores', superioresRouter);
routes.use('/cidades', cidadesRouter);
routes.use('/orgaos', orgaosRouter);
routes.use('/locais', locaisRouter);
routes.use('/avisos', avisosRouter);
routes.use('/informacoes', informacoesRouter);

export default routes;
