import Image from "next/image";

type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
};


interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col items-center space-y-4">
      
      <Image
        src={book.image || "/default-book.jpg"} 
        alt={`${book.title} cover`}
        width={200}
        height={200}
        className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      />
      <h3 className="text-xl font-bold text-center">{book.title}</h3>
      <p className="text-gray-600 text-center">Author: {book.author}</p>
      <button
        onClick={() => onDelete(book.id)}
        className="bg-red-500 text-white mt-2 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        Delete
      </button>
    </div>
  );
}
