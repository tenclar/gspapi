import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ServicosController from '../controllers/ServicosController';
import ServicosAllJoinController from '../controllers/ServicosAllJoinController';

const servicoRouter = Router();

const servicosController = new ServicosController();
const servicosAllJoinController = new ServicosAllJoinController();

servicoRouter.get('/', servicosController.index);
servicoRouter.get('/alljoin', servicosAllJoinController.index);
servicoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      informacao: Joi.string().required(),
      categoria_id: Joi.string(),
      orgao_id: Joi.string().required(),
      publicos: Joi.array(),
      locais: Joi.array(),
      pracas: Joi.array(),
      temas: Joi.array(),
      etapas: Joi.array(),
    },
  }),
  servicosController.create,
);

servicoRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      informacao: Joi.string().required(),
      categoria_id: Joi.string(),
      orgao_id: Joi.string().required(),
      publicos: Joi.array(),
      locais: Joi.array(),
      pracas: Joi.array(),
      temas: Joi.array(),
      etapas: Joi.array(),
    },
  }),
  servicosController.update,
);

servicoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  servicosController.show,
);

export default servicoRouter;
