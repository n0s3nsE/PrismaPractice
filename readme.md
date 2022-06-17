# Prisma Practice

Prisma 使ってみようかと。練習。  
色々間違っている点があるかもしれない。

## DB 起動

`docker-compose up -d`

## マイグレーション

```
yarn prisma migrate dev --name init
```

## table 確認

```
docker-compose exec database bash
mysql -u root -p
use p_db;
show tables;
show columns from {TABLE_NAME};
```

`schema.prisma`で設計した構造で DB が作成されている

## エンドポイント

### /test/userList

ユーザー一覧

### /test/add/[address]

ユーザー作成  
現段階ではとりあえず作れればいいので、パラメーターとかの選定は適当

### /test/user/[userId]

ユーザー ID での検索

### /test/delete

投稿削除

## 参考

[TypeScript で ORM の Prisma に入門した](https://qiita.com/dkawabata/items/cafa3dc53921db520360)  
[Prisma 公式](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
