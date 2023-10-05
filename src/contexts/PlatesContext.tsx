

// interface ProductContextProviderProps {
//   children: ReactNode
// }


// interface ProductContextProps {
//   products: any[]
//   findProductsByFamily: (family:string) => Promise<void>
//   deleteProduct: (id: string, familyId: string ) => Promise<void>
//   createProduct: (product: IProduct) => Promise<void>
//   updateProduct: (product: IProduct) => Promise<void>
// }

// export const ProductContext = createContext({} as ProductContextProps)

// export function ProductContextProvider({ children }: ProductContextProviderProps) {
//   const [ products, setProducts ] = useState<any[]>([])

//   async function findProductsByFamily(family:string): Promise<void> {