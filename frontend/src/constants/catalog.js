export const CORE_CATEGORIES = [
  {
    slug: 'makeup',
    name: 'Makeup',
    description: 'Lipsticks, foundation, mascara, and glow staples.',
    highlight: 'New arrivals in soft glam shades.',
    subcategories: [
      { value: 'Lipstick', label: 'Lipstick' },
      { value: 'Foundation', label: 'Foundation' },
      { value: 'Mascara', label: 'Mascara' },
      { value: 'Eyeliner', label: 'Eyeliner' },
      { value: 'Blush', label: 'Blush' },
    ],
  },
  {
    slug: 'skincare',
    name: 'Skincare',
    description: 'Serums, creams, and masks for island weather.',
    highlight: 'Hydration heroes for day & night.',
    subcategories: [
      { value: 'Cleanser', label: 'Cleansers' },
      { value: 'Serum', label: 'Serums' },
      { value: 'Moisturizer', label: 'Moisturisers' },
      { value: 'Mask', label: 'Masks' },
      { value: 'Toner', label: 'Toners' },
    ],
  },
  {
    slug: 'fragrances',
    name: 'Fragrances',
    description: 'Perfumes, body sprays, and deodorants.',
    highlight: 'Signature scents for every mood.',
    subcategories: [
      { value: 'Perfume', label: 'Perfumes' },
      { value: 'Body Spray', label: 'Body Sprays' },
      { value: 'Deodorant', label: 'Deodorants' },
      { value: 'Mist', label: 'Body Mists' },
    ],
  },
  {
    slug: 'hair-care',
    name: 'Hair Care',
    description: 'Nourishing oils, shampoos, and treatments.',
    highlight: 'Ayurvedic blends for healthy hair.',
    subcategories: [
      { value: 'Hair Oil', label: 'Hair Oils' },
      { value: 'Shampoo', label: 'Shampoos' },
      { value: 'Conditioner', label: 'Conditioners' },
      { value: 'Mask', label: 'Hair Masks' },
      { value: 'Serum', label: 'Hair Serums' },
    ],
  },
  {
    slug: 'beauty-tools',
    name: 'Beauty Tools',
    description: 'Brushes, sponges, makeup pouches, mirrors, combs.',
    highlight: 'Pro tools & accessories.',
    subcategories: [
      { value: 'Brush Set', label: 'Brush Sets' },
      { value: 'Makeup Sponge', label: 'Sponges' },
      { value: 'Makeup Pouch', label: 'Makeup Pouches' },
      { value: 'Mirror', label: 'Mirrors' },
      { value: 'Comb', label: 'Combs' },
    ],
  },
];

export const getCategoryMeta = (slug) =>
  CORE_CATEGORIES.find((category) => category.slug === slug);

export const getSubcategories = (slug) => getCategoryMeta(slug)?.subcategories || [];


