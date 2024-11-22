'use client';

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BookCard from './components/BookCard';

type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState<{ id: number | ''; title: string; author: string; image: string }>({
    id: '',
    title: '',
    author: '',
    image: '',
  });

  
  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    try {
      await fetch('/api/books', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      fetchBooks();
      setFormData({ id: '', title: '', author: '', image: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

 
  const handleDelete = async (id: number) => {
    try {
      await fetch('/api/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <Hero />
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Books List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      </section>

      
      <section className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          {formData.id ? 'Edit' : 'Add'} Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Book Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter Book Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="author">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="Enter Author Name"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, image: URL.createObjectURL(file) });
                }
              }}
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            {formData.id ? 'Update' : 'Add'} Book
          </button>
        </form>
      </section>
    </div>
  );
}
