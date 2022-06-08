import { Router, Response, Request } from "express";
import {PrismaClient} from "@prisma/client"

    const router = Router();
    const prisma = new PrismaClient();
    
    //GET /test/add/[address]
    router.get("/add/:address", async(req: Request, res: Response) => {
        createUser(req.params.address)
        .then(result => {
            console.log("add: success");
            res.json({msg: "success"})            
        })
        .catch(error => {
            if(error.code === "P2002") {
                res.json({msg: "unique constraint"})
            }
            else {
                res.json({msg: "error"})
            }
        });
    });
    
    // GET /test/userList
    router.get("/userList", async (req: Request, res: Response) => {
        allUsers()
        .then(result => {
            console.log("list: success");
            res.json(result);
        })
        .catch(() => {
            console.log("list: error");
            res.json({msg: "error"})
        });
    });
    
    // GET /test/[id]
    router.get("/:id", async (req: Request, res: Response) => {
        findUser(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.log("list: error");
            res.json({msg: "error"})
        });
    });

    const createUser = async (address: string) => {
        const cUser = await prisma.user.create({
            data: {
                name: "tester",
                email: address,
                posts: {
                    create: {title: "Hello World"},
                },
                profile: {
                    create: {bio: "prisma"},
                },
            },
        });
        return cUser;
    }
    
    const allUsers = async () => {
        const allUsers = await prisma.user.findMany({
            //include: 関連するレコードを含める
            include: {
                posts: true,
                profile: true,
            }
        });

        return allUsers;
    }

    const findUser = async (userId: string) => {
        if(Number(userId) === NaN) return;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            include: {
                posts: true,
                profile: true,
            }
        });

        return user;
    }

    export default router;