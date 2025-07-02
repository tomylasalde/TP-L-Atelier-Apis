import React from 'react';
export default function ChefSection() {
  return (
    <section className="chef">
      <div className="text">
        <h2>Nuestro Chef</h2>
        <p>
          El Chef Ejecutivo de Ladines Gourmet ha perfeccionado su arte culinario en los mejores restaurantes de Europa.
          Con más de 15 años de experiencia, combina técnicas clásicas con enfoques innovadores para crear
          experiencias gastronómicas memorables.
        </p>
        <p>
          Su filosofía se basa en respetar el producto, realzar sus sabores naturales y presentarlo
          de manera elegante. Cada plato cuenta una historia y refleja su pasión por la excelencia culinaria.
        </p>
      </div>
      <div className="image-container">
        <img src="https://soloporgusto.com/wp-content/uploads/2020/10/German-Martitegui-03.jpg" alt="Chef Ladines" />
      </div>
    </section>
  );
}
