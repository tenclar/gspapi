import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ServicosController from '../controllers/ServicosController';

const servicoRouter = Router();

const servicosController = new ServicosController();

servicoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      informacao: Joi.string().required(),
      categoria_id: Joi.string(),
      orgao_id: Joi.string().required(),
    },
  }),
  servicosController.create,
);

servicoRouter.get('/', servicosController.index);

servicoRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      id: Joi.string().required(),
      nome: Joi.string().required(),
    },
  }),
  servicosController.update,
);
servicoRouter.get('/', servicosController.index);

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
