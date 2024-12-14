-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    key VARCHAR(255) NOT NULL,
    account VARCHAR(12) REFERENCES users(account),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(account, key)
);

-- Add indexes
CREATE INDEX idx_favorites_account ON favorites(account);
CREATE INDEX idx_favorites_created_at ON favorites(created_at);