import Koa from "koa";
import json from "koa-json";
import passport from "koa-passport";
import { router } from '../routes/articles';
import request from 'supertest';

const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);
//x skip
describe('Get / - a simple api endpoint', ()=> {
 test('Get all article', async ()=> {
  const result = await request(app.callback()).get('/api/v1/articles');
  expect(result.statusCode).toEqual(200);
 })
 it('Get article with ID 111', async ()=> { 
   const result = await request(app.callback()).get('/api/v1/articles/111')
   expect(result.statusCode).toEqual(404);
 }) 
})
