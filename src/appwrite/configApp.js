
import { Account, Client, ID, Databases, Query } from 'appwrite';
import config from '../env_variable/config';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appWriteDatabaseId, config.appWriteCollectionId, slug,
                { title, content, featuredImage, status, userId })
        } catch (error) {
            console.log(error)
        }

    }
    async updatePost(slug, { title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(config.appWriteDatabaseId, config.appWriteCollectionId, slug,
                { title, content, featuredImage, status })
        } catch (error) {
            console.log(error)
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.appWriteDatabaseId, config.appWriteCollectionId, slug)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appWriteDatabaseId, config.appWriteCollectionId, slug)

        } catch (error) {
            console.log(error)
            return false
        }
    }
    async getPosts(quires = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(config.appWriteDatabaseId, config.appWriteCollectionId, quires)
        } catch (error) {
            console.log(error);
        }
    }
    async fileUpload(file){
        try {
            return await this.bucket.createFile(config.appWriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log(error);
        }
    }
    async deleteFile(fileId){
        try {
            return this.bucket.deleteFile(config.appWriteBucketId,fileId)
        } catch (error) {
            console.log(error)
        }
    }
    async getFilePreView(fileId){
        try {
            return this.bucket.getFilePreview(config.appWriteBucketId,fileId)
        } catch (error) {
            console.log(error);
        }
    }

}

const service = new Service()
export default service;