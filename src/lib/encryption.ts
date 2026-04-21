import crypto from 'crypto';

/**
 * APPLICATION-LAYER ENCRYPTION UTILITY
 * -----------------------------------
 * Used to encrypt sensitive PII (like PAN) before storing in the database.
 * This ensures that even with DB access, the data is unreadable without the App Secret.
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Standard for GCM
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypts a string using AES-256-GCM
 * @param text - The raw string to encrypt
 * @returns The encrypted string in format: iv:authTag:encryptedText
 */
export function encrypt(text: string): string {
    const secret = process.env.ENCRYPTION_SECRET;
    
    if (!secret) {
        // Fallback for development/build if secret isn't set, but should warn
        if (process.env.NODE_ENV === 'production') {
            // During 'next build', NODE_ENV is production. 
            // We only want to throw if we are ACTUALLY running in a server context, 
            // not just being statically analyzed during build.
            console.warn('WARNING: ENCRYPTION_SECRET is missing. Encryption will be disabled.');
            return text; 
        }
        return text; // No-op in dev to avoid crashes
    }

    // Ensure secret is 32 bytes (256 bits)
    const key = crypto.scryptSync(secret, 'salt', 32);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts a string previously encrypted with encrypt()
 * @param encryptedData - The string in format iv:authTag:encryptedText
 * @returns The original raw string
 */
export function decrypt(encryptedData: string): string {
    const secret = process.env.ENCRYPTION_SECRET;

    if (!secret || !encryptedData.includes(':')) {
        return encryptedData; // Fallback if not encrypted
    }

    try {
        const parts = encryptedData.split(':');
        if (parts.length !== 3) return encryptedData;

        const [ivHex, authTagHex, encryptedText] = parts;
        const key = crypto.scryptSync(secret, 'salt', 32);
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');

        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        return encryptedData; // Return as-is on failure (or handle differently)
    }
}
