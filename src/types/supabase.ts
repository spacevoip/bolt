export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          balance: number;
          avatar_url: string | null;
          created_at: string;
          account: string;
          password: string;
        };
        Insert: {
          email: string;
          name: string;
          balance?: number;
          avatar_url?: string | null;
          account: string;
          password: string;
        };
        Update: {
          email?: string;
          name?: string;
          balance?: number;
          avatar_url?: string | null;
          account?: string;
          password?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          type: 'pix_sent' | 'pix_received';
          amount: number;
          description: string;
          from_user: string;
          to_user: string;
          from_account: string;
          to_account: string;
          created_at: string;
        };
        Insert: {
          type: 'pix_sent' | 'pix_received';
          amount: number;
          description: string;
          from_user: string;
          to_user: string;
          from_account: string;
          to_account: string;
        };
        Update: {
          type?: 'pix_sent' | 'pix_received';
          amount?: number;
          description?: string;
          from_user?: string;
          to_user?: string;
          from_account?: string;
          to_account?: string;
        };
      };
    };
  };
}