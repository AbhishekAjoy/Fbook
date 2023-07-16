export interface Post{
    post: string;
    userId: string;
    userName: string;
    userPhotoId: string;
    userImageId?:string;
    isAdmin: boolean;
    isActive: boolean;
    profession: string;
    id?:string;
    createdDate?:string;
    postImageId?:string;
}