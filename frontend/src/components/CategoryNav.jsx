export default function CategoryNav({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="category-nav">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}