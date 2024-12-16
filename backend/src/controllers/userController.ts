import { Request,Response } from "express"
import { prisma } from "../db/prisma";

export const registerTeam=async(req:Request,res:Response)=>{

    try
    {
        const {teamLeaderDetails,memberDetails,name}=req.body;
        let team;
        await prisma.$transaction(async(tx)=>{
            await tx.member.create({
                data:teamLeaderDetails
            });

            memberDetails.forEach(async (member) => {
                await tx.member.create({
                    data:member
                })
            });

            team=await tx.team.create({
                data:{
                    name
                }
            })
        })

        return res.status(200).json({
            teamId:team.id,
            status:"successfully created"
        })


    }
    catch(e)
    {
        return res.status(500).json({
            error:e,
            status:"error while creating "
        })
    }

}