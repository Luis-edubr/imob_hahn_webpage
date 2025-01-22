import { param, body, validationResult } from "express-validator";

export const validateNewRegister = [
    body('params.isoffer').isInt({ min: 0, max: 1 }).withMessage('isoffer deve ser 0 ou 1'),
    body('params.valor').not().isEmpty().isFloat({ min: 0 }).withMessage('valor deve ser um número positivo'),
    body('params.dormitorios').not().isEmpty().isInt({ min: 1 }).withMessage('dormitorios deve ser um número inteiro não negativo e maior que 0'),
    body('params.banheiros').not().isEmpty().isInt({ min: 1 }).withMessage('banheiros deve ser um número inteiro não negativo e maior que 1'),
    body('params.suites').isInt({ min: 0 }).withMessage('suites deve ser um número inteiro não negativo'),
    body('params.garagem').isInt({ min: 0 }).withMessage('garagem deve ser um número inteiro não negativo'),
    body('params.churrasqueira').isInt({ min: 0 }).withMessage('churrasqueira deve ser um número inteiro não negativo'),
    body('params.patio').not().isEmpty().isInt({ min: 0, max: 1 }).withMessage('patio deve ser 0 ou 1'),
    body('params.cidade').not().isEmpty().isString().withMessage('cidade deve ser uma string'),
    body('params.bairro').not().isEmpty().isString().withMessage('bairro deve ser uma string'),
    body('params.imagens').not().isEmpty().isArray().withMessage('imagens deve ser um array de strings'),
    body('params.imagens.*').not().isEmpty().isString().withMessage('cada imagem deve ser uma string'),
    body('table').not().isEmpty().isString().withMessage('table deve ser uma string'),
    (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.params.isoffer !== undefined) {
            req.body.params.isoffer = Boolean(req.body.params.isoffer);
        }
        if (req.body.params.patio !== undefined) {
            req.body.params.patio = Boolean(req.body.params.patio);
        }
        if (req.body.params.imagens !== undefined && Array.isArray(req.body.params.imagens)) {
            req.body.params.imagens = JSON.stringify(req.body.params.imagens);
        }
        next();
    }
];

export const validaeUpdateRegister = [
    param('id').not().isEmpty().isInt({ min: 1 }).withMessage('id deve ser um número inteiro positivo'),
    param('table').not().isEmpty().isString().withMessage('table deve ser uma string'),
    body('params.isoffer').optional().isInt({ min: 0, max: 1 }).withMessage('isoffer deve ser 0 ou 1'),
    body('params.valor').optional().isFloat({ min: 0 }).withMessage('valor deve ser um número positivo'),
    body('params.dormitorios').optional().isInt({ min: 1 }).withMessage('dormitorios deve ser um número inteiro não negativo e maior que 0'),
    body('params.banheiros').optional().isInt({ min: 1 }).withMessage('banheiros deve ser um número inteiro não negativo e maior que 1'),
    body('params.suites').optional().isInt({ min: 0 }).withMessage('suites deve ser um número inteiro não negativo'),
    body('params.garagem').optional().isInt({ min: 0 }).withMessage('garagem deve ser um número inteiro não negativo'),
    body('params.churrasqueira').optional().isInt({ min: 0 }).withMessage('churrasqueira deve ser um número inteiro não negativo'),
    body('params.patio').optional().isInt({ min: 0, max: 1 }).withMessage('patio deve ser 0 ou 1'),
    body('params.cidade').optional().isString().withMessage('cidade deve ser uma string'),
    body('params.bairro').optional().isString().withMessage('bairro deve ser uma string'),
    body('params.imagens').optional().isArray().withMessage('imagens deve ser um array de strings'),
    body('params.imagens.*').optional().isString().withMessage('cada imagem deve ser uma string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.params.isoffer !== undefined) {
            req.body.params.isoffer = Boolean(req.body.params.isoffer);
        }
        if (req.body.params.patio !== undefined) {
            req.body.params.patio = Boolean(req.body.params.patio);
        }
        if (req.body.params.imagens !== undefined && Array.isArray(req.body.params.imagens)) {
            req.body.params.imagens = JSON.stringify(req.body.params.imagens);
        }
        next();
    }
];

export const validateGetRegisterById = [
    param('id').not().isEmpty().isInt({ min: 1 }).withMessage('id deve ser um número inteiro positivo'),
    param('table').not().isEmpty().isString().withMessage('A tabela deve ser uma string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateGetAllRegisters = [
    param('table').not().isEmpty().isString().withMessage('A tabela deve ser uma string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateDeleteRegister = [
    param('id').not().isEmpty().isInt({ min: 1 }).withMessage('id deve ser um número inteiro positivo'),
    param('table').not().isEmpty().isString().withMessage('A tabela deve ser uma string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const validateKeyword = [
    body('keyword').not().isEmpty().custom((value) => {
        if (typeof value === 'string' || Number.isInteger(value > 0)) {
            return true;
        }
        return false;
    }).withMessage('A palavra-chave precisa ser um inteiro positivo ou uma string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
