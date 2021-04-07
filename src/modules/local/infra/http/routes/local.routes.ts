import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import LocalController from '../controllers/LocalController';

const localRouter = Router();

const localController = new LocalController();

localRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      orgao_id: Joi.string().required(),
      cidade_id: Joi.string().required(),
      conteudo: Joi.string().required(),
      status: Joi.boolean(),
    },
  }),
  localController.create,
);
localRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string(),
      orgao_id: Joi.string().required(),
      cidade_id: Joi.string().required(),
      conteudo: Joi.string(),
      status: Joi.boolean(),
    },
  }),
  localController.update,
);
localRouter.get('/', localController.index);

localRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  localController.show,
);
export default localRouter;
