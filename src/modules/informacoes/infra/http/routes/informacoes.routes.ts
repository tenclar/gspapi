import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import InformacoesController from '../controllers/InformacoesController';

const informacaoRouter = Router();

const informacoesController = new InformacoesController();

informacaoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      conteudo: Joi.string(),
      imagem: Joi.allow(),
      status: Joi.boolean().required(),
    },
  }),
  informacoesController.create,
);
informacaoRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      conteudo: Joi.string(),
      imagem: Joi.allow(),
      status: Joi.boolean().required(),
    },
  }),
  informacoesController.update,
);
informacaoRouter.get('/', informacoesController.index);

informacaoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  informacoesController.show,
);
export default informacaoRouter;
