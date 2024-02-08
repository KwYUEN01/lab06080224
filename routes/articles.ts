import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";

const router = new Router({ prefix: '/api/v1/articles' });

const articles = [
  {title: 'hello article', fullText: 'some text here to fill the body'},
  {title: 'another article', fullText: 'AA'},
  {title: 'coventry university', fullText: 'BB'},
  {title: 'HKIIT', fullText: 'CC'},
]

const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles;
  await next();
}
const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if((id < articles.length+1)&&(id>0)){
    ctx.body = articles[id-1];
  } else {
    ctx.status = 404;
  
  }
  await next();
}
const createArticle = async (ctx: RouterContext, next: any) => {
  await next();
}
const updateArticle = async (ctx: RouterContext, next: any) => {
  await next();
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
  await next();
}

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
router.del('/:id([0-9]{1,})', deleteArticle);  
export { router };