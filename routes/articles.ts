import Router, { RouterContext } from "koa-router";//function
import bodyParser from "koa-bodyparser";
import * as model from "../models/articles.model"
import { basicAuth } from "../controllers/auth";
//import { ValidationError } from "sequelize";
import { validateArticle } from "../controllers/validation";
const router = new Router({ prefix: '/api/v1/articles' });

//const articles = [
//   { title: 'hello article', fullText: 'some text here to fill the body' },
//   { title: 'another article', fullText: 'AA' },
//   { title: 'coventry university', fullText: 'BB' },
//   { title: 'HKIIT', fullText: 'CC' },
// ]


const getAll = async (ctx: RouterContext, next: any) => {
  const articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  } else {
    ctx.body
  }
  // ctx.body = articles;
  await next();
}
const getById = async (ctx: RouterContext, next: any) => {
  const id = ctx.params.id;
  const article = await model.getById(id)
  if (article.length)
    ctx.body = article[0];
  else
    ctx.status = 404;
  // let id = +ctx.params.id;
  // if((id < articles.length+1)&&(id>0)){
  //   ctx.body = articles[id-1];
  // } else {
  //   ctx.status = 404;

  // }
  await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
  // let { title, fullText }: any = ctx.request.body;
  // let newArticle = { title: title, fullText: fullText };
  // articles.push(newArticle);
  // ctx.status = 201;
  // ctx.body = newArticle;
  const body = ctx.request.body;
  const result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;

  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }

  await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
  const id = ctx.params.id;
  const body = ctx.request.body;
  const result = await model.update(id, body); // 假設有一個名為 update 的 model 函式用於更新文章
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = { message: "Article updated successfully" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "Update failed" };
  }
  await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
  const id = ctx.params.id;
  const result = await model.deleteById(id); // 假設有一個名為 deleteById 的 model 函式用於刪除文章
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = { message: "Article deleted successfully" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "Deletion failed" };
  }
  await next();
}

router.get('/', getAll);
// router.post('/', basicAuth, bodyParser(), validateArticle, createArticle);
router.post('/', createArticle);
router.get('/:id([0-9]{1,})', getById);
// router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateArticle, updateArticle);
router.put('/:id([0-9]{1,})', updateArticle);
// router.delete('/:id([0-9]{1,})', basicAuth, bodyParser(), validateArticle, deleteArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router };

//npx ts-node index.ts