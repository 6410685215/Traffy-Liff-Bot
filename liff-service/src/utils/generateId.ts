// random [0-9A-Z] by seed: string
import Rand, { PRNG } from 'rand-seed';

const Random = (seed: string) => {
    const rand = new Rand(seed, PRNG.sfc32);
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const result = Array.from({ length: 6 }, () => charset[Math.floor(rand.next() * charset.length)]).join('');
    return result;
};
// console.log('RESULT1:', Random('cm8fnrt7200050ci6dz2826d9'));
// console.log('RESULT2:', Random('cm8fnttdf00060ci6bbr989nn'));

// generateId "YYYY-RANDOM-G"
export function generateId(timestamp: string, seed: string): string {
    return `${new Date(timestamp).getFullYear()}-${Random(seed)}-G`;
}

// console.log('RESULT3:', generateId('2025-09-01T00:00:00.000Z', 'cm8fnrt7200050ci6dz2826d9'));