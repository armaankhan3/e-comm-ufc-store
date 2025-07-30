
import apiInstance from '../apiInstance';
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sort: 'newest'
  });

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string from filters
      const queryParams = new URLSearchParams({
        page,
        limit: 12,
        ...filters
      }).toString();

      const response = await apiInstance.get(`/products?${queryParams}`);
      const data = response.data;
      if (!response.status || response.status < 200 || response.status >= 300) throw new Error(data.message);
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <ProductContext.Provider 
      value={{ 
        products,
        loading,
        error,
        filters,
        updateFilters,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export { ProductContext };
