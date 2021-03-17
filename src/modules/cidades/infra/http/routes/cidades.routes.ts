import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CidadesController from '../controllers/CidadesController';

const cidadeRouter = Router();

const cidadesController = new CidadesController();

cidadeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  cidadesController.create,
);
cidadeRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      status: Joi.boolean(),
    },
  }),
  cidadesController.update,
);
cidadeRouter.get('/', cidadesController.index);

cidadeRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cidadesController.show,
);
export default cidadeRouter;
