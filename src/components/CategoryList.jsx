import React from 'react';
import CategorySection from './CategorySection';
import { menu } from '../data';
export default function CategoryList() {
  return <>{menu.map(cat => <CategorySection key={cat.id} category={cat} />)}</>;
}