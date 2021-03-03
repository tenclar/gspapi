import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OrgaosController from '../controllers/OrgaosController';

const orgaoRouter = Router();

const orgaosController = new OrgaosController();

orgaoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      superiores_id: Joi.string().required(),
    },
  }),
  orgaosController.create,
);
orgaoRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      superiores_id: Joi.string().required(),
    },
  }),
  orgaosController.update,
);
orgaoRouter.get('/', orgaosController.index);

orgaoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orgaosController.show,
);
export default orgaoRouter;
