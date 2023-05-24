import { useHistory} from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Products = ({ children }) => {
    const history = useHistory();
  
    return (
      <AdminHeaders>
        Products
        <PrimaryButton onClick={() => history.push("/admin/products/create-product")}>
          Create
        </PrimaryButton>
        {children}
      </AdminHeaders>
    );
  };
  

export default Products;
