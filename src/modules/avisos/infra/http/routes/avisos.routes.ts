import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AvisosController from '../controllers/AvisosController';

const avisoRouter = Router();

const avisosController = new AvisosController();

avisoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      conteudo: Joi.string(),
      imagem: Joi.string(),
      status: Joi.boolean().required(),
    },
  }),
  avisosController.create,
);
avisoRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      conteudo: Joi.string(),
      imagem: Joi.string(),
      status: Joi.boolean().required(),
    },
  }),
  avisosController.update,
);
avisoRouter.get('/', avisosController.index);

avisoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  avisosController.show,
);
export default avisoRouter;
