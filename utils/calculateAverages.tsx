export const calculateAverageByCourse = (
    menuItems: { dishName: string; description: string; course: string; price: number }[],
    course: string
  ): string => {
    const filteredItems = menuItems.filter((item) => item.course === course);
    if (filteredItems.length === 0) return '0.00';
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    return (total / filteredItems.length).toFixed(2);
  };
  
  export const calculateTotalAveragePrice = (
    menuItems: { dishName: string; description: string; course: string; price: number }[]
  ): string => {
    if (menuItems.length === 0) return '0.00';
    const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
    return (totalPrice / menuItems.length).toFixed(2);
  };
  