export interface Referral {
    username: string;
    amount: number;
    paidOut: boolean;
    date: string;
}

export interface User {
    _id: string;
    email: string;
    admin: boolean;
    affiliateCode?: string;
    referrals: Referral[];
}
