import React from 'react';
import ItemCard from './ItemCard';
export default function CategorySection({ category, onAdd }) {
  if (!category) return null;
  return (
    <section className="my-16 px-6" id="entrantes">
      <h2 className="section-title">{category.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {category.items.map(item => (
          
          <ItemCard key={item.id} item={item} onAdd={onAdd} />
          
        ))}
      </div>
      
    </section>
  );
}