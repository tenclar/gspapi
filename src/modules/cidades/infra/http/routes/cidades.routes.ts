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
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      nome: Joi.string().required(),
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
