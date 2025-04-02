
import { Post, PostFormValues } from "@/types";

// This is a mock API service that simulates interacting with a backend
// In a real application, you would replace these functions with actual API calls

// Simulate some initial blog posts
let posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "React is a popular JavaScript library for building user interfaces, especially single-page applications. It's used for handling the view layer in web and mobile apps. React allows you to design simple views for each state in your application, and it will efficiently update and render the right components when your data changes.\n\nReact was created by Jordan Walke, a software engineer at Facebook. It was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013.\n\nOne of the most interesting things about React is its use of a virtual DOM (Document Object Model) to improve performance. Instead of manipulating the browser's DOM directly, React creates a virtual DOM in memory, where it does all the necessary manipulating before making the changes in the browser DOM.",
    author: "Jane Doe",
    createdAt: "2023-04-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Advanced TypeScript Techniques",
    content: "TypeScript is a superset of JavaScript that adds static typing to the language. It's designed for the development of large applications and transpiles to JavaScript.\n\nIn this post, we'll explore some advanced TypeScript techniques that can help you write more robust code. We'll cover topics like generics, utility types, and conditional types.\n\nGenerics are a way to create reusable components that can work with a variety of types rather than a single one. They can be used to create strongly-typed collections, functions, classes, and more.\n\nUtility types are predefined generic types that come with TypeScript. They provide common type transformations that are useful in many situations. Some examples include Partial<T>, Required<T>, Pick<T, K>, and Omit<T, K>.",
    author: "John Smith",
    createdAt: "2023-05-20T14:45:00Z"
  },
  {
    id: "3",
    title: "Building a REST API with Node.js and Express",
    content: "Node.js and Express are powerful tools for building RESTful APIs. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, while Express is a minimal and flexible Node.js web application framework.\n\nIn this post, we'll walk through the process of building a RESTful API with Node.js and Express. We'll cover topics like routing, middleware, error handling, and database integration.\n\nRouting refers to how an application's endpoints (URIs) respond to client requests. Express provides a simple way to define routes for different HTTP methods like GET, POST, PUT, and DELETE.\n\nMiddleware functions are functions that have access to the request object, the response object, and the next middleware function in the application's request-response cycle. They can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function.",
    author: "Alex Johnson",
    createdAt: "2023-06-10T09:15:00Z"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  await delay(500); // Simulate network delay
  return [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Get a single post by ID
export const getPostById = async (id: string): Promise<Post | undefined> => {
  await delay(500); // Simulate network delay
  return posts.find(post => post.id === id);
};

// Create a new post
export const createPost = async (postData: PostFormValues): Promise<Post> => {
  await delay(500); // Simulate network delay
  
  const newPost: Post = {
    id: Date.now().toString(), // Generate a unique ID
    ...postData,
    createdAt: new Date().toISOString()
  };
  
  posts = [...posts, newPost];
  return newPost;
};

// Update an existing post
export const updatePost = async (id: string, postData: PostFormValues): Promise<Post | undefined> => {
  await delay(500); // Simulate network delay
  
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) return undefined;
  
  const updatedPost: Post = {
    ...posts[postIndex],
    ...postData,
    updatedAt: new Date().toISOString()
  };
  
  posts = [...posts.slice(0, postIndex), updatedPost, ...posts.slice(postIndex + 1)];
  return updatedPost;
};

// Delete a post
export const deletePost = async (id: string): Promise<boolean> => {
  await delay(500); // Simulate network delay
  
  const initialLength = posts.length;
  posts = posts.filter(post => post.id !== id);
  
  return posts.length < initialLength;
};
