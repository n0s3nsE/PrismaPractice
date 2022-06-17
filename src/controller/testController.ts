import { Router, Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//GET /test/add/[address]
router.get('/add/:address', (req: Request, res: Response) => {
  createUser(req.params.address)
    .then((result) => {
      res.json({ msg: 'success' });
    })
    .catch((error) => {
      if (error.code === 'P2002') {
        res.json({ msg: 'unique constraint' });
      } else {
        res.json({ msg: 'add: error' });
      }
    });
});

// GET /test/userList
router.get('/userList', (req: Request, res: Response) => {
  allUsers()
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.json({ msg: 'userList: error' });
    });
});

// GET /test/user/[id]
router.get('/user/:id', (req: Request, res: Response) => {
  findUser(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ msg: 'list: error' });
    });
});

// POST /test/update
router.post('/update', (req: Request, res: Response) => {
  updateUserName(req.body)
    .then((result) => {
      res.json({ msg: 'update: success' });
    })
    .catch((error) => {
      res.json({ msg: 'update: error' });
    });
});

//GET /test/delete
router.get('/delete', (req: Request, res: Response) => {
  deletePost()
    .then((result) => {
      res.json({ msg: 'delete: success' });
    })
    .catch((error) => {
      res.json({ msg: 'delete: error' });
    });
});

const createUser = async (address: string) => {
  const cUser = await prisma.user.create({
    data: {
      name: 'tester',
      email: address,
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'prisma' },
      },
    },
  });
  return cUser;
};

const allUsers = async () => {
  const allUsers = await prisma.user.findMany({
    //include: 関連するレコードを含める
    include: {
      posts: true,
      profile: true,
    },
  });

  return allUsers;
};

const findUser = async (userId: string) => {
  if (isNaN(parseInt(userId))) return;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      posts: true,
      profile: true,
    },
  });

  return user;
};

const updateUserName = async (param: test) => {
  const result = await prisma.user.update({
    where: {
      id: param.id,
    },
    data: {
      name: param.newName,
    },
  });
  return result;
};

const deletePost = async () => {
  //delete all
  const del = await prisma.post.deleteMany({});

  /* const del = await prisma.post.deleteMany({
    where: {
      title: {
        contains: 'Hello World',
      },
    },
  }); */

  return del;
};

type test = {
  id: number;
  newName: string;
};

export default router;
