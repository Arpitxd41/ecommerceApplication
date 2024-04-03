export const handleCheckboxChange = (productNumber, checked, selectedProducts, setSelectedProducts) => {
      setSelectedProducts(prevState => {
        if (checked) {
          return [...prevState, productNumber];
        } else {
          return prevState.filter(item => item !== productNumber);
        }
      });
    };
    