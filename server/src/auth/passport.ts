import passport from "passport";
//@ts-ignore
import {Strategy as GoogleStartegy} from "passport-google-oauth20";
import { prisma } from "../db";
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID? process.env.GOOGLE_CLIENT_ID : "hello";
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET? process.env.GOOGLE_CLIENT_SECRET : "hello";



export const initPassport =()=>{
    console.log(process.env.GOOGLE_CLIENT_ID)
    passport.use(
        new GoogleStartegy(
            {
                clientID : process.env.GOOGLE_CLIENT_ID || "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
                callbackURL:"/api/users/google/callback"
            },async(accessToken :string,refreshToken : string,profile : any,done : any)=>{
                const user = await prisma.user.upsert({
                    //@ts-ignore
                    create:{
                        email : profile.emails[0].value,
                        
                        name : profile.displayName,
                    },update:{
                        name : profile.displayName
                    }
                    //@ts-ignore
                    ,where:{
                        email : profile.emails[0].value
                    }
                })
                done(null,user);
            }
    )
    )
    // passport.use('phone-login',             // this thing is used to login using phone number and maintain session for it . 
    //     new LocalStrategy({                 // for that i used pasport-local in that we need to pass two fields ,
    //         //@ts-ignore                    // which is usernameField and we need to map it with a unique field and passwordField.
    //         usernameField : "phoneno",
    //         passwordField : "password"
    //     },async (phoneno,password,done) =>{
    //         try{
    //             const user = await prisma.user.findUnique({where:{phoneNo : phoneno}})
    //             if(!user){
    //                 return done(null,false,{message:"Invalid Phone Number"})
    //             }
    //             //@ts-ignore
    //             const match = await bcrypt.compare(password,user.password);
    //             if(!match){
    //                 return done(null,false,{message:"Wrong credentials"})
    //             }
    //             return done(null,user);
    //         } catch(e){
    //             console.log(e)
    //             return done(e);
    //         }
    //     }
    // )
    // )

    passport.serializeUser((user : any,callback)=>{
        process.nextTick(()=>{
            return callback(null,{
                id : user.id,
                username : user.username,
                // picture : user.picture
            })
        })
    })

    passport.deserializeUser((user : any,callback) =>{
        process.nextTick(()=>{
            return callback(null,user);
        })
    })
}