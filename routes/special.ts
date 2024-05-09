import Router, { RouterContext } from "koa-router";
import { basicAuth } from "../controllers/auth";


const router = new Router({prefix: '/api/v1'});



router.get('/private', basicAuth);
// router.post('/login', basicAuth);


export { router };

// import Router from "koa-router";
// import { basicAuth } from "../controllers/auth";

// const router = new Router({ prefix: '/api/v1' });

// router.get('/private', basicAuth);

// router.post('/private', async (ctx) => {
//   // 在此處處理 POST `/private` 請求的邏輯
//   // 可以進行身份驗證、資料處理等操作
//   // 並根據需要返回相應的回應

//   ctx.body = "POST /private endpoint"; // 示例回應

//   // 如果有需要，您也可以將處理邏輯封裝到其他的控制器函式中，然後在這裡調用相應的控制器函式

// });

// export { router };

