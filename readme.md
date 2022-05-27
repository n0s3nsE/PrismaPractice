# Prisma Practice
Prisma使ってみようかと。練習

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

## 参考
https://qiita.com/dkawabata/items/cafa3dc53921db520360