import { ConnectRouter } from "@bufbuild/connect";
import { fastifyConnectPlugin } from "@bufbuild/connect-fastify";
import fastify from "fastify";
import { ChatService } from "./gen/chat/v1/chat_connect";
import { chatServiceImpl } from "./chat-service";

async function main() {
  // Fastify インスタンスを作成
  const server = fastify({
    http2: true,  // HTTP/2 を有効化
  });

  // サービス定義と、その実装を紐づけるルーティング
  const routes = (router: ConnectRouter) => {
    router.service(ChatService, chatServiceImpl);
  };

  // Fastify インスタンスに Connect を接続
  await server.register(fastifyConnectPlugin, {
    routes,
  });

  // サーバの起動
  await server.listen({ host: "localhost", port: 8080 });
  console.log("server is listening at", server.addresses());
}

main();
