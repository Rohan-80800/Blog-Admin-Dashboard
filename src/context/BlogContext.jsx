import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";
import { toast } from "sonner";

const BlogContext = createContext(undefined);

const STORAGE_KEY = "blog-admin-blogs";
const TRASH_KEY = "blog-admin-trash";
const AUTO_PURGE_DAYS = 30;

const initialBlogs = [
  {
    id: "1",
    title: "React 19.2: Partial Pre-rendering and Performance Boosts",
    description:
      "Dive into the new Partial Pre-rendering feature in React 19.2, along with batched Suspense reveals and other optimizations that make your apps faster and more efficient.",
    category: "Technology",
    author: "Jordan Lee",
    image:
      "https://graphqleditorcms.fra1.cdn.digitaloceanspaces.com/graphqleditorcms/blogpost/react19-1730851347059.webp",
    publishDate: "2025-12-01",
    status: "published",
    createdAt: new Date("2025-12-01").toISOString(),
    updatedAt: new Date("2025-12-01").toISOString()
  },
  {
    id: "2",
    title: "AI-Powered Web Development: Tools Transforming 2025",
    description:
      "Explore how AI tools are automating code generation, testing, and personalization, revolutionizing workflows for developers in 2025.",
    category: "Technology",
    author: "Mia Thompson",
    image:
      "https://www.pranathiss.com/blog/wp-content/uploads/Future-of-Web-Development-AI-Chatbots-and-Voice-User-Interfaces.jpg",
    publishDate: "2025-12-05",
    status: "published",
    createdAt: new Date("2025-12-05").toISOString(),
    updatedAt: new Date("2025-12-05").toISOString()
  },
  {
    id: "3",
    title: "Next.js 15: Key Features for Modern App Development",
    description:
      "Discover the latest enhancements in Next.js 15, including improved TypeScript support, caching, and performance optimizations for building scalable applications.",
    category: "Technology",
    author: "Ethan Brooks",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQFNLfuvYx0Esg/article-cover_image-shrink_600_2000/B4DZcshTMIGcAQ-/0/1748798622747?e=2147483647&v=beta&t=wPeLdmyn5G-k01LRrCG7TakmiPdwRvDnQubFXo_BeWU",
    publishDate: "2025-12-10",
    status: "published",
    createdAt: new Date("2025-12-10").toISOString(),
    updatedAt: new Date("2025-12-10").toISOString()
  },
  {
    id: "4",
    title: "Web Performance Optimization Techniques for 2025",
    description:
      "Learn essential strategies to optimize web performance, including image optimization, code splitting, and modern tools for faster load times.",
    category: "Technology",
    author: "Sophia Patel",
    image: "https://www.xenonstack.com/hubfs/web-performance-optimization.png",
    publishDate: "2025-12-12",
    status: "draft",
    createdAt: new Date("2025-12-12").toISOString(),
    updatedAt: new Date("2025-12-12").toISOString()
  },
  {
    id: "5",
    title: "State Management in React: Best Libraries for 2025",
    description:
      "Compare Zustand, Jotai, Redux, and others to find the ideal state management solution for your React applications in the compiler era.",
    category: "Technology",
    author: "Liam Nguyen",
    image:
      "https://www.etatvasoft.com/blog/wp-content/uploads/2023/10/What-is-React-State-Management.jpg",
    publishDate: "2025-12-14",
    status: "published",
    createdAt: new Date("2025-12-14").toISOString(),
    updatedAt: new Date("2025-12-14").toISOString()
  },
  {
    id: "6",
    title: "Tailwind CSS v4: Faster Builds and Modern Features",
    description:
      "Uncover the high-performance engine, CSS-first configuration, and new utilities in Tailwind CSS v4 that streamline your design workflow.",
    category: "Design",
    author: "Olivia Grant",
    image:
      "https://s3-alpha.figma.com/hub/file/2233198195466281252/1e595b88-a03f-402b-8a22-86cf71692ce1-cover.png",
    publishDate: "2025-12-02",
    status: "published",
    createdAt: new Date("2025-12-02").toISOString(),
    updatedAt: new Date("2025-12-02").toISOString()
  },
  {
    id: "7",
    title: "Responsive Design Mastery: Adapting to Every Device",
    description:
      "Best practices for creating fluid, responsive layouts that provide seamless experiences across mobiles, tablets, and desktops.",
    category: "Design",
    author: "Noah Clarke",
    image:
      "https://www.atomic74.com/assets/images/Click/_clickDetailImage/Responsive-Website-on-Different-Devices.jpg",
    publishDate: "2025-12-06",
    status: "published",
    createdAt: new Date("2025-12-06").toISOString(),
    updatedAt: new Date("2025-12-06").toISOString()
  },
  {
    id: "8",
    title: "Sustainable Web Design Trends for 2025",
    description:
      "How eco-friendly hosting, efficient code, and optimized media are shaping greener, faster websites in the new year.",
    category: "Design",
    author: "Ava Ramirez",
    image:
      "https://copyblogger.com/cdn-origin/images/modern-portfolio-devices.png",
    publishDate: "2025-12-09",
    status: "draft",
    createdAt: new Date("2025-12-09").toISOString(),
    updatedAt: new Date("2025-12-09").toISOString()
  },
  {
    id: "9",
    title: "Dark Mode and Motion UI: Engaging Designs in 2025",
    description:
      "Implementing dark themes and subtle animations to enhance user engagement and reduce eye strain.",
    category: "Design",
    author: "Lucas Hayes",
    image:
      "https://diviengine.com/wp-content/uploads/2022/09/website-rsponsive-guest-post.jpeg",
    publishDate: "2025-12-13",
    status: "published",
    createdAt: new Date("2025-12-13").toISOString(),
    updatedAt: new Date("2025-12-13").toISOString()
  },
  {
    id: "10",
    title: "Bold Visuals and Organic Shapes in Modern UI",
    description:
      "Exploring sophisticated organic shapes, vibrant colors, and immersive elements for standout web designs.",
    category: "Design",
    author: "Isabella Ford",
    image:
      "https://insideout.com/wp-content/uploads/2024/09/iStock-1334906074-1.jpg",
    publishDate: "2025-12-15",
    status: "published",
    createdAt: new Date("2025-12-15").toISOString(),
    updatedAt: new Date("2025-12-15").toISOString()
  },
  {
    id: "11",
    title: "Building Inclusive Web Apps: Accessibility in 2025",
    description:
      "Essential techniques for WCAG compliance, semantic HTML, keyboard navigation, and ARIA roles to create accessible experiences.",
    category: "Development",
    author: "Mason Ellis",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQH8q4K8gKxgCw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690203217217?e=2147483647&v=beta&t=XrtuLhFZ3b3kR-ZLzr-UjDrjqO6otSPZdylVi9NvG0U",
    publishDate: "2025-12-03",
    status: "published",
    createdAt: new Date("2025-12-03").toISOString(),
    updatedAt: new Date("2025-12-03").toISOString()
  },
  {
    id: "12",
    title: "Serverless Architectures: Scaling Apps Effortlessly",
    description:
      "Advantages of serverless computing for modern web apps, including cost efficiency and auto-scaling.",
    category: "Development",
    author: "Harper Sullivan",
    image:
      "https://www.wdb.agency/wp-content/uploads/2024/02/human-centered-design.jpg",
    publishDate: "2025-12-07",
    status: "draft",
    createdAt: new Date("2025-12-07").toISOString(),
    updatedAt: new Date("2025-12-07").toISOString()
  },
  {
    id: "13",
    title: "API-First Design: Building Robust Backends",
    description:
      "Why adopting an API-first approach leads to better integration, flexibility, and faster development cycles.",
    category: "Development",
    author: "Wyatt Morgan",
    image:
      "https://userway.org/blog/wp-content/uploads/2022/01/Embracing-Inclusive-Web-Design-for-Digital-Accessibility.jpg",
    publishDate: "2025-12-11",
    status: "published",
    createdAt: new Date("2025-12-11").toISOString(),
    updatedAt: new Date("2025-12-11").toISOString()
  },
  {
    id: "14",
    title: "Cybersecurity Best Practices for Web Developers",
    description:
      "Protecting applications from common threats with secure coding, authentication, and regular audits.",
    category: "Development",
    author: "Zoe Bennett",
    image:
      "https://sp-ao.shortpixel.ai/client/q_glossy+w_822+to_auto+ret_img/www.wdb.agency/wp-content/uploads/2024/02/human-centered-design.jpg",
    publishDate: "2025-12-14",
    status: "published",
    createdAt: new Date("2025-12-14").toISOString(),
    updatedAt: new Date("2025-12-14").toISOString()
  },
  {
    id: "15",
    title: "Progressive Web Apps: The Future of Mobile Web",
    description:
      "Creating offline-capable, installable PWAs that deliver native-like experiences on the web.",
    category: "Development",
    author: "Eliana Vargas",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQG2193IRLAGBQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1691990146750?e=2147483647&v=beta&t=hAL9KbLmAhymFJQ2LqUSHFPGvWcp99nuoYQEVMlISrw",
    publishDate: "2025-12-16",
    status: "draft",
    createdAt: new Date("2025-12-16").toISOString(),
    updatedAt: new Date("2025-12-16").toISOString()
  },
  {
    id: "16",
    title: "Top Business Growth Trends to Watch in 2025",
    description:
      "Key strategies and emerging trends driving sustainable business expansion in the coming year.",
    category: "Business",
    author: "Nathan Cole",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/6790b2696756ad66f164f351/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds",
    publishDate: "2025-12-04",
    status: "published",
    createdAt: new Date("2025-12-04").toISOString(),
    updatedAt: new Date("2025-12-04").toISOString()
  },
  {
    id: "17",
    title: "AI-Driven Strategies for Business Success",
    description:
      "How leveraging artificial intelligence can optimize operations, marketing, and customer engagement.",
    category: "Business",
    author: "Grace Huang",
    image:
      "https://myvistage.com/hub/wp-content/uploads/sites/4/2024/11/business-growth-featured-image-1028x686-1.jpg",
    publishDate: "2025-12-08",
    status: "published",
    createdAt: new Date("2025-12-08").toISOString(),
    updatedAt: new Date("2025-12-08").toISOString()
  },
  {
    id: "18",
    title: "Sustainable Practices Boosting Profitability",
    description:
      "Implementing eco-friendly initiatives that reduce costs and attract conscious consumers.",
    category: "Business",
    author: "Owen Reyes",
    image:
      "https://www.europeanbusinessreview.com/wp-content/uploads/2024/10/iStock-2173105185.jpg",
    publishDate: "2025-12-10",
    status: "draft",
    createdAt: new Date("2025-12-10").toISOString(),
    updatedAt: new Date("2025-12-10").toISOString()
  },
  {
    id: "19",
    title: "Remote Work Evolution: Hybrid Models in 2025",
    description:
      "Adapting team structures and tools for effective hybrid workplaces.",
    category: "Business",
    author: "Lila Simmons",
    image: "https://www.quantumworkplace.com/hubfs/2025%20Trends%20Report.png",
    publishDate: "2025-12-13",
    status: "published",
    createdAt: new Date("2025-12-13").toISOString(),
    updatedAt: new Date("2025-12-13").toISOString()
  },
  {
    id: "20",
    title: "Financial Planning for Small Businesses",
    description:
      "Essential budgeting, forecasting, and investment tips for long-term stability.",
    category: "Business",
    author: "Caleb Ortiz",
    image:
      "https://ribbonfish.com/wp-content/uploads/2025/01/12-Ways-Technology-Could-Change-the-World-by-2025.jpeg",
    publishDate: "2025-12-15",
    status: "published",
    createdAt: new Date("2025-12-15").toISOString(),
    updatedAt: new Date("2025-12-15").toISOString()
  },
  {
    id: "21",
    title: "Wellness Trends Shaping 2025: Mind and Body Balance",
    description:
      "From mindfulness practices to personalized fitness, discover habits for a healthier lifestyle.",
    category: "Lifestyle",
    author: "Evelyn Shaw",
    image:
      "https://www.hotbot.com/articles/wp-content/uploads/2025/06/top-10-womens-lifestyle-trends-in-2025-health-wellness-success-LC-1024x683.jpeg",
    publishDate: "2025-12-05",
    status: "published",
    createdAt: new Date("2025-12-05").toISOString(),
    updatedAt: new Date("2025-12-05").toISOString()
  },
  {
    id: "22",
    title: "Sustainable Living: Eco-Friendly Habits at Home",
    description:
      "Simple changes for reducing waste, energy use, and building a greener daily routine.",
    category: "Lifestyle",
    author: "Julian Pierce",
    image:
      "https://content.ctpublic.org/wp-content/uploads/2025/06/3062948-e1750944874353-1824x1024.jpg",
    publishDate: "2025-12-09",
    status: "published",
    createdAt: new Date("2025-12-09").toISOString(),
    updatedAt: new Date("2025-12-09").toISOString()
  },
  {
    id: "23",
    title: "Work-Life Balance in a Busy World",
    description:
      "Tips for setting boundaries, prioritizing self-care, and achieving harmony.",
    category: "Lifestyle",
    author: "Sienna Walsh",
    image:
      "https://cdn.shopify.com/s/files/1/0051/3975/9207/files/Fit_For_Life_A_Comprehensive_Guide_To_Fitness_And_Wellness_by_Bedofnails_4.jpg?v=1735616574",
    publishDate: "2025-12-11",
    status: "draft",
    createdAt: new Date("2025-12-11").toISOString(),
    updatedAt: new Date("2025-12-11").toISOString()
  },
  {
    id: "24",
    title: "Healthy Eating on a Budget: Meal Prep Ideas",
    description:
      "Nutritious recipes and shopping tips for affordable, wholesome meals.",
    category: "Lifestyle",
    author: "Declan Fox",
    image:
      "https://www.ktalnews.com/wp-content/uploads/sites/5/2025/05/2025-Fit-for-Life.png",
    publishDate: "2025-12-14",
    status: "published",
    createdAt: new Date("2025-12-14").toISOString(),
    updatedAt: new Date("2025-12-14").toISOString()
  },
  {
    id: "25",
    title: "Digital Detox: Reclaiming Your Time and Focus",
    description:
      "Strategies to unplug, reduce screen time, and improve mental clarity.",
    category: "Lifestyle",
    author: "Aurora Kane",
    image:
      "https://communityhealthalliance.com/wp-content/uploads/2025/08/Health-Wellness_CHA_1200x628-September-2025-1024x536.jpg",
    publishDate: "2025-12-16",
    status: "published",
    createdAt: new Date("2025-12-16").toISOString(),
    updatedAt: new Date("2025-12-16").toISOString()
  }
];

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [trash, setTrash] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedBlogs = localStorage.getItem(STORAGE_KEY);
    const storedTrash = localStorage.getItem(TRASH_KEY);

    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(initialBlogs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogs));
    }

    if (storedTrash) {
      setTrash(JSON.parse(storedTrash));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const purgeOldTrash = () => {
      const now = new Date();
      const updatedTrash = trash.filter((item) => {
        const deletedAt = new Date(item.deletedAt);
        const daysSinceDelete = Math.floor(
          (now - deletedAt) / (1000 * 60 * 60 * 24)
        );
        return daysSinceDelete < AUTO_PURGE_DAYS;
      });

      if (updatedTrash.length !== trash.length) {
        setTrash(updatedTrash);
        localStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
        const purgedCount = trash.length - updatedTrash.length;
        if (purgedCount > 0) {
          toast.info(`Auto-purged ${purgedCount} old item(s) from trash`);
        }
      }
    };

    if (trash.length > 0) {
      purgeOldTrash();
    }
  }, [trash]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    }
  }, [blogs, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(TRASH_KEY, JSON.stringify(trash));
    }
  }, [trash, isLoading]);

  const addBlog = useCallback((blog) => {
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setBlogs((prev) => [newBlog, ...prev]);
    toast.success("Blog created successfully!");
    return newBlog;
  }, []);

  const updateBlog = useCallback((id, updates) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, ...updates, updatedAt: new Date().toISOString() }
          : blog
      )
    );
    toast.success("Blog updated successfully!");
  }, []);

  const softDeleteBlog = useCallback(
    (id) => {
      const blogToDelete = blogs.find((blog) => blog.id === id);
      if (blogToDelete) {
        const trashedBlog = {
          ...blogToDelete,
          deletedAt: new Date().toISOString()
        };
        setTrash((prev) => [trashedBlog, ...prev]);
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        toast.success("Blog moved to trash");
      }
    },
    [blogs]
  );

  const restoreBlog = useCallback(
    (id) => {
      const blogToRestore = trash.find((blog) => blog.id === id);
      if (blogToRestore) {
        const { deletedAt, ...restoredBlog } = blogToRestore;
        setBlogs((prev) => [restoredBlog, ...prev]);
        setTrash((prev) => prev.filter((blog) => blog.id !== id));
        toast.success("Blog restored successfully!");
      }
    },
    [trash]
  );

  const permanentDeleteBlog = useCallback((id) => {
    setTrash((prev) => prev.filter((blog) => blog.id !== id));
    toast.success("Blog permanently deleted");
  }, []);

  const emptyTrash = useCallback(() => {
    setTrash([]);
    toast.success("Trash emptied");
  }, []);

  const getBlogById = useCallback(
    (id) => {
      return blogs.find((blog) => blog.id === id);
    },
    [blogs]
  );

  const value = {
    blogs,
    trash,
    isLoading,
    addBlog,
    updateBlog,
    softDeleteBlog,
    restoreBlog,
    permanentDeleteBlog,
    emptyTrash,
    getBlogById,
    autoPurgeDays: AUTO_PURGE_DAYS
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
