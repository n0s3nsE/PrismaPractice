# Prisma Practice
Prisma使ってみようかと。練習。  
色々間違っている点があるかもしれない。

## DB起動
```docker-compose up -d```
## マイグレーション
```
yarn prisma migrate dev --name init
```
## table確認
```
docker-compose exec database bash
mysql -u root -p
use p_db;
show tables;
show columns from {TABLE_NAME};
```
`schema.prisma`で設計した構造でDBが作成されている

## エンドポイント
### /test/userList
ユーザー一覧
### /test/add/[address]
ユーザー作成  
現段階ではとりあえず作れればいいので、パラメーターとかの選定は適当
### /test/[userId]
ユーザーIDでの検索

## 参考
[TypeScriptでORMのPrismaに入門した](https://qiita.com/dkawabata/items/cafa3dc53921db520360)  
[Prisma公式](https://www.prisma.io/docs/concepts/components/prisma-client/crud)