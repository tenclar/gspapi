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
      slug: Joi.string().required(),
      servico_id: Joi.string().required(),
    },
  }),
  servicosController.create,
);

servicoRouter.get('/', servicosController.index);

export default servicoRouter;
