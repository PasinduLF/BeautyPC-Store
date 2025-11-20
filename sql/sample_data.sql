USE beauty_pc_store;

INSERT INTO users (name, email, password_hash)
VALUES ('Beauty Admin', 'admin@beautypc.lk', '$2b$10$cAVPXnR2Ijw5e99HEwZbbe4f988qltwpbOT.bYg6idQRKyrSaVl0m')
ON DUPLICATE KEY UPDATE email = email;

INSERT INTO categories (name, description) VALUES
  ('Makeup', 'Lipsticks, foundation, mascara and more'),
  ('Skincare', 'Cleansers, serums, moisturisers'),
  ('Fragrances', 'Perfumes, body mists, deodorants'),
  ('Hair Care', 'Oils, shampoos, nourishing masks'),
  ('Beauty Tools', 'Brush sets, sponges, pouches, mirrors')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products
  (name, description, subcategory, usage_notes, price, stock_quantity, category_id, image_url, gallery_images, is_featured, is_new, is_best_seller)
VALUES
  (
    'Luminous Silk Lipstick',
    'Creamy lipstick with buildable pigment and Sri Lankan humidity-proof wear.',
    'Lipstick',
    'Apply on moisturised lips; blot and reapply for full coverage.',
    3200,
    30,
    1,
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    '["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f","https://images.unsplash.com/photo-1526045478516-99145907023c"]',
    1,
    1,
    1
  ),
  (
    'Cloud Tint Foundation',
    'Featherweight liquid foundation with SPF 20 for everyday wear.',
    'Foundation',
    'Shake well, dot on face, and blend with a damp sponge.',
    4500,
    18,
    1,
    'https://images.unsplash.com/photo-1512499617640-c2f999098c01',
    '["https://images.unsplash.com/photo-1512499617640-c2f999098c01"]',
    0,
    1,
    0
  ),
  (
    'Lotus Dew Serum',
    'Hydrating niacinamide serum ideal for tropical climates.',
    'Serum',
    'Use on cleansed skin before moisturiser, morning and night.',
    5200,
    40,
    2,
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    '["https://images.unsplash.com/photo-1509042239860-f550ce710b93","https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"]',
    1,
    1,
    0
  ),
  (
    'Aurora Night Cream',
    'Rich overnight cream that repairs barrier damage and boosts glow.',
    'Moisturizer',
    'Massage onto face and neck as the final PM step.',
    6100,
    22,
    2,
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    '["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"]',
    0,
    0,
    0
  ),
  (
    'Mango Bloom Eau de Parfum',
    'Sunny mango, jasmine, and vanilla fragrance inspired by island mornings.',
    'Perfume',
    'Spritz once on pulse points; avoid rubbing wrists.',
    7800,
    15,
    3,
    'https://images.unsplash.com/photo-1509057199576-632a47484ece',
    '["https://images.unsplash.com/photo-1509057199576-632a47484ece","https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fragrance"]',
    1,
    0,
    1
  ),
  (
    'Coconut Mist Body Spray',
    'Lightweight body mist with coconut water and aloe for all-day freshness.',
    'Body Spray',
    'Spray generously after showers or workouts.',
    2600,
    50,
    3,
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?body',
    '["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?body"]',
    0,
    1,
    0
  ),
  (
    'Herbal Repair Hair Oil',
    'Blend of virgin coconut, gotukola, and black seed to reduce breakage.',
    'Hair Oil',
    'Warm between palms and massage onto scalp twice a week.',
    3800,
    45,
    4,
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    '["https://images.unsplash.com/photo-1524504388940-b1c1722653e1","https://images.unsplash.com/photo-1509042239860-f550ce710b93?hair"]',
    1,
    0,
    0
  ),
  (
    'Silk Repair Shampoo',
    'Sulphate-free shampoo with keratin boosters for smoother strands.',
    'Shampoo',
    'Massage into wet hair, rinse thoroughly, repeat if needed.',
    3200,
    35,
    4,
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    '["https://images.unsplash.com/photo-1519681393784-d120267933ba"]',
    0,
    1,
    0
  ),
  (
    'Pro Finish Brush Set',
    '11-piece vegan brush set with travel pouch.',
    'Brush Set',
    'Clean weekly with gentle soap and let air dry.',
    5400,
    28,
    5,
    'https://images.unsplash.com/photo-1526045478516-99145907023c',
    '["https://images.unsplash.com/photo-1526045478516-99145907023c"]',
    1,
    0,
    1
  ),
  (
    'Velvet Cloud Beauty Sponge Duo',
    'Latex-free sponge pair for seamless foundation blending.',
    'Makeup Sponge',
    'Dampen before use and replace every 3 months.',
    2400,
    60,
    5,
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?tools',
    '["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?tools"]',
    0,
    1,
    0
  );

