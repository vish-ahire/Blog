import React from 'react'
import { Account, Client,ID } from 'appwrite';
import config from '../env_variable/config';
export class AuthSerice {
    client=new Client();
    account;

    constructor(){
        this.client.setEndpoint(config.appWriteURL)
                   .setProject(config.appWriteProjectId)
        this.account= new Account(this.client)
    }

    async createAccount({email,name,password}){
        try {
            const userAccount=await this.account.create(ID.unique,email,password,name)

            userAccount?console.log(userAccount):console.log(userAccount+" asd")
        } catch (error) {
            throw error
        }
    }
    async logIn({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            console.warn(error);
        }
    }
    async getCurrentUser(){
        try {
             await this.account.get();
        } catch (error) {
            console.log(error);
        }
    }
    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    }
}
const authService= new AuthSerice();
 export default authService;

