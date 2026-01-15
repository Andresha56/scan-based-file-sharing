export interface ShopData {
    shopName: string;
    qrCode: string;
    _id: string;
}

export interface userData {
    conversationId: string;
    lastMessage: string;
    lastMessageAt: Date;
    user: {
        name: string,
        _id: string;
        receiverId: string,
        avatarSeed: string,
        avatarStyle:string,
        createdAt: string;
    }
    
}