type Book = {
  id: number;
  title: string;
  author: string;
  Edition?: string; 
  image: string;
};


let books: Book[] = [
  {
    id: 1,
    title: "Python Programming for Beginners Bootcamp",
    Edition: "1st",
    author: "Leonard J. Ledger",
    image: "/python.jpg",
  },
  {
    id: 2,
    title: "Get Coding Learn HTML, CSS JavaScript  Build a Website, App Game",
    Edition: "1st",
    author: "Young Rewired State ",
    image: "/getcode.jpg",
  },
  {
    id: 3,
    title: "Beginner's Step-by-Step Coding Course",
    Edition: "1st",
    author: "David Krowitz",
    image: "/books.jpg",
  },
  {
    id: 4,
    title: "C C++ 5 Books in The 1 Coding Course from Beginner",
    Edition: "1st",
    author: " Mark Reed ",
    image: "/cc.jpg",
  },
  {
    id: 5,
    title: "Mastering Roblox Coding",
    Edition: "1st",
    author: " Mark Kiepe ",
    image: "/roblox.jpg",
  },
  {
    id: 6,
    title: "Coding with AI For Dummies",
    Edition: "1st",
    author: "Chris Minnick",
    image: "/dummies.jpg",
  },
];

export async function GET() {
  return new Response(JSON.stringify(books), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: { json: () => Promise<{ title: string; author: string; image: string }> }) {
  const { title, author, image } = await request.json();

  
  if (!title || !author || !image) {
    return new Response(JSON.stringify({ error: "All fields are required!" }), {
      status: 400,
    });
  }

  const id = Math.floor(Math.random() * 1000); 
  books.push({ id, title, author, image });

  return new Response(JSON.stringify({ message: "Book added successfully!" }), {
    status: 201,
  });
}


export async function PUT(request: { json: () => Promise<{ id: number; title: string; author: string; image: string }> }) {
  const { id, title, author, image } = await request.json();

  
  if (!id || !title || !author || !image) {
    return new Response(JSON.stringify({ error: "All fields are required!" }), {
      status: 400,
    });
  }

  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) {
    return new Response(JSON.stringify({ error: "Book not found!" }), {
      status: 404,
    });
  }

  books[bookIndex] = { id, title, author, image };

  return new Response(JSON.stringify({ message: "Book updated successfully!" }), {
    status: 200,
  });
}


export async function DELETE(request: { json: () => Promise<{ id: number }> }) {
  const { id } = await request.json();

  
  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required!" }), {
      status: 400,
    });
  }

  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) {
    return new Response(JSON.stringify({ error: "Book not found!" }), {
      status: 404,
    });
  }

  books = books.filter(book => book.id !== id);

  return new Response(JSON.stringify({ message: "Book deleted successfully!" }), {
    status: 200,
  });
}
