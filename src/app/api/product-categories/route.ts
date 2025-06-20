import { NextResponse } from 'next/server';

const products =  [
    {
      id: '1',
      name: '1.25Ct Emerald Shape Diamond Stud Earrings',
      price: 65978,
      originalPrice: 71043,
      discount: 8,
      image: 'https://geer.in/cdn/shop/files/GJER-070_Y1.jpg?v=1750238657',
      category: 'earrings',
      description: 'Elegant emerald shape diamond stud earrings with premium quality certified diamonds.',
      variants: [
        { color: 'White Gold', colorCode: '#E5E7EB' },
        { color: 'Yellow Gold', colorCode: '#FCD34D' },
        { color: 'Rose Gold', colorCode: '#F59E0B' }
      ],
      savings: 5865
    },
    {
      id: '2',
      name: '2.5Ct Dazzle Dangle Earrings',
      price: 91181,
      originalPrice: 100193,
      discount: 9,
      image: 'https://geer.in/cdn/shop/files/GJER-093_R2.jpg?v=1750402446&width=533',
      category: 'earrings',
      description: 'Stunning dazzle dangle earrings perfect for special occasions.',
      variants: [
        { color: 'White Gold', colorCode: '#E5E7EB' },
        { color: 'Yellow Gold', colorCode: '#FCD34D' },
        { color: 'Rose Gold', colorCode: '#F59E0B' }
      ],
      savings: 9012
    },
    {
      id: '3',
      name: '1.00Ct Round Shape Dangle Earrings',
      price: 65012,
      originalPrice: 70123,
      discount: 9,
      image: 'https://geer.in/cdn/shop/files/GJER-101_R2.jpg?v=1750401656&width=533',
      category: 'earrings',
      description: 'Classic round shape dangle earrings with brilliant cut diamonds.',
      variants: [
        { color: 'White Gold', colorCode: '#E5E7EB' },
        { color: 'Yellow Gold', colorCode: '#FCD34D' },
        { color: 'Rose Gold', colorCode: '#F59E0B' }
      ],
      savings: 5111
    },
    {
      id: '4',
      name: '3Ct Round Shape Dangles Drop Earrings',
      price: 101439,
      originalPrice: 111701,
      discount: 9,
      image: 'https://geer.in/cdn/shop/files/GJER-059_R2.jpg?v=1750409498',
      category: 'earrings',
      description: 'Luxurious 3ct round shape dangle drop earrings for the ultimate elegance.',
      variants: [
        { color: 'White Gold', colorCode: '#E5E7EB' },
        { color: 'Yellow Gold', colorCode: '#FCD34D' },
        { color: 'Rose Gold', colorCode: '#F59E0B' }
      ],
      savings: 10262
    },
    {
      id: '5',
      name: 'Diamond Tennis Bracelet',
      price: 85000,
      originalPrice: 95000,
      discount: 10,
      image: 'https://geer.in/cdn/shop/files/GJER-007_W2.jpg?v=1750413079',
      category: 'bracelets',
      description: 'Classic diamond tennis bracelet with continuous line of diamonds.',
      variants: [
        { color: 'White Gold', colorCode: '#E5E7EB' },
        { color: 'Yellow Gold', colorCode: '#FCD34D' }
      ],
      savings: 10000
    },
    {
      id: '6',
      name: 'Solitaire Diamond Ring',
      price: 125000,
      originalPrice: 140000,
      discount: 12,
      image: 'https://geer.in/cdn/shop/files/GJER-075_Y2.jpg?v=1750238560&width=533',
      category: 'rings',
      description: 'Timeless solitaire diamond ring perfect for engagements.',
      variants: [
        { color: 'White Gold', colorCode: '#E5E7EB' },
        { color: 'Yellow Gold', colorCode: '#FCD34D' },
        { color: 'Rose Gold', colorCode: '#F59E0B' }
      ],
      savings: 15000
    },
    {
      id: '7',
      name: 'Sparkling Cluster Studs',
      price: 62000,
      originalPrice: 72000,
      discount: 14,
      image: 'https://geer.in/cdn/shop/files/GJER-130_R2.jpg?v=1750400980&width=533',
      category: 'earrings',
      description: 'Cluster setting for maximum sparkle with multiple diamonds in each earring.',
      variants: [
        { color: 'White Gold', colorCode: '#E5E7EB' },
        { color: 'Rose Gold', colorCode: '#F59E0B' }
      ],
      savings: 10000
    }
  ];
export async function GET() {
  const categories = [...new Set(products.map(p => p.category))];
  return NextResponse.json({ categories });
}
